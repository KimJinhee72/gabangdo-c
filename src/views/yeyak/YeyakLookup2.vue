<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const reservations = ref([]);
const selectedReservation = ref(null);
const showCancelModal = ref(false);
const showConfirmModal = ref(false);
const showModal = ref(false);

// 데이터 더미 생성
const startAddresses = [
  "대구 수성구 만촌동 ○○호텔",
  "대구 중구 동성로 ○○게스트하우스",
  "대구 달서구 본리동 ○○레지던스",
  "대구 북구 칠곡 ○○모텔",
  "대구 남구 대명동 ○○하우스",
  "대구 달성군 현풍읍 ○○리조트",
  "대구 동구 신암동 ○○게하",
  "대구 서구 비산동 ○○호스텔",
  "대구 중구 삼덕동 ○○호텔",
  "대구 수성구 지산동 ○○펜션",
  "대구 동구 율하동 ○○스테이",
  "대구 북구 학정동 ○○민박",
  "대구 중구 봉산동 ○○레지던스",
  "대구 달서구 송현동 ○○하우스",
  "대구 남구 봉덕동 ○○호텔",
  "대구 수성구 황금동 ○○게스트룸",
  "대구 동구 검사동 ○○게스트하우스",
  "대구 중구 계산동 ○○모텔",
  "대구 동구 방촌동 ○○숙소",
  "대구 북구 침산동 ○○오피스텔",
];
const stopAddresses = [
  "대구 중구 공평동 ○○호텔",
  "대구 수성구 범어동 ○○게하",
  "대구 북구 읍내동 ○○하우스",
  "대구 달성군 다사읍 ○○펜션",
  "대구 동구 신천동 ○○레지던스",
  "대구 서구 내당동 ○○숙소",
  "대구 남구 이천동 ○○게스트하우스",
  "대구 중구 남산동 ○○민박",
  "대구 수성구 파동 ○○리조트",
  "대구 동구 동촌동 ○○게스트룸",
  "대구 북구 복현동 ○○호텔",
  "대구 중구 덕산동 ○○오피스텔",
  "대구 달서구 감삼동 ○○스테이",
  "대구 수성구 두산동 ○○게하",
  "대구 서구 평리동 ○○레지던스",
  "대구 동구 효목동 ○○하우스",
  "대구 중구 교동 ○○게스트하우스",
  "대구 남구 대명11동 ○○펜션",
  "대구 북구 구암동 ○○모텔",
  "대구 달성군 유가읍 ○○게스트룸",
];
const names = ["김철수", "이영희", "박지민", "최준호", "장서연"];
const places = ["대구공항", "동대구역", "서대구역", "숙소"];
const bagTypes = [
  { label: "S사이즈", tag: "(기내용)" },
  { label: "M사이즈", tag: "(화물용)" },
  { label: "L사이즈", tag: "(대형)" },
];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateReservationNumber(digits = 4) {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const dd = String(now.getDate()).padStart(2, "0");
  const max = 4 ** digits;
  const rnd = String(Math.floor(Math.random() * max)).padStart(digits, "0");
  return `R${yy}${dd}${rnd}`;
}
const reservationNumber = ref(generateReservationNumber());

function generateRandomDate() {
  const d = new Date();
  d.setDate(d.getDate() + getRandomInt(0, 6));

  const year = d.getFullYear();
  const month = d.getMonth() + 1; // 월은 0부터 시작
  const day = d.getDate();

  return `${year}년\u00A0${month}월\u00A0${day}일`;
}
function generateRandomTime() {
  // 8시부터 18시까지 랜덤 시각
  const hour24 = getRandomInt(8, 18);
  // 분은 0,10,20,…,50 중 랜덤
  const minute = [0, 10, 20, 30, 40, 50][getRandomInt(0, 5)];

  // AM/PM 결정 (12시 이전 → 오전, 이후 → 오후)
  const period = hour24 < 12 ? "오전" : "오후";

  // 12시간제로 변환 (0→12, 13→1, …)
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  // 두 자리 문자열 포맷
  const h = String(hour12).padStart(2, "0");
  const m = String(minute).padStart(2, "0");

  return `${period}\u00A0${h}:${m}`;
}

function generateRandomBags() {
  return bagTypes
    .map((t) => ({ label: t.label, tag: t.tag, count: getRandomInt(0, 3) }))
    .filter((b) => b.count > 0);
}

