<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Props 및 emits 정의
const props = defineProps({
  // v-model 값
  modelValue: [String, Number],
  // 드롭다운옵션 배열
  options: {
    type: Array,
    default: () => [
      { value: "010", label: "010" },
      { value: "011", label: "011" },
      { value: "016", label: "016" },
      { value: "017", label: "017" },
      { value: "018", label: "018" },
      { value: "019", label: "019" },
    ],
  },
  // 기본 텍스트
  placeholder: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);

// 컴포넌트 로컬 상태
const picker = ref(null);
const open = ref(false);
const selectedLabel = ref("");
const popupPosition = ref({ top: "0px", left: "0px", width: "0px" });

// 외부 클릭 감지해서 닫기
function handleClickOutside(e) {
  if (!e.target.closest(".custom-select")) {
    open.value = false;
  }
}
// 초기값 렌더링(마운트 시)
onMounted(() => document.addEventListener("click", handleClickOutside));
// 언마운트 시 정리
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside)
);

// 옵션 선택
function select(opt) {
  emit("update:modelValue", opt.value);
  selectedLabel.value = opt.label;
  open.value = false;
}
// 입력창 위치 계산
function updatePopupPosition() {
  if (!picker.value) return;
  const r = picker.value.getBoundingClientRect();
  popupPosition.value = {
    position: "absolute",
    top: `${r.bottom + window.scrollY}px`,
    left: `${r.left + window.scrollX}px`,
    width: `${r.width}px`,
    zIndex: 6000,
  };
}

// 토글
function toggle() {
  open.value = !open.value;
  if (open.value) {
    updatePopupPosition();
    window.addEventListener("scroll", updatePopupPosition);
    window.addEventListener("resize", updatePopupPosition);
  } else {
    window.removeEventListener("scroll", updatePopupPosition);
    window.removeEventListener("resize", updatePopupPosition);
  }
}

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updatePopupPosition);
  window.removeEventListener("resize", updatePopupPosition);
});
// modelValue가 있으면 레이블 설정
onMounted(() => {
  const init = props.options.find((o) => o.value === props.modelValue);
  if (init) selectedLabel.value = init.label;
});
</script>

<template>
  <!-- 전체 -->
  <div class="custom-select" ref="picker">
    <!-- 선택 필드 -->
    <div class="select-input" tabindex="0" @click="toggle">
      <span class="input-text">
        {{ selectedLabel || placeholder }}
      </span>
      <i class="ri-arrow-down-s-line icon" :class="{ open }"></i>
    </div>
    <!-- 번호 팝업 -->
    <teleport to="body">
      <ul v-if="open" class="options" :style="popupPosition">
        <li
          v-for="opt in options"
          :key="opt.value"
          class="option"
          @click="select(opt)">
          {{ opt.label }}
        </li>
      </ul>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

.custom-select {
  overflow: visible;
  height: 100%;
  position: relative;
  width: 80px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-family: $font-family;
  color: $dark-gray;
  z-index: 5500;

  .select-input {
    height: 100%;
    width: 100%;
    position: relative;
    border: 1px solid $border-gray;
    border-radius: $radius;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;

    &:focus {
      outline: 3px solid $blue-sky;
      outline-offset: -2px;
    }

    .input-text {
      height: 100%;
      padding-right: 10px;
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .icon {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      font-size: 20px;
      color: #888888;
      pointer-events: none;
      z-index: 5500;
    }
  }
}

.options {
  position: absolute;
  text-align: center;
  align-items: center;
  top: 100%;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  font-size: 15px;
  list-style: none;
  border: 1px solid $border-gray;
  border-radius: $radius;
  background: #fff;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 6000;

  .option {
    padding: 8px;
    cursor: pointer;
    text-align: center;
    align-items: center;
    transition: background 0.2s;
    margin: 5px;
    &:hover {
      background: color.adjust($blue-sky, $lightness: 30%);
    }
  }
}
</style>
