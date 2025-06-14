<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useReservationStore } from "@/stores/reservationStore";
import CalendarPicker from "@/views/yeyak/CalendarPicker.vue";
import TimePicker from "@/views/yeyak/TimePicker.vue";
import CustomSelect from "@/views/yeyak/CustomSelect.vue";
import ProgressStepper from "@/views/yeyak/ProgressStepper.vue";

const stepperRef = ref(null);
const currentStep = ref(1);

function onNextClick() {
  // stepperRef.value가 null이 아닐 때만 호출
  if (stepperRef.value) {
  }
}
// ProgressStepper 의 @go 이벤트를 받을 핸들러
function onStepChange(newIdx) {
  currentStep.value = newIdx;
  // 필요하면 추가 로직: reservationStore 설정, 라우터 이동 등
}

//달력선택함수
const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

// 예약자 입력 필드
const name = ref("");
const telPrefix = ref("010");
const phoneRaw = ref("");

// 로그인 정보 자동 입력 체크박스
const useLoginInfo = ref(false);

// 예약 상세 정보
const selectedDate = ref("");
const selectedTime = ref("");

// 출발지 선택
const selectedStart = ref("");
const customStartInput = ref("");
const customStartAddress = ref("");
const isStartConfirmed = ref(false);
const startPlaces = ["대구공항", "동대구역", "서대구역", "숙소"];

// 도착지 선택
const selectedStop = ref("");
const customStopInput = ref("");
const customStopAddress = ref("");
const isStopConfirmed = ref(false);
const stopPlaces = ["대구공항", "동대구역", "서대구역", "숙소"];

// 여행가방 종류 및 수량
const sizes = reactive([
  {
    label: "S사이즈",
    tag: "(기내용)",
    about: "21인치 이하/55cm 이하/10kg 미만",
    price: 10000,
    count: 0,
  },
  {
    label: "M사이즈",
    tag: "(화물용)",
    about: "25인치 이하/65cm 이하/20kg 미만",
    price: 14000,
    count: 0,
  },
  {
    label: "L사이즈",
    tag: "(대형)",
    about: "26인치 이상/66cm 이상/30kg 미만",
    price: 16000,
    count: 0,
  },
]);

// 동의 체크박스 상태
const agreeAll = ref(false);
const agreePrivacy = ref(false);
const agreeTerms = ref(false);

// 동의 내용 펼침 상태
const showAllContent = ref(false);
const showPrivacyContent = ref(false);
const showTermsContent = ref(false);

// 전화번호 포맷팅
const formattedNumber = computed({
  get() {
    const digits = phoneRaw.value.replace(/\D/g, "").slice(0, 8);
    return digits.length > 4
      ? `${digits.slice(0, 4)}${digits.slice(4)}`
      : digits;
  },
  set(val) {
    phoneRaw.value = val.replace(/\D/g, "").slice(0, 8);
  },
});

// 가방 합계
const totalCount = computed(() => sizes.reduce((sum, i) => sum + i.count, 0));
const totalPrice = computed(() =>
  sizes.reduce(
    (sum, i) => (typeof i.price === "number" ? sum + i.count * i.price : sum),
    0
  )
);

// 제출 가능 여부
const canSubmit = computed(() => {
  return (
    name.value &&
    phoneRaw.value &&
    selectedDate.value &&
    selectedTime.value &&
    selectedStart.value &&
    selectedStop.value &&
    totalCount.value > 0
  );
});

// 로그인 정보 자동 입력
watch(useLoginInfo, (checked) => {
  if (checked) {
    const loginName = localStorage.getItem("userName") || "";
    const loginPhone = localStorage.getItem("userPhone") || "";
    name.value = loginName;
    if (loginPhone) {
      const parts = loginPhone.split("-");
      if (parts.length === 3) {
        telPrefix.value = parts[0];
        phoneRaw.value = parts[1] + parts[2];
      } else {
        telPrefix.value = loginPhone.slice(0, 3);
        phoneRaw.value = loginPhone.slice(3);
      }
    }
  } else {
    name.value = "";
    telPrefix.value = "010";
    phoneRaw.value = "";
  }
});

// 전체 동의 동기화
watch(agreeAll, (v) => {
  agreePrivacy.value = v;
  agreeTerms.value = v;
});
watch([agreePrivacy, agreeTerms], ([p, t]) => {
  agreeAll.value = p && t;
});

