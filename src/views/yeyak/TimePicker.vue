<script setup>
import { ref, computed, nextTick, watch } from "vue";

// Props 및 emits 정의
const props = defineProps({
  modelValue: String,
  selectedDate: String,
});
const emit = defineEmits(["update:modelValue"]);

// 팝업 상태 및 선택된 값 관리
const openPopup = ref(false);
const selected = ref(props.modelValue || "");
const picker = ref(null);
const selectedPeriod = ref("AM");

// 시간 옵션 생성
const timeOptions = computed(() => {
  const list = [];
  for (let h = 8; h <= 18; h++) {
    for (let m = 0; m < 60; m += 10) {
      if (h === 18 && m > 0) continue;
      list.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return list;
});

// 오전과 오후 시간 분류
const morningTimes = computed(() =>
  timeOptions.value.filter((t) => Number(t.slice(0, 2)) < 12)
);
const afternoonTimes = computed(() =>
  timeOptions.value
    .filter((t) => Number(t.slice(0, 2)) >= 12)
    .map((t) => {
      const [hh, mm] = t.split(":");
      const h24 = Number(hh);
      const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
      return `${String(h12).padStart(2, "0")}:${mm}`;
    })
);

// 팝업 토글 및 위치 초기화
function togglePopup() {
  openPopup.value = !openPopup.value;
}

// 팝업 위치 계산용 상태
const popupPosition = ref({
  top: "0px",
  left: "0px",
  width: "100%",
  zIndex: 6000,
});

// 팝업 위치 업데이트
function updatePopupPosition() {
  if (!picker.value) return;
  const rect = picker.value.getBoundingClientRect();
  Object.assign(popupPosition.value, {
    top: `${rect.bottom + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
    width: `${rect.width}px`,
    zIndex: 6000,
  });
}

// 팝업 열림 여부 감시하여 이벤트 연결/해제
watch(openPopup, async (isOpen) => {
  if (isOpen) {
    const now = new Date();
    selectedPeriod.value = now.getHours() < 12 ? "AM" : "PM";
    await nextTick();
    updatePopupPosition();
    await nextTick();
    scrollToCurrentTime();
    window.addEventListener("scroll", updatePopupPosition);
    window.addEventListener("resize", updatePopupPosition);
  } else {
    window.removeEventListener("scroll", updatePopupPosition);
    window.removeEventListener("resize", updatePopupPosition);
  }
});

// 시간 선택 처리
function selectTime(time) {
  const prefix = selectedPeriod.value === "AM" ? "오전" : "오후";
  const label = `${prefix}\u00A0${time}`;
  selected.value = label;
  emit("update:modelValue", label);
  openPopup.value = false;
}

// 오늘 날짜인지 확인
function isToday(dateStr) {
  if (!dateStr) return false;
  let y, m, d;

  if (dateStr.includes("년")) {
    [y, m, d] = dateStr
      .replace("년", "")
      .replace("월", "")
      .replace("일", "")
      .trim()
      .split(/\s+/);
  } else {
    [y, m, d] = dateStr.split("-");
  }

  const sel = new Date(Number(y), Number(m) - 1, Number(d));
  sel.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return sel.getTime() === today.getTime();
}

// 비활성 처리할 시간인지 확인
function isTimeDisabled(time) {
  if (!props.selectedDate || !isToday(props.selectedDate)) return false;

  const now = new Date();
  now.setHours(now.getHours() + 2);

  const [h12, m] = time.split(":").map(Number);
  let hour = h12;
  if (selectedPeriod.value === "PM" && h12 < 12) hour += 12;
  if (selectedPeriod.value === "AM" && h12 === 12) hour = 0;

  const input = new Date();
  input.setHours(hour, m, 0, 0);

  return input < now;
}

// 팝업 열릴 때 현재시간으로 스크롤 이동
function scrollToCurrentTime() {
  const list = document.querySelector(".time-list ul");
  if (!list) return;

  const now = new Date();
  let hour = now.getHours();
  const minute = now.getMinutes();

  let closest;
  if (hour < 8) {
    closest = "08:00";
  } else if (hour >= 18) {
    closest = "18:00";
  } else {
    const rounded = Math.ceil(minute / 10) * 10;
    const mm = rounded === 60 ? "00" : String(rounded).padStart(2, "0");
    if (rounded === 60) hour += 1;
    closest = `${String(hour).padStart(2, "0")}:${mm}`;
  }

  const h = hour % 12 === 0 ? 12 : hour % 12;
  const mm = closest.split(":")[1];
  const displayTime = `${String(h).padStart(2, "0")}:${mm}`;

  for (const item of list.querySelectorAll("li")) {
    if (item.textContent?.trim() === displayTime) {
      item.scrollIntoView({ block: "center", behavior: "smooth" });
      break;
    }
  }
}
</script>

<template>
  <!-- 전체 -->
  <div class="time-picker-wrapper" ref="picker">
    <!-- 선택 필드 -->
    <div class="datetime-input-wrapper" @click.stop="togglePopup">
      <i class="ri-time-line icon"></i>
      <input
        type="text"
        :value="selected"
        placeholder="시간을 선택해주세요"
        readonly
        class="datetime-input" />
    </div>
    <!-- 시간 팝업 -->
    <teleport to="body">
      <div v-if="openPopup" class="overlay" @click.self="openPopup = false">
        <div class="time-popup" :style="popupPosition" @click.stop>
          <div class="period-list">
            <button
              :class="{ active: selectedPeriod === 'AM' }"
              @click="selectedPeriod = 'AM'">
              오전
            </button>
            <button
              :class="{ active: selectedPeriod === 'PM' }"
              @click="selectedPeriod = 'PM'">
              오후
            </button>
          </div>
          <div class="time-list">
            <ul>
              <li
                v-for="t in selectedPeriod === 'AM'
                  ? morningTimes
                  : afternoonTimes"
                :key="t"
                :class="{ disabled: isTimeDisabled(t) }"
                @click="!isTimeDisabled(t) && selectTime(t)">
                {{ t }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

.time-picker-wrapper {
  height: 100%;
  overflow: visible;
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  font-family: $font-family;
  color: $dark-gray;
  z-index: 5500;
}

.datetime-input-wrapper {
  height: 100%;
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.datetime-input {
  height: 100%;
  position: relative;
  width: 100%;
  padding-left: 48px;
  font-size: 15px;
  border: 1px solid $border-gray;
  border-radius: $radius;
  background: #fff;
  box-sizing: border-box;
  cursor: pointer;
  color: $dark-gray;
  &:focus {
    outline: 3px solid $blue-sky;
    outline-offset: -2px;
  }
}
:deep(.datetime-input) ::placeholder {
  color: #888888;
  opacity: 1;
}
.icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  color: #888888;
  pointer-events: none;
  z-index: 5500;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 5000;
}
.time-popup {
  position: absolute;
  display: flex;
  text-align: center;
  top: 48px;
  left: 0;
  z-index: 6000;
  width: 100%;
  font-size: 15px;
  max-height: 300px;
  background: #fff;
  border: 1px solid $border-gray;
  border-radius: $radius;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
//왼쪽 AM/PM
.period-list {
  display: flex;
  flex-direction: column;
  width: 30%;
  border-right: 1px solid #eee;
}
.period-list button {
  flex: 1;
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: color.adjust($blue-sky, $lightness: 30%);
  }
}
.period-list button.active {
  background: $blue-sky;
  color: #fff;
  font-weight: bold;
}

//오른쪽 시간 목록
.time-list {
  width: 70%;
  overflow-y: auto;
}
.time-list ul {
  list-style: none;
  margin: 0;
  padding: 8px;
}
.time-list li {
  padding: 8px;
  cursor: pointer;
  text-align: center;
  transition: background 0.2s;
  margin: 5px;
}
.time-list li:hover {
  background: color.adjust($blue-sky, $lightness: 30%);
}
//시간 비활성화
.disabled {
  pointer-events: none;
  cursor: not-allowed;
  background: #d4d4d4;
  color: $dark-gray;
  opacity: 0.6;
}
</style>
