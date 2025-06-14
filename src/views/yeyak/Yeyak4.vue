<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useReservationStore } from "@/stores/reservationStore";
import CalendarPicker from "@/views/yeyak/CalendarPicker.vue";
import TimePicker from "@/views/yeyak/TimePicker.vue";
// 스토어 & 라우터 초기화
const store = useReservationStore();
const router = useRouter();
// ISO 문자열을 한국어 날짜로 변환하는 함수
function formatKoreanDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${y}년 ${m}월 ${d}일`;
}
// 페이지 진입 시: 오늘 날짜 선택 여부에 따라 가격 초기화/조정
onMounted(() => {
  const todayISO = new Date().toISOString().slice(0, 10);
  if (store.selectedDate === todayISO) {
    store.handleTodaySelected();
  } else {
    store.resetPrices();
  }
});
// 전체 요약 데이터 생성
const summaryRows = computed(() => {
  const rows = [
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
// 가방 & 총액
function makeBagRows(sizes) {
  const bagRows = [];
  const selected = sizes.filter((i) => i.count > 0);
  // 구분선 추가
  bagRows.push({ divider: true });
  // 가방 종류 및 수량
  if (selected.length) {
    selected.forEach((item, idx) => {
      bagRows.push({
        label: idx === 0 ? "가방 종류 및 수량" : "",
        bagLabel: item.label,
        bagTag: item.tag,
        bagCount: `${item.count}개`,
      });
    });
  } else {
    bagRows.push({
      label: "가방 종류 및 수량",
      value: "선택한 가방이 없습니다",
    });
  }
  // 구분선 추가
  bagRows.push({ divider: true });
  // 총 금액
  const price = store.totalPrice;
  bagRows.push({
    label: "총 금액",
    value: isNaN(price) ? "원" : `${price.toLocaleString()}\u00A0\원`,
    highlight: true,
    cssClass: "total-price",
  });
  return bagRows;
}
// ① 전체 편집 토글 플래그
const showEditButtons = ref(false);
function toggleEditAll() {
  showEditButtons.value = !showEditButtons.value;
  editing.value = null;
}

// ② 어떤 항목을 편집 중인지: 'dateTime' | 'route' | 'bags' | null
const editing = ref(null);

// 편집 완료
function finishEdit() {
  editing.value = null;
}

// ③ 가방 개수 변경 시마다 가격 갱신
watch(
  () => store.sizes.map((i) => i.count),
  () => {
    const today = new Date().toISOString().slice(0, 10);
    if (store.selectedDate === today) store.handleTodaySelected();
    else store.resetPrices();
  },
  { deep: true }
);
// 가방 중 count>0인 것만
const selectedBags = computed(() => store.sizes.filter((bag) => bag.count > 0));

// 결제방식
const selectedPayment = ref("");
// 결제 수단 텍스트와 아이콘 매핑
const paymentTexts = {
  bank: "계좌이체",
  card: "카드결제",
  phone: "휴대폰이체",
};
const paymentIcons = {
  toss: "/images/cr/yy_toss.png",
  naver: "/images/cr/yy_naver.png",
  kakao: "/images/cr/yy_kakao.png",
};

// 다음 단계 이동
function submitReservation() {
  if (!selectedPayment.value) {
    alert("결제 수단을 선택해주세요");
    return;
  }
  store.paymentMethod = selectedPayment.value;
  router.push("/yeyak5");
}
</script>

<template>
  <!-- 전체 -->
  <div class="wrap_total">
    <!-- 이너 -->
    <div class="st_wrap">
      <!-- 타이틀 -->
      <div class="yy_title1">
        <div class="title_txt1">
          <h1>결제하기</h1>
        </div>
      </div>
      <!-- 본문 테두리 -->
      <div class="st_line">
        <!-- 본문 박스 -->
        <div class="payment-page">
          <!-- 요약 정보 -->
          <div class="payment-info-box">
            <div class="info-row">
              <span class="label">이름</span>
              <span class="value">{{ store.name }}</span>
            </div>
            <!-- 0) 전화번호 -->
            <div class="info-row">
              <span class="label">전화번호</span>
              <span class="value">{{ store.fullPhone }}</span>
            </div>

            <hr class="divider extended" />

            <!-- 1) 날짜/시간 -->
            <div class="info-row" :class="{ editing: editing === 'dateTime' }">
              <span class="label">이용날짜 및 시간</span>
              <span class="value" :class="{ editing: editing === 'dateTime' }">
                <template v-if="editing === 'dateTime'">
                  <CalendarPicker v-model="store.selectedDate" class="dt1" />
                  <TimePicker v-model="store.selectedTime" class="dt2" />
                </template>
                <template v-else>
                  <span class="value">
                    {{ formatKoreanDate(store.selectedDate) }}
                    {{ store.selectedTime }}
                  </span>
                </template>
              </span>
              <button
                v-if="editing !== 'dateTime'"
                @click="editing = 'dateTime'"
                class="tab-button small">
                수정
              </button>
              <button v-else @click="editing = null" class="tab-button small">
                완료
              </button>
            </div>
            <!-- 2) 출발 → 도착 -->
            <div class="info-row" :class="{ editing: editing === 'route' }">
              <span class="label">출발 → 도착</span>
              <span class="value" :class="{ editing: editing === 'route' }">
                <template v-if="editing === 'route'">
                  <select v-model="store.selectedStart" class="ad1">
                    <option v-for="o in store.startPlaces" :key="o">
                      {{ o }}
                    </option>
                  </select>
                  <input
                    v-if="store.selectedStart === '숙소'"
                    v-model="store.customStartAddress"
                    placeholder="숙소명 입력"
                    class="value ad2" />
                  <select v-model="store.selectedStop" class="ad3">
                    <option v-for="o in store.stopPlaces" :key="o">
                      {{ o }}
                    </option>
                  </select>
                  <input
                    v-if="store.selectedStop === '숙소'"
                    v-model="store.customStopAddress"
                    placeholder="숙소명 입력"
                    class="value ad4" />
                </template>
                <template v-else>
                  <span class="value">
                    {{ store.selectedStart || "" }} →
                    {{ store.selectedStop || "" }}
                  </span>
                </template>
              </span>
              <button
                v-if="editing !== 'route'"
                @click="editing = 'route'"
                class="tab-button small">
                수정
              </button>
              <button v-else @click="editing = null" class="tab-button small">
                완료
              </button>
            </div>
            <!-- 숙소 주소는 별도 줄로 -->
            <div
              v-if="store.selectedStart === '숙소' && store.customStartAddress"
              class="info-row addr-start">
              <span class="label"></span>
              <span class="value"
                >출발 숙소명: {{ store.customStartAddress }}</span
              >
            </div>
            <div
              v-if="store.selectedStop === '숙소' && store.customStopAddress"
              class="info-row addr-stop">
              <span class="label"></span>
              <span class="value">
                도착 숙소명: {{ store.customStopAddress }}</span
              >
            </div>

            <hr class="divider extended" />

            <!-- 3) 가방 종류 및 수량 -->
            <div class="info-row bags-section">
              <span class="label">가방 종류 및 수량</span>

              <!-- 값 영역: editing 여부에 따라 다른 span.value 렌더 -->
              <span class="value" v-if="editing === 'bags'">
                <!-- 편집 모드: 각 아이템 수량 인풋 -->
                <div
                  v-for="bag in store.sizes"
                  :key="bag.tag"
                  class="bag-edit-item">
                  <span class="bag-label">{{ bag.label }}{{ bag.tag }}</span>
                  <input
                    type="number"
                    v-model.number="bag.count"
                    min="0"
                    class="bag-input" />
                </div>
              </span>

              <span class="value" v-else>
                <!-- 보기 모드: count>0 아이템만 -->
                <div
                  v-for="bag in store.sizes.filter((x) => x.count > 0)"
                  :key="bag.tag"
                  class="summary-item">
                  {{ bag.label }} {{ bag.tag }} {{ bag.count }}개
                </div>
              </span>

              <!-- 수정/완료 버튼 (항상 보이도록) -->
              <button
                v-if="editing !== 'bags'"
                @click="editing = 'bags'"
                class="tab-button small">
                수정
              </button>
              <button v-else @click="editing = null" class="tab-button small">
                완료
              </button>
            </div>
            <!-- 전체금액 -->
            <hr class="divider extended" />
            <div class="info-row">
              <span class="label">총 금액</span>
              <span class="value total-price">
                {{ Number(store.totalPrice).toLocaleString() }}원
              </span>
            </div>
            <!-- 결제 수단 선택 -->
            <div class="payment">
              <div class="payment-wrap">
                <div class="payment-methods">
                  <!-- 일반결제 -->
                  <label
                    v-for="(val, key) in paymentTexts"
                    :key="key"
                    class="payment-option my-button"
                    :class="{ active: selectedPayment === key }">
                    <input
                      type="radio"
                      v-model="selectedPayment"
                      :value="key"
                      name="payment"
                      class="my-button" />
                    {{ val }}
                  </label>
                  <!-- 간편결제 -->
                  <div class="payment-icons-wrapper payment-icons-inline">
                    <span class="payment-label">간편결제</span>
                    <div class="payment-radio my-button">
                      <label
                        v-for="(src, key) in paymentIcons"
                        :key="key"
                        class="payment-image my-button"
                        :class="{ active: selectedPayment === key }">
                        <input
                          type="radio"
                          v-model="selectedPayment"
                          :value="key"
                          name="payment"
                          class="my-button" />
                        <img
                          :src="src"
                          :alt="`${key} 아이콘`"
                          class="payment-icon my-button" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 버튼  -->
          <div class="button">
            <button
              class="my-button st_reser"
              @click="submitReservation"
              :disabled="!selectedPayment">
              결제하기
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

.payment-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.payment-info-box {
  width: 100%;
  padding: 20px;
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
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 5px;
    text-align: right;
    white-space: pre;
  }
  .tab-button {
    color: $sub-color;
    margin-left: auto;
    width: 10%;
    display: flex;
  }
}
span.value.editing {
  width: 70%;
}
.dt1 {
  height: 30px;
  width: 80%;
  margin-bottom: 5px;
}
.dt2 {
  height: 30px;
  width: 80%;
}
.ad1,
.ad2,
.ad3 {
  margin-bottom: 5px;
}
.ad2,
.ad4 {
  width: 80%;
}
.ad1,
.ad2,
.ad3,
.ad4 {
  border-radius: $radius;
  border: 1px solid $border-gray;
  padding: 5px;
  height: 30px;
}
.info-row.bags-section.bags-editing {
  display: grid !important;
  grid-template-columns:
    140px /* label 고정 폭 */
    repeat(auto-fit, minmax(100px, 1fr))
    /* 가방 input 칸 */
    auto /* 완료 버튼 칸 */;
  gap: 8px;
  align-items: center;
}
.info-row.bags-section .label {
  align-self: flex-start; /* 부모가 flex이면 이 항목만 위쪽으로 */
  /* 필요하면 약간 보정용 margin-top 추가 */
}
/* 2) 각 가방 칸은 100% 채우기 */
.bags-section.bags-editing .bag-edit-item,
.bags-section.bags-editing .summary-item {
  display: contents; /* span.label 이 아닌 bag-edit-item/content 들만 grid 칸으로 */
}

/* 3) input 만 칸에 꽉 차도록 */
.bags-section.bags-editing .bag-input {
  width: 100%;
  box-sizing: border-box;
}
.bag-input {
  border-radius: $radius;
  border: 1px solid $border-gray;
  padding: 5px;
  height: 30px;
}
.t-button {
  margin: 15px 0;
  margin-left: auto;
  color: $sub-color;
}
//구분선
.divider.extended {
  border: none;
  border-top: 1px dashed #d6d6d6;
  width: 90%;
  margin: 10px auto;
}

// 결제 수단
.payment {
  margin-bottom: 30px;
  position: relative;
  font-weight: 500;
}
.payment-wrap {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}
.payment-methods {
  display: grid;
  height: auto;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.payment-option {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid $border-gray;
  border-radius: $radius;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 15px;
  box-sizing: border-box;
  background-color: #fff;
  color: $dark-gray;

  input[type="radio"] {
    display: none;
  }

  .payment-icon {
    object-fit: contain;
    align-items: center;
  }

  &.active {
    background: color.adjust($blue-sky, $lightness: 10%);
    color: #fff;
  }

  &:hover:not(.active) {
    background: color.adjust($blue-sky, $lightness: 30%);
  }
}

.payment-icons-wrapper {
  display: flex;
  height: 40px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid $border-gray;
  border-radius: $radius;
  box-sizing: border-box;
  grid-column: span 3;
  color: $dark-gray;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-icons-inline {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
}

.payment-label {
  display: flex;
  margin-right: 15px;
  font-size: 15px;
  white-space: nowrap;
  color: $dark-gray;
  text-align: left;
}

.payment-icons-inline {
  display: flex;
  height: 40px;
  align-items: center;
  gap: 3px;
  padding: 10px;
  cursor: pointer;
  transition: 0.2s;

  input[type="radio"] {
    display: inline-block !important;
    appearance: auto;
    margin: 0;
    cursor: pointer;
  }
}
.payment-radio {
  display: flex;
  height: 40px;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
}
.payment-image {
  display: flex;
  gap: 5px;
  padding: 5px;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;

  .payment-icon {
    max-height: 25px;
    width: auto;
  }

  &.active {
    background: color.adjust($blue-sky, $lightness: 10%);
    color: #fff;
    border-radius: $radius;
  }

  &:hover:not(.active) {
    background: color.adjust($blue-sky, $lightness: 30%);
    border-radius: $radius;
  }
}
.payment-methods {
  grid-auto-rows: 40px;
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
    margin-top: 0;
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