// 입력 완료 함수
function confirmCustomStart() {
  const v = customStartInput.value.trim();
  if (!v) return;
  selectedStart.value = "숙소";
  customStartAddress.value = v;
  isStartConfirmed.value = true;
}

// 입력값 변화 시 플래그 리셋
watch(customStartInput, () => {
  isStartConfirmed.value = false;
});

// 토글 함수: 열고 닫을 때 모두 초기화
function toggleStart(place) {
  // 이미 선택된 같은 버튼을 다시 누르면 닫기 & 초기화
  if (selectedStart.value === place) {
    selectedStart.value = "";
    customStartInput.value = "";
    customStartAddress.value = "";
    isStartConfirmed.value = false;
    return;
  }

  // 새로 선택된 버튼이라면
  selectedStart.value = place;
  isStartConfirmed.value = false;

  // place가 '숙소'가 아니라면 커스텀 입력 초기화
  if (place !== "숙소") {
    customStartInput.value = "";
    customStartAddress.value = "";
  }
}

// 입력 완료 함수
function confirmCustomStop() {
  const v = customStopInput.value.trim();
  if (!v) return;
  selectedStop.value = "숙소";
  customStopAddress.value = v;
  isStopConfirmed.value = true;
}

// 입력값이 바뀌면 '입력완료' 플래그 해제
watch(customStopInput, () => {
  isStopConfirmed.value = false;
});

// 토글 함수: '기타' 버튼 누르면 열고 닫을 때 초기화
function toggleStop(place) {
  // 이미 선택된 같은 버튼을 다시 누르면 닫기 & 초기화
  if (selectedStop.value === place) {
    selectedStop.value = "";
    customStopInput.value = "";
    customStopAddress.value = "";
    isStopConfirmed.value = false;
    return;
  }

  // 새로 선택된 버튼이라면
  selectedStop.value = place;
  isStopConfirmed.value = false;

  // place가 '숙소'가 아니라면 커스텀 입력 초기화
  if (place !== "숙소") {
    customStopInput.value = "";
    customStopAddress.value = "";
  }
}

// 예약 제출 처리
const reservationStore = useReservationStore();
const router = useRouter();
function submitReservation() {
  if (!canSubmit.value) {
    alert("모든 정보를 입력하세요");
    return;
  }
  if (!agreePrivacy.value || !agreeTerms.value) {
    alert("필수 약관(개인정보·이용약관)에 동의해주세요");
    return;
  }
  reservationStore.setReservation({
    name: name.value,
    telPrefix: telPrefix.value,
    phoneRaw: phoneRaw.value,
    selectedDate: selectedDate.value,
    selectedTime: selectedTime.value,
    selectedStart: selectedStart.value,
    customStartAddress: customStartAddress.value,
    selectedStop: selectedStop.value,
    customStopAddress: customStopAddress.value,
    sizes: sizes.map((i) => ({ ...i })),
  });
  router.push("/yeyak4");
}

function toggleAllContent() {
  showAllContent.value = !showAllContent.value;
}
function togglePrivacyContent() {
  showPrivacyContent.value = !showPrivacyContent.value;
}
function toggleTermsContent() {
  showTermsContent.value = !showTermsContent.value;
}

//7.당일예약/사전예약 변경처리 및 모달창
const originalPrices = [10000, 14000, 16000];
const todayPrices = [12000, 16000, 18000];
const showTodayModal = ref(false);
const showFutureModal = ref(false);
const increased = ref(false);
const reservationType = ref("");

function closeModal() {
  showTodayModal.value = false;
  showFutureModal.value = false;
}

watch(selectedDate, (val) => {
  if (!val) return;
  showTodayModal.value = false;
  showFutureModal.value = false;

  const sel = new Date(val);
  sel.setHours(0, 0, 0, 0);

  if (sel.getTime() === todayDate.getTime()) {
    // 당일
    if (!increased.value) {
      todayPrices.forEach((p, i) => (sizes[i].price = p));
      increased.value = true;
    }
    reservationType.value = "today";
    showTodayModal.value = true;
  } else if (sel > todayDate) {
    // 사전
    if (increased.value) {
      originalPrices.forEach((p, i) => (sizes[i].price = p));
      increased.value = false;
    }
    reservationType.value = "future";
    showFutureModal.value = true;
  }
});
</script>