function generateDummyReservations() {
  const list = [];
  for (let i = 0; i < 5; i++) {
    list.push({
      reservationNumber: generateReservationNumber(),
      name: getRandomItem(names),
      phone: `010${getRandomInt(1000, 9999)}${getRandomInt(1000, 9999)}`,
      date: generateRandomDate(),
      time: generateRandomTime(),
      start: getRandomItem(places),
      stop: getRandomItem(places),
      customStartAddress: getRandomItem(startAddresses),
      customStopAddress: getRandomItem(stopAddresses),
      bags: generateRandomBags(),
    });
  }
  return list;
}

onMounted(() => {
  reservations.value = generateDummyReservations();
  selectedReservation.value = getRandomItem(reservations.value);
});

const summaryRows = computed(() => {
  const r = selectedReservation.value;
  if (!r) return [];

  const rows = [
    { label: "예약번호", value: reservationNumber.value },
    { label: "이름", value: r.name },
    { label: "전화번호", value: r.phone },
    // ───────────── 구분선 추가 ─────────────
    { divider: true },
    {
      label: "이용날짜 및 시간",
      value: `${r.date}\u00A0\u00A0${r.time}`,
    },
    {
      label: "출발 → 도착",
      value: `${r.start} → ${r.stop}`,
    },
  ];

  // 숙소 입력 주소
  if (r.start === "숙소")
    rows.push({
      label: "",
      value: `출발 숙소명: ${r.customStartAddress}`,
      cssClass: "addr-start",
    });
  if (r.stop === "숙소")
    rows.push({
      label: "",
      value: `도착 숙소명: ${r.customStopAddress}`,
      cssClass: "addr-stop",
    });
  // ───────────── 구분선 추가 ─────────────
  rows.push({ divider: true });
  // 가방 요약
  if (r.bags.length) {
    r.bags.forEach((b, idx) => {
      rows.push({
        label: idx === 0 ? "가방 종류 및 수량" : "",
        bagLabel: b.label,
        bagTag: b.tag,
        bagCount: `${b.count}개`,
      });
    });
  } else {
    rows.push({
      label: "가방 종류 및 수량",
      bagLabel: "",
      bagTag: "",
      bagCount: "선택한 가방이 없습니다.",
    });
  }

  return rows;
});
//취소하기 모달창
function openCancelModal() {
  showCancelModal.value = true;
}
function closeCancelModal() {
  showCancelModal.value = false;
}

function handleFirstConfirm() {
  // 첫 번째 모달 닫기
  showCancelModal.value = false;
  // 두 번째 모달 열기
  showConfirmModal.value = true;
}

function closeConfirmModal() {
  showConfirmModal.value = false;
  router.push("/");
}

function handleReReservation() {
  showConfirmModal.value = false;
  router.push("/yeyak");
}
//라우터링크
function goToNextPage() {
  router.push("/");
}
</script>

<template>
  <!-- 전체 -->
  <div class="wrap_total">
    <!-- 이너 -->
    <div class="st_wrap">
      <!-- 타이틀 -->
      <div class="yy_title1">
        <div class="title_txt1"><h1>예약조회</h1></div>
      </div>
      <!-- 본문 테두리 -->
      <div class="st_line">
        <!-- 본문 박스 -->
        <div class="text-box">
          <!-- 요약 정보 -->
          <div class="info-box">
            <!-- 구분선 -->
            <template v-for="(row, idx) in summaryRows" :key="idx">
              <hr v-if="row.divider" class="divider extended" />
              <!-- 목록 -->
              <div v-else class="info-row" :class="row.cssClass">
                <span class="label">{{ row.label }}</span>
                <!-- 가방 요약 -->
                <div v-if="row.bagLabel" class="value">
                  <span class="bag-label">{{ row.bagLabel }}&nbsp;</span>
                  <span class="bag-tag">{{ row.bagTag }}&nbsp;</span>
                  <span class="bag-count">{{ row.bagCount }}</span>
                </div>
                <!-- 내용 -->
                <span v-else class="value">
                  {{ row.value }}
                </span>
              </div>
            </template>
          </div>
          <!-- 버튼 -->
          <div class="st_button">
            <div class="button">
              <button class="st_cancle my-button" @click="openCancelModal">
                취소하기
              </button>
            </div>
            <div class="button">
              <button class="my-button st_reser" @click="goToNextPage">
                처음으로
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 취소 확인 모달 -->
  <div v-if="showCancelModal" class="modal-overlay">
    <div class="modal-box">
      <p>예약을 취소하시겠습니까?</p>
      <div class="modal-buttons">
        <button class="btn-confirm" @click="handleFirstConfirm">확인</button>
        <button class="btn-cancel" @click="closeCancelModal">닫기</button>
      </div>
    </div>
  </div>

  <!-- 두 번째 확인 모달 -->
  <div v-if="showConfirmModal" class="modal-overlay">
    <div class="modal-box">
      <p>예약이 취소되었습니다.<br />다시 예약하시겠습니까?</p>
      <div class="modal-buttons">
        <button class="btn-confirm" @click="handleReReservation">
          예약하기
        </button>
        <button class="btn-cancel" @click="closeConfirmModal">처음으로</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

