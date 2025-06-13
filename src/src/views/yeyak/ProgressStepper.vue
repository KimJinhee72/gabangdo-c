<template>
  <transition name="stepper-fade">
    <div class="sticky-stepper" ref="stepperEl" v-show="showStepper">
      <!-- Prev 버튼 -->
      <div class="step-nav">
        <button @click="goPrev" :disabled="stepIndex === 1">
          <img src="/images/cr/down.png" class="rotate" alt="이전" />
        </button>
      </div>
      <!-- 실제 스텝바 -->
      <div class="stepper">
        <div
          v-for="(step, idx) in props.steps"
          :key="idx"
          :class="[
            'step',
            { done: idx < stepIndex - 1, active: idx === stepIndex - 1 },
          ]">
          <div class="wrap">
            <div class="circle" @click="goTo(idx + 1)">{{ idx + 1 }}</div>
            <div v-if="idx < props.steps.length - 1" class="bar"></div>
            <div class="label">{{ step }}</div>
          </div>
        </div>
      </div>
      <!-- Next 버튼 -->
      <div class="step-nav">
        <button @click="goNext" :disabled="stepIndex === props.steps.length">
          <img src="/images/cr/up.png" class="rotate" alt="다음" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";

const props = defineProps({
  steps: { type: Array, required: true },
  selectors: { type: Array, required: true },
});

const emit = defineEmits(["go"]);
const showStepper = ref(false);
const stepIndex = ref(1);
const sectionEls = [];
const stepperEl = ref(null);

// 스텝 이동 함수
function goTo(idx) {
  // 범위 보정
  const clamped = Math.min(Math.max(1, idx), sectionEls.length);
  const section = sectionEls[clamped - 1];
  if (!section) return;

  // 1) 스텝 인덱스 업데이트
  stepIndex.value = clamped;
  emit("go", clamped);

  // 2) 타이틀 요소 찾기
  const titleEl = section.querySelector(".st_section-title");
  // 만약 타이틀이 없다면 섹션 맨 위로 스크롤
  const targetTop = titleEl ? titleEl.offsetTop : section.offsetTop;

  // 3) 헤더 높이만큼 빼고 스크롤
  window.scrollTo({
    top: targetTop - headerGap,
    behavior: "smooth",
  });
}
const goPrev = () => goTo(stepIndex.value - 1);
const goNext = () => goTo(stepIndex.value + 1);
defineExpose({
  goTo,
  goPrev,
  goNext,
});
// 포커스 이동 감지 핸들러
function handleFocusIn(e) {
  // 섹션 요소들 중에서, 포커스된 요소가 포함된 섹션 찾기
  const idx = sectionEls.findIndex((sec) => sec.contains(e.target));
  if (idx !== -1 && stepIndex.value !== idx + 1) {
    // goTo를 호출하면 stepIndex, emit, 스크롤 모두 처리됩니다
    goTo(idx + 1);
  }
}

const headerHeight =
  document.querySelector(".header")?.getBoundingClientRect().height || 0;
// 원하는 추가 간격만큼 여유를 더해 주세요 (예: 20px)
const extraSpace = 50;
const headerGap = headerHeight + extraSpace;
// 스텝퍼 위치 재계산 (bottom 맞춤)
function updateStepperPosition() {
  const sp = stepperEl.value;
  const idx = stepIndex.value - 1;
  const sec = sectionEls[idx];
  if (!sp || !sec) return;

  const title = sec.querySelector(".st_section-title");
  if (!title) return;
}
function updateStepOnScroll() {
  // stepperEl 바닥(bounding bottom)을 activation line으로 사용
  const headerEl =
    document.querySelector(".header") || document.querySelector(".header");
  const headerH = headerEl?.getBoundingClientRect().height || 0;
  const extra = 100; // ← 이 값을 올릴수록 stepper가 더 위에서 나타남
  const activationY = headerH + extra;
  // 1) activation line이 섹션 안에 걸쳐 있을 때만 해당 스텝 활성화
  let newIndex = 1;
  for (let i = 0; i < sectionEls.length; i++) {
    const rect = sectionEls[i].getBoundingClientRect();
    if (rect.top <= activationY) {
      newIndex = i + 1;
    } else {
      break; // 이후 섹션들은 더 아래에 있으므로 중단
    }
  }
  if (stepIndex.value !== newIndex) {
    stepIndex.value = newIndex;
    emit("go", newIndex);
  }

  // 2) showStepper 역시 activation line이 첫/마지막 구간 사이에 있을 때만 true
  const firstRect = sectionEls[0].getBoundingClientRect();
  const lastRect = sectionEls[sectionEls.length - 1].getBoundingClientRect();
  showStepper.value =
    firstRect.top < activationY && lastRect.bottom > activationY;
}
function setStepperTop() {
  const headerEl = document.querySelector(".header"); // 헤더 태그가 <header>라면
  const headerH = headerEl?.getBoundingClientRect().height || 0;
  // 여유 15px
  stepperEl.value.style.top = `${headerH + 10}px`;
}
onMounted(() => {
  nextTick(() => {
    // 1) 섹션 요소 수집
    props.selectors.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) sectionEls.push(el);
    });

    // 2) 초기 위치/인덱스 세팅
    setStepperTop();
    updateStepOnScroll();

    // 3) 이벤트 바인딩
    // 스크롤할 때마다
    window.addEventListener("scroll", updateStepOnScroll, { passive: true });
    // 창 크기 바뀔 때
    window.addEventListener("resize", setStepperTop);
    // 포커스 이동 시
    document.addEventListener("focusin", handleFocusIn, true);
    setStepperTop();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateStepOnScroll);
  window.removeEventListener("resize", setStepperTop);
  document.removeEventListener("focusin", handleFocusIn, true);
});

// active 변경 시 위치 업데이트
watch(stepIndex, () => updateStepperPosition());
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

.sticky-stepper {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 6000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  background: linear-gradient(
    to right,
    transparent 0,
    transparent 50px,
    #fff 50px,
    #fff calc(100% - 50px),
    transparent calc(100% - 50px),
    transparent 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;

  border-top: 3px solid #c1ebd0;
  border-bottom: 3px solid #c1ebd0;
}

/* Prev/Next 버튼 */
.step-nav button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 25px;
    height: auto;
    transform: rotate(90deg);
    transition: filter 0.2s;
  }
  &:disabled img {
    filter: invert(100%) brightness(80%);
  }
}
.stepper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.step {
  display: flex;
  align-items: center;
  position: relative;
}

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.bar {
  flex: 1;
  height: 3px;
  background: #ddd;
  margin: 0 -4px;
  z-index: 1;
}

.circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 3px solid #ddd;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
}

.label {
  margin-top: 6px;
  font-size: 14px;
  color: #555;
  text-align: center;
}

.step.done .circle {
  background: #ccc;
  border-color: #ccc;
}
.step.active .circle {
  background: $sub-color;
  border-color: $sub-color;
  color: #fff;
}
.step.active .label {
  color: #571563;
  font-weight: bold;
}

.stepper-fade-enter-from,
.stepper-fade-leave-to {
  opacity: 0;
  margin-top: -10px;
}
.stepper-fade-enter-to,
.stepper-fade-leave-from {
  opacity: 1;
  margin-top: 0;
}
</style>