<template>
  <!-- 전체 -->
  <div class="wrap_total">
    <!-- 이너 -->
    <div class="st_wrap">
      <!-- 타이틀 -->
      <div class="yy_title1">
        <div class="title_txt1">
          <h1>예약하기</h1>
        </div>
      </div>
      <div class="grid-container">
        <!-- 스텝퍼 네비바 -->
        <ProgressStepper
          ref="stepperRef"
          :steps="[
            '예약자정보',
            '날짜/시간',
            '출발/도착장소',
            '가방선택',
            '예약하기',
          ]"
          :selectors="['#step1', '#step2', '#step3', '#step4', '#step5']"
          @go="onStepChange" />
        <div class="form-section">
          <div ref="step1" id="step1" class="step-container">
            <div class="wrap-input">
              <div class="check">
                <!-- 제목 -->
                <p class="st_section-title">예약자 정보</p>
                <label>
                  <input type="checkbox" v-model="useLoginInfo" />
                  로그인 정보로 자동입력
                </label>
              </div>
              <!-- 이름 입력 -->
              <div class="name-input">
                <input
                  v-model="name"
                  placeholder="이름을 입력하세요."
                  @input="onNextClick()" />
              </div>
              <!-- 연락처 입력 -->
              <div class="phone-input my-button">
                <CustomSelect v-model="telPrefix" @change="onNextClick()" />
                <input
                  v-model="formattedNumber"
                  maxlength="9"
                  placeholder="전화번호를 입력하세요."
                  class="datetime-input"
                  @input="onNextClick()" />
              </div>
            </div>
          </div>
          <!-- 날짜&시간 -->
          <div class="reservation-form" ref="picker">
            <div ref="step2" id="step2" class="step-container">
              <div class="date-time">
                <!-- 날짜 -->
                <div class="date">
                  <p class="st_section-title">이용날짜</p>

                  <div class="my-button">
                    <CalendarPicker
                      class="wrapper"
                      v-model="selectedDate"
                      @update:modelValue="onNextClick()" />
                  </div>
                </div>
                <!-- 시간 -->
                <div class="time">
                  <p class="st_section-title">이용시간</p>
                  <div class="my-button">
                    <TimePicker
                      class="wrapper"
                      v-model="selectedTime"
                      :selectedDate="selectedDate"
                      @update:modelValue="onNextClick()" />
                  </div>
                </div>
              </div>
            </div>
            <!-- 당일&사전 안내문 -->
            <div v-if="reservationType === 'today'" class="date-info">
              <span class="tooltip">
                당일예약 <i class="ri-question-line"></i>
              </span>
              <p class="memo-1">당일예약은 서비스이용시간</p>
              <p class="memo-2">2시간</p>
              <p class="memo-1">이후부터 접수됩니다.</p>
            </div>
            <div v-else-if="reservationType === 'future'" class="date-info">
              <span class="tooltip">
                사전예약 <i class="ri-question-line"></i>
              </span>
              <p class="memo-1">서비스 이용 1일 전 오후 6시까지</p>
              <p class="memo-2">사전예약</p>
              <p class="memo-1">으로 접수됩니다.</p>
            </div>
          </div>
          <!-- 출발지 선택 -->
          <div ref="step3" id="step3" class="step-container">
            <div class="button-group">
              <p class="st_section-title">출발지</p>
              <div class="start-btn my-button">
                <button
                  class="my-button"
                  v-for="place in startPlaces"
                  :key="place"
                  type="button"
                  :class="{
                    active: selectedStart === place,
                  }"
                  @click="
                    toggleStart(place);
                    onNextClick();
                  ">
                  {{ place }}
                </button>
              </div>
            </div>
            <!-- 숙소명 직접 입력 -->
            <div
              v-if="selectedStart === '숙소'"
              class="custom-start-input my-button">
              <input
                type="text"
                v-model="customStartInput"
                placeholder="목적지의 주소를 입력하세요."
                @focus="isStartConfirmed = false" />
              <button
                class="custom-start my-button"
                type="button"
                @click="confirmCustomStart"
                :disabled="!customStartInput.trim()"
                :class="{ confirmed: isStartConfirmed }">
                <!-- 플래그에 따라 텍스트 변경 -->
                {{ isStartConfirmed ? "입력완료" : "입력" }}
              </button>
            </div>
            <!-- 도착지 선택 -->
            <div class="button-group">
              <p class="st_section-title">도착지</p>
              <div class="stop-btn my-button">
                <button
                  class="my-button"
                  v-for="place in stopPlaces"
                  :key="place"
                  type="button"
                  :class="{
                    active: selectedStop === place,
                  }"
                  @click="
                    toggleStop(place);
                    onNextClick();
                  ">
                  {{ place }}
                </button>
              </div>
            </div>
            <!-- 숙소명 직접 입력 -->
            <div
              v-if="selectedStop === '숙소'"
              class="custom-stop-input my-button">
              <input
                type="text"
                v-model="customStopInput"
                placeholder="목적지의 주소를 입력하세요."
                @focus="isStopConfirmed = false" />
              <button
                class="custom-stop my-button"
                type="button"
                @click="confirmCustomStop"
                :disabled="!customStopInput.trim()"
                :class="{ confirmed: isStopConfirmed }">
                <!-- 플래그에 따라 텍스트 변경 -->
                {{ isStopConfirmed ? "입력완료" : "입력" }}
              </button>
            </div>
          </div>
          <!-- 가방 종류 및 수량 선택 -->
          <div ref="step4" id="step4" class="step-container">
            <div class="bag-input">
              <p class="st_section-title">여행가방 종류 및 수량</p>
              <div class="bag-list">
                <div
                  v-for="(item, idx) in sizes"
                  :key="idx"
                  :class="['bag-item']">
                  <div class="bag-info">
                    <div class="bag-wrap">
                      <p class="st_label">{{ item.label }}</p>
                      <p class="st_tag">{{ item.tag }}</p>
                    </div>
                    <p class="st_about">{{ item.about }}</p>
                    <p class="st_pri">
                      {{
                        typeof item.price === "number"
                          ? item.price.toLocaleString() + "원"
                          : item.price
                      }}
                    </p>
                  </div>
                  <div class="bag-controls-wrap">
                    <div class="bag-controls my-button">
                      <button
                        @click="item.count > 0 && (item.count--, onNextClick())"
                        class="ctrl-btn my-button"
                        :disabled="item.count === 0">
                        -
                      </button>
                      <span>{{ item.count }}</span>
                      <button
                        @click="
                          item.count++;
                          onNextClick();
                        "
                        class="ctrl-btn my-button">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 총 개수&합계 -->
          <div class="st_summary">
            <span
              >총 <strong>{{ totalCount }}</strong
              >개</span
            >
            <span
              ><strong>{{ totalPrice.toLocaleString() }}</strong
              >원</span
            >
          </div>
          <!-- 전체동의 토글 -->
          <div class="toggle-group">
            <!-- 전체 동의 -->
            <div class="agree">
              <label class="toggle">
                <input type="checkbox" v-model="agreeAll" />
                <span class="slider"></span>전체 이용약관에 동의합니다.
              </label>
              <!-- ▶ 아이콘을 눌러 내용 열기/닫기 -->
              <button
                type="button"
                class="expand-btn my-button"
                @click.prevent="toggleAllContent">
                {{ showAllContent ? "닫기" : "보기" }}
              </button>
            </div>
            <transition name="fade">
              <div v-if="showAllContent" class="toggle-content">
                <div class="terms-box">
                  <p>
                    본 서비스는 고객님의 편의를 위해 사전예약 방식으로
                    운영됩니다.
                  </p>
                  <p>
                    예약은 최소 이용 1시간 전까지 완료해주시기 바라며, 예약 후
                    변경이나 취소가 필요한 경우 고객센터를 통해 반드시 사전에
                    연락주시기 바랍니다.
                  </p>
                  <p>
                    고객님의 부주의로 인한 시간 지연, 연락 두절, 정확하지 않은
                    정보 입력 등으로 발생하는 불이익에 대해서는 당사가 책임지지
                    않습니다.
                  </p>
                  <p>
                    서비스 이용 시 기재한 연락처로 안내 메시지 또는 확인 전화를
                    드릴 수 있으므로, 정확한 정보를 입력해주시기 바랍니다.
                  </p>
                  <p>
                    천재지변, 시스템 장애 등 불가피한 사유로 인해 서비스가
                    지연되거나 취소될 수 있으며, 이 경우 고객님께 별도 안내를
                    드립니다.
                  </p>
                  <p>
                    예약 후 무단으로 서비스를 이용하지 않으실 경우, 이후 예약
                    제한이 발생할 수 있으니 유의해주시기 바랍니다.
                  </p>
                  <p>
                    본 예약 서비스는 원활한 예약 처리 및 고객 응대를 위해 이름과
                    전화번호를 수집합니다.
                  </p>
                  <p>
                    수집된 개인정보는 예약 일정 확인, 이용자 본인 여부 확인,
                    서비스 제공을 위한 연락 등 정해진 목적 내에서만 이용되며,
                    해당 목적이 달성된 후에는 즉시 파기됩니다.
                  </p>
                  <p>
                    구체적으로는 예약이 완료되고 서비스가 제공된 후 1개월 간
                    보관되며, 이후에는 재생이 불가능한 방식으로 안전하게
                    삭제됩니다.
                  </p>
                  <p>
                    이용자는 개인정보 제공에 동의하지 않을 권리가 있으나,
                    동의하지 않을 경우 예약 서비스 이용이 제한될 수 있습니다.
                  </p>
                </div>
              </div>
            </transition>
            <!-- 구분선 -->
            <div class="line"></div>
            <!-- 개인정보 수집 동의 -->
            <div class="agree">
              <label class="toggle">
                <input type="checkbox" v-model="agreePrivacy" />
                <span class="slider"></span
                ><span class="txt">[필수]</span> 개인정보 수집에 동의합니다.
              </label>
              <!-- ▶ 아이콘을 눌러 내용 열기/닫기 -->
              <button
                type="button"
                class="expand-btn my-button"
                @click.prevent="togglePrivacyContent">
                {{ showPrivacyContent ? "닫기" : "보기" }}
              </button>
            </div>
            <transition name="fade">
              <div v-if="showPrivacyContent" class="toggle-content">
                <div class="terms-box">
                  <!-- 개인정보 수집·이용 동의 -->
                  <p>
                    본 예약 서비스는 원활한 예약 처리 및 고객 응대를 위해 이름과
                    전화번호를 수집합니다.
                  </p>
                  <p>
                    수집된 개인정보는 예약 일정 확인, 이용자 본인 여부 확인,
                    서비스 제공을 위한 연락 등 정해진 목적 내에서만 이용되며,
                    해당 목적이 달성된 후에는 즉시 파기됩니다.
                  </p>
                  <p>
                    구체적으로는 예약이 완료되고 서비스가 제공된 후 1개월 간
                    보관되며, 이후에는 재생이 불가능한 방식으로 안전하게
                    삭제됩니다.
                  </p>
                  <p>
                    이용자는 개인정보 제공에 동의하지 않을 권리가 있으나,
                    동의하지 않을 경우 예약 서비스 이용이 제한될 수 있습니다.
                  </p>
                </div>
              </div>
            </transition>

            <!-- 이용약관 동의 -->
            <div class="agree">
              <label class="toggle">
                <input type="checkbox" v-model="agreeTerms" />
                <span class="slider"></span
                ><span class="txt">[필수]</span> 이용약관에 동의합니다.
              </label>
              <!-- ▶ 아이콘을 눌러 내용 열기/닫기 -->
              <button
                type="button"
                class="expand-btn my-button"
                @click.prevent="toggleTermsContent">
                {{ showTermsContent ? "닫기" : "보기" }}
              </button>
            </div>
            <transition name="fade">
              <div v-if="showTermsContent" class="toggle-content">
                <div class="terms-box">
                  <!-- 이용약관 전문 -->
                  <p>
                    제1조 (목적) 이 약관은 [가방도]에서 제공하는 예약 서비스의
                    이용 조건 및 절차, 이용자와 회사 간의 권리·의무 및
                    책임사항을 규정함을 목적으로 합니다.
                  </p>
                  <p>
                    제2조 (서비스의 제공) 회사는 이용자에게 사전예약, 일정 확인,
                    예약 정보 제공 등의 서비스를 제공합니다.
                  </p>
                  <p>
                    제3조 (이용자의 의무) 이용자는 본 서비스를 이용함에 있어
                    다음 각 호의 행위를 해서는 안 됩니다. - 타인의 정보를
                    도용하거나 허위 정보를 입력하는 행위 - 서비스 운영을
                    방해하는 행위 - 법령 또는 공서양속에 반하는 행위
                  </p>
                  <p>
                    제4조 (개인정보 수집 및 보호) 회사는 서비스 제공을 위해
                    최소한의 개인정보를 수집하며, 수집된 정보는 관련 법령에 따라
                    안전하게 관리됩니다. 개인정보 수집 및 이용에 대한 자세한
                    사항은 개인정보처리방침을 따릅니다.
                  </p>
                  <p>
                    제5조 (면책조항) 천재지변, 통신장애 등 회사의 책임 없는
                    사유로 서비스를 제공할 수 없는 경우, 회사는 이에 대한 책임을
                    지지 않습니다.
                  </p>
                  <p>
                    제6조 (약관의 변경) 회사는 필요한 경우 약관을 변경할 수
                    있으며, 변경 시 사전에 공지합니다. 변경된 약관은 공지 시
                    명시된 시행일부터 효력이 발생합니다.
                  </p>
                  <p>
                    제7조 (준거법 및 재판관할) 본 약관은 대한민국 법률에 따라
                    해석되며, 서비스와 관련된 분쟁은 회사 본사 소재지를 관할하는
                    법원을 제1심 법원으로 합니다.
                  </p>
                </div>
              </div>
            </transition>
          </div>
          <!-- 예약하기버튼 -->
          <div ref="step5" id="step5" class="step-container">
            <div class="button">
              <button
                class="my-button st_reser"
                @click="
                  submitReservation();
                  onNextClick();
                ">
                예약하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 당일예약 모달 -->
  <div v-if="showTodayModal" class="modal-backdrop">
    <div class="modal-content">
      <p class="modal-title">당일예약으로 진행됩니다.</p>
      <div class="modal-body">
        <p>• S사이즈:<span class="modal_price"> 12,000원</span></p>
        <p>• M사이즈:<span class="modal_price"> 16,000원</span></p>
        <p>• L사이즈:<span class="modal_price"> 18,000원</span></p>
        <p>• 기타사이즈:<span class="modal_price"> 가격문의</span></p>
      </div>
      <button class="modal-button" @click="closeModal">확인</button>
    </div>
  </div>
  <!-- 사전예약 모달 -->
  <div v-if="showFutureModal" class="modal-backdrop">
    <div class="modal-content">
      <p class="modal-title">사전예약으로 진행됩니다.</p>
      <div class="modal-body">
        <p>• S사이즈:<span class="modal_price">10,000원</span></p>
        <p>• M사이즈:<span class="modal_price">14,000원</span></p>
        <p>• L사이즈:<span class="modal_price">16,000원</span></p>
        <p>• 기타사이즈:<span class="modal_price">가격문의</span></p>
      </div>
      <button class="modal-button" @click="closeModal">확인</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