// 전체 래퍼
.st_wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  font-family: $font-family;
}
.yy_title1 {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 30px;
  .title_txt1 h1 {
    font-size: 40px;
    font-family: $font-ownglyph;
  }
}
.st_line {
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  margin: 0 auto;
  border: 1px solid $border-gray;
  box-shadow: $box-shadow;
  border-radius: $radius;
  padding: 30px;
  overflow: visible;
  height: auto;
  background-color: #ffffff;
}

.text-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-box {
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
}
.info-row {
  display: flex;
  align-items: center;
  text-align: left;
  padding: 3px 20px;
  margin: 0;

  &.addr-start,
  &.addr-stop {
    font-weight: normal;
    font-size: 14px;
    color: #707070;
    padding: 1px 50px;
    padding-left: 19ch;
    text-indent: -8.5ch;
    line-height: 1.3;
    word-break: keep-all;
  }
  .label {
    width: 40%;
    text-align: right;
    margin-right: 15px;
    flex: 0 0 auto;
    color: #505050;
    font-size: 16px;
  }
  .value .summary-item {
    color: $dark-gray;
    font-size: 17px;
    display: flex;
    align-items: center;
    gap: 5px;
    text-align: right;
    white-space: pre;
    font-weight: bold;
  }
}

//구분선
.divider.extended {
  border: none;
  border-top: 1px dashed #d6d6d6;
  width: 90%;
  margin: 10px auto;
}
.st_button {
  display: flex;
  gap: 20px;
}

// 제출 버튼
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .st_cancle {
    width: 120px;
    height: 40px;
    background-color: $red-holiday;
    color: #fff;
    font-size: 16px;
    border-radius: $radius;
    cursor: pointer;
    border: none;
    transition: background 0.3s;
    margin: 15px;
    display: block;
  }
  .st_cancle:hover {
    background-color: #a80311;
    color: #fff;
  }
  .st_reser {
    width: 120px;
    height: 40px;
    background-color: color.adjust($main-color, $lightness: 30%);
    color: #fff;
    font-size: 16px;
    border-radius: $radius;
    cursor: pointer;
    border: none;
    transition: background 0.3s;
    margin: 15px;
    display: block;
  }
  .st_reser:hover {
    background-color: color.adjust($sub-color, $lightness: 20%) !important;
  }
}

.my-button {
  position: relative;
  z-index: 4000; /* fixed-buttons(1000)보다 높게 */
}
// 모달 배경
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
}

// 모달 박스
.modal-box {
  background: #fff;
  padding: 30px;
  border-radius: $radius;
  width: 300px;
  text-align: center;
  box-shadow: $box-shadow;

  p {
    margin-bottom: 30px;
    font-size: 17px;
  }
}

// 버튼 그룹
.modal-buttons {
  display: flex;
  justify-content: space-around;

  button {
    padding: 7px 15px;
    border: none;
    border-radius: $radius;
    cursor: pointer;
    font-size: 16px;
  }
  .btn-confirm {
    background-color: $red-holiday;
    color: #fff;
  }
  .btn-cancel {
    background-color: $gray-past;
    color: #333;
  }
  .btn-confirm:hover {
    background-color: #a80311;
    color: #fff;
  }
  .btn-cancel:hover {
    background-color: #505050;
    color: #fff;
  }
}
</style>
