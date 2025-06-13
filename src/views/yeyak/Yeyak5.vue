<script setup>
import { ref, computed, onMounted } from "vue";
import { useReservationStore } from "@/stores/reservationStore";
import { useRouter } from "vue-router";

// 스토어 & 라우터 초기화
const store = useReservationStore();
const router = useRouter();

// 예약번호 생성 함수 & ref
function generateReservationNumber(digits = 4) {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const dd = String(now.getDate()).padStart(2, "0");
  const rnd = String(Math.floor(Math.random() * 4 ** digits)).padStart(
    digits,
    "0"
  );
  return `R${yy}${dd}${rnd}`;
}
const reservationNumber = ref(generateReservationNumber());

// ISO 문자열을 한국어 날짜로 변환하는 함수
function formatKoreanDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${y}년 ${m}월 ${d}일`;
}

// 페이지 진입 시: 오늘 날짜 선택 여부에 따라 가격 초기화/조정
onMounted(() => {
  const todayISO = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  if (store.selectedDate === todayISO) {
    store.handleTodaySelected();
  } else {
    store.resetPrices();
  }
});

// 전체 요약 데이터 생성
const summaryRows = computed(() => {
  const rows = [
    { label: "예약번호", value: reservationNumber.value },
    { label: "이름", value: store.name },
    { label: "전화번호", value: store.fullPhone },
    // 구분선 추가
    { divider: true },
    {
      label: "이용날짜 및 시간",
      value: `${formatKoreanDate(store.selectedDate)}\u00A0\u00A0${
        store.selectedTime
      }`,
    },
  ];
  if (store.selectedStart || store.selectedStop) {
    rows.push({
      label: "출발 → 도착",
      value: `${store.selectedStart || "—"} → ${store.selectedStop || "—"}`,
    });
  }
  if (store.customStartAddress) {
    rows.push({
      label: "",
      value: `출발 숙소명: ${store.customStartAddress}`,
      cssClass: "addr-start",
    });
  }
  if (store.customStopAddress) {
    rows.push({
      label: "",
      value: `도착 숙소명: ${store.customStopAddress}`,
      cssClass: "addr-stop",
    });
  }
  // 가방 & 총 금액 & 결제방식 모두 여기서 한 번에 처리
  rows.push(...makeBagRows(store.sizes));
  return rows;
});

// 가방 & 총액 & 결제방식
function makeBagRows(sizes) {
  const bagRows = [];
  const selected = sizes.filter((i) => i.count > 0);
  // 구분선 추가
  bagRows.push({ divider: true });
  // 가방 종류 및 수량
  if (selected.length) {
    selected.forEach((item, i) => {
      bagRows.push({
        label: i === 0 ? "가방 종류 및 수량" : "",
        bagLabel: item.label,
        bagTag: item.tag,
        bagCount: `${item.count}개`,
      });
    });
  } else {
    bagRows.push({
      label: "가방 종류 및 수량",
      value: "선택한 가방이 없습니다.",
    });
  }
  // 구분선 추가
  bagRows.push({ divider: true });
  // 총 금액
  const price = store.totalPrice;
  bagRows.push({
    label: "총 금액",
    value: isNaN(price) ? "0원" : `${price.toLocaleString()}\u00A0\원`,
    highlight: true,
    cssClass: "total-price",
  });

  // 결제방식
  bagRows.push({
    label: "결제방식",
    value:
      {
        bank: "계좌이체",
        card: "카드결제",
        phone: "휴대폰이체",
        toss: "토스",
        naver: "네이버페이",
        kakao: "카카오페이",
      }[store.paymentMethod] || "선택안됨",
  });

  return bagRows;
}
// 다음 단계 이동
function goToNextStep() {
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
        <div class="title_txt1"><h1>예약완료</h1></div>
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
              <!-- 예약 정보 1 -->
              <div v-else class="info-row" :class="row.cssClass">
                <span class="label">{{ row.label }}</span>
                <!-- 가방 요약 -->
                <div v-if="row.bagLabel" class="summary-item">
                  <span class="bag-label">{{ row.bagLabel }}&nbsp;</span>
                  <span class="bag-tag">{{ row.bagTag }}&nbsp;</span>
                  <span class="bag-count">{{ row.bagCount }}</span>
                </div>
                <!-- 예약 정보 2 -->
                <div
                  v-else
                  class="value"
                  :class="[row.highlight ? 'highlight' : '', row.cssClass]">
                  <span>
                    {{ row.value }}
                  </span>
                </div>
              </div>
            </template>
          </div>
          <!-- 예약취소 안내문구 -->
          <div class="cancletxt">
            <i class="ri-error-warning-line"></i>
            <span
              >예약취소는
              <p class="page">예약조회 페이지</p>
              에서 가능합니다.</span
            >
          </div>
          <!-- 버튼 -->
          <div class="button">
            <button class="my-button st_reser" @click="goToNextStep">
              처음으로
            </button>
          </div>
        </div>
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

// 타이틀
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
  }
}

//구분선
.divider.extended {
  border: none;
  border-top: 1px dashed #d6d6d6;
  width: 90%;
  margin: 10px auto;
}
//취소안내문구
.cancletxt {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  i {
    color: red;
    margin-right: 3px;
    font-size: 20px;
  }
  span {
    display: flex;
  }
  .page {
    color: blue;
    margin: 0 3px;
  }
}
// 제출 버튼
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
</style>