// 전체 래퍼
.st_wrap {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  text-align: center;
  justify-content: flex-start;
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
// 스텝퍼
html,
body {
  overflow: visible !important;
  transform: none;
}
.sticky-stepper {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 500px;
  height: auto;
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
}

.grid-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.form-section {
  min-width: 0;
  width: 100%;
  max-width: 600px;
  border: 1px solid $border-gray;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: $radius;
  padding: 30px;
  padding-top: 0;
  height: auto;
  background-color: #fff;
}
//예약폼 타이틀
.st_section-title {
  padding: 40px 0 10px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  color: $blue-sky;
}

//체크박스
.check {
  display: flex;
  align-items: baseline;
  gap: 15px;
  label {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #7a7a7a;
    gap: 6px;
  }
  label input[type="checkbox"] {
    width: 15px;
    height: 15px;
    margin: 0;
    vertical-align: middle;
  }
}

// 입력 필드
input,
select {
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 15px;
  border: 1px solid $border-gray;
  border-radius: $radius;
  box-sizing: border-box;
  color: $dark-gray;
  &:focus {
    outline: 3px solid $blue-sky;
    outline-offset: -2px;
  }
}

//이름
.name-input {
  gap: 10px;
  display: flex;
  height: 40px;
  width: 100%;
  color: $dark-gray;
  margin-bottom: 10px;
  input {
    display: flex;
    align-items: center;
    flex: 1;
    height: 40px;
    border-radius: $radius;
    padding: 10px;
    border: 1px solid $border-gray;
    color: $dark-gray;
    .name-input input:focus {
      outline: 3px solid $blue-sky;
    }
  }
}
// 전화번호
.phone-input {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  width: 100%;
  color: $dark-gray;
  input {
    display: flex;
    align-items: center;
    flex: 1;
    height: 40px;
    border-radius: $radius;
    padding: 10px;
    border: 1px solid $border-gray;
    color: $dark-gray;
    .phone-input input:focus {
      outline: 3px solid $blue-sky;
      outline-offset: -2px;
    }
  }
}

//날짜&시간
.reservation-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .date-time {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
  }
  .date,
  .time {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
.wrapper {
  height: 40px;
  overflow: visible;
}
//당일/사전 안내문
.date-info {
  display: flex;
  align-items: flex-end;
  padding-left: 5px;

  .tooltip {
    display: flex;
    align-items: center;
    font-size: 17px;
    color: #777;
  }
  i {
    margin-right: 5px;
    margin-left: 2px;
    color: inherit;
  }
  .memo-1 {
    color: #333;
    font-size: 15px;
  }
  .memo-2 {
    margin-right: 3px;
    margin-left: 3px;
    color: rgb(214, 34, 34);
    font-size: 15px;
  }
}
// 장소 선택
.button-group {
  display: flex;
  flex-direction: column;
}
.start-btn,
.stop-btn {
  display: flex;
  gap: 10px;
  button {
    font-size: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    flex: 1;
    height: 40px;
    padding: 10px;
    border: 1px solid $border-gray;
    border-radius: $radius;
    background: #ffffff;
    color: $dark-gray;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;

    &.active {
      background-color: color.adjust($main-color, $lightness: 30%);
      color: #fff;
      border-color: color.adjust($main-color, $lightness: 30%);
    }
    &:hover:not(.active):not(:disabled) {
      background-color: color.adjust($sub-color, $lightness: 20%) !important;
    }
  }
}
//주소입력
.custom-start-input,
.custom-stop-input {
  display: flex;
  align-items: baseline;
  justify-content: center;
  border-radius: $radius;
  gap: 10px;
  color: $dark-gray;
  margin-top: 15px;
  input {
    flex: 1;
    height: 40px;
    padding: 10px;
    border: 1px solid $border-gray;
    border-radius: $radius;
    &:focus {
      outline: 3px solid $blue-sky;
      outline-offset: -2px;
    }
  }
  button {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    padding: 10px;
    background: $blue-sky;
    color: white;
    width: 70px;
    height: 40px;
    border: none;
    border-radius: $radius;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      transition: background 0.2s;
      background-color: #71d575;
    }
  }
}

.custom-start.confirmed,
.custom-stop.confirmed {
  background-color: #71d575; /* 입력완료 시 색상 */
  color: #fff;
}

// 장소 선택
.button-group {
  display: flex;
  flex-direction: column;
}
.start-btn,
.stop-btn {
  display: flex;
  gap: 10px;
  button {
    font-size: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    flex: 1;
    height: 40px;
    padding: 10px;
    border: 1px solid $border-gray;
    border-radius: $radius;
    background: #fff;
    color: $dark-gray;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;

    &.active {
      background-color: color.adjust($main-color, $lightness: 30%);
      color: #fff;
      border-color: color.adjust($main-color, $lightness: 30%);
    }

    &:hover:not(.active):not(:disabled) {
      background-color: color.adjust($sub-color, $lightness: 20%) !important;
    }
  }
}
//주소입력
.custom-start-input,
.custom-stop-input {
  display: flex;
  align-items: baseline;
  justify-content: center;
  border-radius: $radius;
  gap: 10px;
  color: $dark-gray;
  margin-top: 15px;
  input {
    flex: 1;
    height: 40px;
    padding: 10px;
    border: 1px solid $border-gray;
    border-radius: $radius;
    &:focus {
      outline: 3px solid $blue-sky;
      outline-offset: -2px;
    }
  }
  button {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    padding: 10px;
    background: $blue-sky;
    color: white;
    width: 70px;
    height: 40px;
    border: none;
    border-radius: $radius;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      transition: background 0.2s;
      background-color: #71d575;
    }
  }
}

