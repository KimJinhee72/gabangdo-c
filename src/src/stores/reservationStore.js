// stores/reservationStore.js
import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

export const useReservationStore = defineStore("reservationStore", () => {
  // ▶︎ 전화번호 로직 추가
  const telPrefix = ref("010"); // select 바인딩
  const phoneRaw = ref(""); // 숫자만 저장(최대 8자리)

  // 입력창에는 “1234-5678” 만 보여주도록
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

  // 요약에서는 “010-1234-5678” 전체 폰번호 출력
  const fullPhone = computed(() => {
    if (!phoneRaw.value) return "";
    return `${telPrefix.value}${formattedNumber.value}`;
  });

  // ▶︎ 기존 예약 정보
  const name = ref("");
  const selectedDate = ref("");
  const selectedTime = ref("");
  const startPlaces = ref(["대구공항", "동대구역", "서대구역", "숙소"]);
  const stopPlaces = ref(["대구공항", "동대구역", "서대구역", "숙소"]);
  const selectedStart = ref("");
  const customStartAddress = ref("");
  const selectedStop = ref("");
  const customStopAddress = ref("");
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
  const totalCount = computed(() =>
    sizes.reduce((sum, item) => sum + (item.count || 0), 0)
  );
  const originalPrices = [10000, 14000, 16000];
  const todayPrices = [12000, 14000, 18000];
  const increased = ref(false);

  const totalPrice = computed(() =>
    sizes.reduce(
      (sum, i) => (typeof i.price === "number" ? sum + i.count * i.price : sum),
      0
    )
  );

  function handleTodaySelected() {
    if (!increased.value) {
      sizes.forEach((item, idx) => {
        item.price = todayPrices[idx];
      });
      increased.value = true;
    }
  }

  function resetPrices() {
    if (increased.value) {
      sizes.forEach((item, idx) => {
        item.price = originalPrices[idx];
      });
      increased.value = false;
    }
  }

  const paymentMethod = ref("");

  function confirmCustomStart(input) {
    if (input?.trim()) {
      selectedStart.value = "숙소";
      customStartAddress.value = input.trim();
    }
  }
  function confirmCustomStop(input) {
    if (input?.trim()) {
      selectedStop.value = "숙소";
      customStopAddress.value = input.trim();
    }
  }

  function setReservation(data) {
    name.value = data.name;
    // data.phone 이 "010-1234-5678" 형태라고 가정하고 분해
    if (data.phone) {
      const [prefix, rest] = data.phone.split("", 2);
      telPrefix.value = prefix; // "010"
      phoneRaw.value = rest.replace(/\D/g, ""); // "12345678"
    } else {
      // 혹은 호출 시 telPrefix, phoneRaw 까지 직접 넘겨주려면
      telPrefix.value = data.telPrefix;
      phoneRaw.value = data.phoneRaw;
    }
    selectedDate.value = data.selectedDate;
    selectedTime.value = data.selectedTime;
    selectedStart.value = data.selectedStart;
    customStartAddress.value = data.customStartAddress;
    selectedStop.value = data.selectedStop;
    customStopAddress.value = data.customStopAddress;
    sizes.splice(0, sizes.length, ...data.sizes);
    paymentMethod.value = data.paymentMethod;
  }
  return {
    // 전화번호
    telPrefix,
    phoneRaw,
    formattedNumber,
    fullPhone,

    // 기존 상태 & 로직
    name,
    selectedDate,
    selectedTime,
    startPlaces,
    stopPlaces,
    selectedStart,
    customStartAddress,
    selectedStop,
    customStopAddress,
    confirmCustomStart,
    confirmCustomStop,
    totalCount,
    paymentMethod,
    setReservation,
    sizes,
    totalPrice,
    increased,
    handleTodaySelected,
    resetPrices,
  };
});
