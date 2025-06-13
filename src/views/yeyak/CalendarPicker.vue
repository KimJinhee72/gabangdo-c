<script setup>
import {
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from "vue";

// Props 및 emits 정의
const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

// 로컬 상태
const anchor = ref(null);
const showCalendar = ref(false);
const selectedDate = ref("");

// 화면에 표시할 날짜 문자열
const display = computed(() => selectedDate.value);

// ISO 문자열을 “YYYY년 MM월 DD일” 포맷으로 변환
watch(
  () => props.modelValue,
  (iso) => {
    if (!iso) {
      selectedDate.value = "";
      return;
    }
    const [Y, M, D] = iso.split("-");
    selectedDate.value = `${Y}년 ${M}월 ${D}일`;
  },
  { immediate: true }
);

// 오늘 정보
const now = new Date();
const todayYear = now.getFullYear();
const todayMonth = now.getMonth();
const todayDay = now.getDate();
const year = ref(todayYear);
const month = ref(todayMonth);
const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

// 해당 달의 총 일수 계산
function daysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}
const firstDay = computed(() => new Date(year.value, month.value, 1).getDay());
const days = computed(() =>
  Array.from({ length: daysInMonth(year.value, month.value) }, (_, i) => i + 1)
);

// 과거 날짜 판단
function isPast(day) {
  if (year.value < todayYear) return true;
  if (year.value === todayYear && month.value < todayMonth) return true;
  if (year.value === todayYear && month.value === todayMonth && day < todayDay)
    return true;
  return false;
}

// 선택된 날
function isSelected(day) {
  const match = selectedDate.value.match(/(\d+)년\s?(\d+)월\s?(\d+)일/);
  if (!match) return false;
  const [y, m, d] = match.slice(1).map(Number);
  return y === year.value && m - 1 === month.value && d === day;
}

// 이전 달로
function prevMonth() {
  if (month.value === 0) {
    year.value--;
    month.value = 11;
  } else month.value--;
}

// 다음 달로
function nextMonth() {
  if (month.value === 11) {
    year.value++;
    month.value = 0;
  } else month.value++;
}

// 공휴일 목록
const holidaysOfMonth = ref([]);