.custom-start.confirmed,
.custom-stop.confirmed {
  background-color: #71d575; /* 입력완료 시 색상 */
  color: #fff;
}

// 리스트 컨테이너

.bag-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bag-item {
  display: grid;
  grid-template-columns: 1fr auto; // 정보 / 컨트롤+가격
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border: 1px solid $border-gray;
  border-radius: $radius;
}
.bag-controls-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
}

.bag-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  gap: 10px;

  .st_about {
    font-size: 15px;
    color: color.adjust($dark-gray, $lightness: 35%);
    margin: 3px;
  }

  .st_pri {
    font-size: 15px;
    font-weight: 600;
    color: #e63946;
    margin: 3px;
  }
}
.bag-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  .st_label {
    font-size: 18px;
    font-weight: 700;
    color: $dark-gray;
    margin: 3px;
  }
  .st_tag {
    font-size: 16px;
    color: color.adjust($dark-gray, $lightness: 20%);
  }
}

.bag-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 10px;

  .ctrl-btn {
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 50%;
    background: $blue-sky;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      transition: background 0.2s;
      background-color: #71d575;
    }
    &:disabled {
      background: #d4d4d4;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
  span {
    min-width: 24px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: $dark-gray;
  }
}
// 총 금액
.st_summary {
  display: flex;
  gap: 10px;
  color: $dark-gray;
  font-size: 25px;
  align-items: baseline;
  justify-content: space-between;
  margin: 20px;
  margin-bottom: 30px;
}

