<script setup>
const { steps, selectors, stepIndex } = defineProps({
  steps: { type: Array, required: true },
  selectors: { type: Array, required: true },
  stepIndex: { type: Number, required: true },
});
const emit = defineEmits(["go"]);
// Prev 클릭
function goPrev() {
  if (stepIndex > 1) {
    emit("go", stepIndex - 1);
  }
}
// Next 클릭
function goNext() {
  if (stepIndex < steps.length) {
    emit("go", stepIndex + 1);
  }
}
// 써클 혹은 레이블 클릭
function goTo(idx) {
  emit("go", idx);
}
</script>
<template>
  <transition name="stepper-fade">
    <div class="sticky-stepper">
      <!-- Prev 버튼 -->
      <div class="step-nav">
        <button @click="goPrev" :disabled="stepIndex === 1">
          <img src="/images/cr/down.png" class="rotate" alt="이전" />
        </button>
      </div>

      <!-- 실제 스텝바 -->
      <div class="stepper">
        <div
          v-for="(label, idx) in steps"
          :key="idx"
          :class="[
            'step',
            { active: idx === stepIndex - 1, done: idx < stepIndex - 1 },
          ]">
          <div
            class="wrap"
            tabindex="0"
            @click="goTo(idx + 1)"
            @keydown.enter="goTo(idx + 1)">
            <div class="circle">{{ idx + 1 }}</div>
            <div class="label">{{ label }}</div>
          </div>
        </div>
      </div>
      <!-- Next 버튼 -->
      <div class="step-nav">
        <button @click="goNext" :disabled="stepIndex === steps.length">
          <img src="/images/cr/up.png" class="rotate" alt="다음" />
        </button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

.sticky-stepper {
  top: 85px;
  left: 0;
  right: 0;
  z-index: 6000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;
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
  z-index: 6006;
}

.circle {
  position: relative;
  width: 25px;
  height: 25px;
  border: 3px solid #ddd;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}
.step:not(:last-child) .circle::after {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  width: 100px; /* 원하는 만큼 조절 */
  height: 3px;
  background: #ddd;
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