// 공휴일 불러오기
async function loadHolidays() {
  try {
    const res = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year.value}/KR`
    );
    const list = await res.json();
    const mm = String(month.value + 1).padStart(2, "0");
    holidaysOfMonth.value = list
      .filter((h) => h.date.startsWith(`${year.value}-${mm}-`))
      .map((h) => Number(h.date.split("-")[2]));
  } catch {
    holidaysOfMonth.value = [];
  }
}

// 년도 또는 월이 바뀔 때마다 공휴일 갱신
watch([year, month], loadHolidays, { immediate: true });

// 공휴일인지 판단
function isHoliday(day) {
  return holidaysOfMonth.value.includes(day);
}

// 토요일인지 판단
function isSaturday(day) {
  return new Date(year.value, month.value, day).getDay() === 6;
}

// 일요일인지 판단
function isSunday(day) {
  return new Date(year.value, month.value, day).getDay() === 0;
}

// 날짜 선택 시 ISO 포맷 emit
function selectDay(day) {
  const M = String(month.value + 1).padStart(2, "0");
  const D = String(day).padStart(2, "0");
  emit("update:modelValue", `${year.value}-${M}-${D}`);
  showCalendar.value = false;
}

// 팝업 위치를 관리할 reactive 객체로 분리
const popupPosition = ref({
  top: "0px",
  left: "0px",
  width: "100px",
  zIndex: 6000,
});

// 실제 스타일로 변환
const popupStyle = computed(() => ({
  position: "absolute",
  top: popupPosition.value.top,
  left: popupPosition.value.left,
  width: popupPosition.value.width,
  zIndex: popupPosition.value.zIndex,
}));

// 위치 계산 함수
function updatePopupPosition() {
  const el = anchor.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  popupPosition.value.top = `${r.bottom + window.scrollY}px`;
  popupPosition.value.left = `${r.left + window.scrollX}px`;
  popupPosition.value.width = `${r.width}px`;
}

// 달력 토글(팝업이 닫혀 있다가 열릴 때 오늘 기준으로 초기화)
function toggleCalendar() {
  showCalendar.value = !showCalendar.value;
  if (showCalendar.value) {
    // 팝업을 연 직후 위치 초기 계산
    nextTick(updatePopupPosition);
    // 스크롤(수평+수직) 과 리사이즈 이벤트에 붙이기
    window.addEventListener("scroll", updatePopupPosition);
    window.addEventListener("resize", updatePopupPosition);
  } else {
    // 팝업을 닫을 때는 이벤트 해제
    window.removeEventListener("scroll", updatePopupPosition);
    window.removeEventListener("resize", updatePopupPosition);
  }
}

// 영역 외 클릭 시 닫기
function onClickOutside(e) {
  if (anchor.value && !anchor.value.contains(e.target)) {
    showCalendar.value = false;
  }
}

// 마운트/언마운트 훅
onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
  window.removeEventListener("scroll", updatePopupPosition);
  window.removeEventListener("resize", updatePopupPosition);
});
</script>

<template>
  <!-- 전체 -->
  <div class="calendar-wrapper">
    <!-- 선택 필드 -->
    <div class="datetime-input-wrapper" ref="anchor" @click="toggleCalendar">
      <i class="ri-calendar-event-line icon"></i>
      <input
        type="text"
        readonly
        :value="display"
        class="datetime-input"
        placeholder="날짜를 선택해주세요" />
    </div>
    <!-- 달력 팝업 -->
    <teleport to="body">
      <div
        v-if="showCalendar"
        class="calendar-popup"
        :style="popupStyle"
        @click.stop>
        <div class="calendar-nav">
          <button @click="prevMonth">&lt;</button>
          <span>{{ year }}년 {{ month + 1 }}월</span>
          <button @click="nextMonth">&gt;</button>
        </div>
        <div class="calendar-grid calendar-weekdays">
          <div v-for="wd in weekdays" :key="wd">{{ wd }}</div>
        </div>
        <div class="calendar-grid calendar-days">
          <div v-for="n in firstDay" :key="`e-${n}`" class="empty-cell"></div>
          <button
            v-for="day in days"
            :key="day"
            type="button"
            :class="[
              'day-cell',
              {
                selected: isSelected(day),
                past: isPast(day),
                holiday: isHoliday(day),
                saturday: isSaturday(day),
                sunday: isSunday(day),
              },
            ]"
            :disabled="isPast(day)"
            @click="selectDay(day)">
            {{ day }}
          </button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

.calendar-wrapper {
  overflow: visible;
  height: 100%;
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
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
.calendar-popup {
  position: absolute;
  top: 56px;
  left: 0;
  z-index: 6000;
  width: 100%;
  max-width: 500px;
  padding: 6px;
  font-size: 15px;
  background: #fff;
  border: 1px solid $border-gray;
  border-radius: $radius;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 18px;
}
.calendar-nav button {
  background: none;
  border: none;
  font-size: 19px;
  cursor: pointer;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}
.calendar-weekdays {
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 15px;
}
.calendar-days {
  grid-auto-rows: 40px;
}
.day-cell {
  border: none;
  background: none;
  cursor: pointer;
  border-radius: $radius;
  font-size: 15px;
}
.day-cell.selected {
  background: $blue-sky;
  color: #fff;
}
.day-cell.holiday {
  color: $red-holiday;
}
.day-cell.saturday {
  color: $blue-weekend;
}
.day-cell.sunday {
  color: $red-holiday;
}
.day-cell:hover:not(.past) {
  transition: background 0.2s;
  background: color.adjust($blue-sky, $lightness: 30%);
}
.empty-cell {
  visibility: hidden;
}
//날짜 비활성화
.day-cell.past {
  color: $gray-past;
  cursor: not-allowed;
}
</style>