.st_summary strong {
  color: $blue-sky;
  font-size: 24px;
  font-weight: bold;
}

//토글
.toggle-group {
  margin: 20px 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}
.agree {
  display: flex;
  align-items: center; // 컨테이너 안 아이템들 세로 중앙
  justify-content: space-between; // 왼쪽/오른쪽 끝 배치
  gap: 10px;
  margin: 5px;
}
.txt {
  color: #a5a5a5;
}
.toggle {
  display: flex;
  align-items: center; // 토글 안 체크박스·텍스트 세로 중앙
  font-size: 14px;
  color: #000;
}

.toggle input[type="checkbox"] {
  width: 14px;
  height: 14px;
  margin: 0 4px 0 0; // 체크박스 오른쪽만 여백
  align-self: center; // flex 아이템 세로 중앙
  vertical-align: middle; // 인라인 정렬 보조
}

.toggle .slider {
  align-self: center; // 슬라이더도 세로 중앙
  margin-right: 6px; // 슬라이더와 텍스트 사이 간격
}

.expand-btn {
  background: none;
  border: none;
  color: #a5a5a5;
  cursor: pointer;
  font-size: 12px;
  padding: 4px 8px;
  align-self: center; // flex 아이템 세로 중앙
  margin: 0; // 버튼 기본 마진 제거
  line-height: 1; // 텍스트 높이 딱 맞추기
}
.toggle-content {
  background: #fafafa;
  margin-bottom: 16px;
  font-size: 14px;
  color: $dark-gray;
  line-height: 1.6;
}

// 부드러운 펼침 애니메이션
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 200px; /* 충분히 큰 값 */
}
//토글박스 스크롤
.terms-box {
  max-height: 30vh;
  overflow-y: auto;
  padding: 20px;
  background: #fafafa;
  border: 1px solid $border-gray;
  border-radius: $radius;
  line-height: 1.6;
  color: $dark-gray;
  font-size: 14px;
}

.terms-box p {
  margin-bottom: 1.5em;
  white-space: pre-wrap;
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
    border-radius: 20px;
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

/* 모달 스타일 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 7000;
}
.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: $radius;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
}
.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
.modal-body {
  font-size: 16px;
  color: $dark-gray;
  line-height: 1.6;
  padding-bottom: 20px;
  span.modal_price {
    color: $red-holiday;
    margin-left: 4px;
  }
}
.modal-button {
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  background-color: #279bf3;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.modal-button:hover {
  background-color: #1e82d0;
}
</style>
