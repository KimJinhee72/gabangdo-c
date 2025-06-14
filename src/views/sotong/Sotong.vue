<script setup>
import { computed, ref, onMounted, onUnmounted, onBeforeUnmount } from "vue";
import ProgressStepper from "../yeyak/ProgressStepper.vue";
const showStepper = ref(true);
const stepIndex = ref(1);

//스텝퍼
const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
const offset = 100;
const selectors = ["#step1", "#step2", "#step3"];

function scrollToSection(idx) {
  stepIndex.value = idx;
  const sel = selectors[idx - 1];
  const el = document.querySelector(sel);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
// 스크롤할 때 현재 위치에 맞는 인덱스 계산
function updateActiveOnScroll() {
  const scrollY = window.scrollY + headerHeight + offset + 1;
  let current = 1;

  for (let i = 0; i < selectors.length; i++) {
    const el = document.querySelector(selectors[i]);
    if (!el) continue;
    // 섹션의 실제 문서 상단 위치
    const sectionTop = el.offsetTop;
    if (scrollY >= sectionTop) {
      current = i + 1;
    } else {
      break;
    }
  }

  // 맨 아래에 도달하면 마지막
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
    current = selectors.length;
  }

  stepIndex.value = current;
}

onMounted(() => {
  // 초기값 세팅
  updateActiveOnScroll();
  // 스크롤 리스너 등록
  window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateActiveOnScroll);
});
//페이지네이션
const noticeItemsPerPage = 10;
const noticeCurrentPage = ref(1);
const activeIndex = ref(null);

// dummy 데이터
const notices = ref([
  {
    title: "가방도 서비스오픈",
    content: "사전예약시 2,000원 할인",
    category: "서비스관련",
  },
  {
    title: "수하물 크기 제한 변경 안내",
    content:
      "2025년 4월 1일부터 수하물의 크기 제한이 변경됩니다. 기내 수하물은 최대 55cm x 40cm x 20cm로 제한되며, 체크인 수하물은 최대 23kg까지 허용됩니다. 이를 초과하는 수하물은 추가 요금이 부과될 수 있습니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 보험 서비스 추가 안내",
    content:
      "새롭게 수하물 보험 서비스가 추가되었습니다. 여행 중 분실, 파손, 지연 등 사고에 대비하여 최대 100만원까지 보상받을 수 있습니다. 보험 서비스는 결제 시 선택 가능합니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 분실 시 처리 절차 안내",
    content:
      "수하물이 분실된 경우, 고객 서비스센터에 즉시 신고해 주세요. 분실된 수하물은 최대 14일 이내에 추적되며, 분실 확인 후 보상 절차가 진행됩니다. 보상 관련 자세한 내용은 홈페이지에서 확인하실 수 있습니다.",
    category: "취소/환불",
  },
  {
    title: "수하물 규격 초과 시 추가 요금 안내",
    content:
      "수하물 규격 초과 시, 초과된 무게와 크기에 따라 추가 요금이 부과됩니다. 추가 요금은 공항에서 결제 가능하며, 사전 예약을 통해 할인된 가격으로 처리할 수 있습니다.",
    category: "결제관련",
  },
  {
    title: "수하물 픽업 서비스 안내",
    content:
      "2025년 5월부터 수하물 픽업 서비스가 도입됩니다. 공항까지 수하물을 가져가실 필요 없이, 집에서 공항까지 수하물을 안전하게 운반해 드리는 서비스입니다. 예약은 웹사이트에서 가능합니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 지연 안내 및 보상",
    content:
      "수하물이 지연된 경우, 지연된 시간에 따라 보상 정책이 적용됩니다. 3시간 이상 지연된 경우, 식사 및 숙박 비용의 일부를 보상해 드리며, 24시간 이상 지연 시 추가 보상 혜택이 제공됩니다.",
    category: "취소/환불",
  },
  {
    title: "기내 수하물 제한 품목 안내",
    content:
      "기내 수하물에 반입할 수 없는 품목에 대한 규정이 강화되었습니다. 액체, 젤, 스프레이 등 100ml 이상은 기내 반입이 금지되며, 해당 품목은 반드시 체크인 수하물로 보내셔야 합니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 안전 검사 강화 안내",
    content:
      "2025년 6월부터 수하물 안전 검사가 강화됩니다. 모든 수하물은 X-ray 검사와 추가적인 수동 검사를 거칠 수 있으며, 검사가 완료되기 전에는 출발이 지연될 수 있습니다. 협조 부탁드립니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 손상 시 보상 절차 안내",
    content:
      "수하물이 손상된 경우, 공항에서 즉시 신고해야 합니다. 손상된 수하물에 대해서는 최대 50만원까지 보상받을 수 있으며, 보상 절차는 고객 서비스 센터를 통해 진행됩니다.",
    category: "취소/환불",
  },
  {
    title: "수하물 프리미엄 서비스 출시 안내",
    content:
      "2025년 7월부터 프리미엄 수하물 서비스가 제공됩니다. 우선 처리, 전용 수하물 취급, 추가 보험 서비스 등 다양한 혜택이 포함되어 있으며, 사전 예약을 통해 저렴한 가격에 이용 가능합니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 보관 서비스 확대 안내",
    content:
      "혼잡한 공항에서의 편의를 위해 수하물 보관 서비스가 확대됩니다. 주요 국제공항 내 신규 보관소가 추가 설치되며, 1일 단위로 이용 요금이 부과됩니다. 자세한 정보는 모바일 앱에서 확인하세요.",
    category: "서비스관련",
  },
  {
    title: "가방 파손 예방 포장 서비스 제공",
    content:
      "2025년 5월부터 수하물 파손을 방지하기 위한 포장 서비스가 도입됩니다. 내구성이 뛰어난 특수 포장재로 가방을 감싸 손상 위험을 줄이며, 포장 서비스는 체크인 카운터에서 신청할 수 있습니다.",
    category: "서비스관련",
  },
  {
    title: "애완동물 수하물 운송 서비스 안내",
    content:
      "애완동물과의 여행을 위한 수하물 운송 서비스가 개선되었습니다. 전용 이동장과 적정 온도 유지 시스템을 갖춘 화물칸을 제공하며, 출발 24시간 전까지 사전 예약이 필요합니다.",
    category: "예약관련",
  },
  {
    title: "국제선 수하물 무료 허용량 변경",
    content:
      "2025년 8월부터 일부 국제선 노선의 수하물 무료 허용량이 변경됩니다. 노선별로 최대 허용 중량 및 크기가 다르므로, 항공권 예약 시 확인해 주세요. 초과 시 요금이 발생할 수 있습니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 실시간 위치 추적 기능 제공",
    content:
      "고객 편의를 위해 실시간 수하물 위치 추적 기능이 추가됩니다. 모바일 앱에서 수하물의 현재 위치와 상태를 확인할 수 있으며, 등록된 탑승권과 연동하여 자동 추적됩니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 무게 자동 측정 키오스크 도입",
    content:
      "공항 터미널에 수하물 무게를 빠르고 정확하게 측정할 수 있는 자동 키오스크가 설치되었습니다. 셀프 체크인 시 편리하게 이용하세요.",
    category: "서비스관련",
  },
  {
    title: "여름 성수기 특별 할인 이벤트",
    content:
      "2025년 7월 1일부터 8월 31일까지 여름 성수기 기간 동안 수하물 예약 시 1개당 1,000원 할인이 적용됩니다. 놓치지 말고 예약하세요!",
    category: "결제관련",
  },
  {
    title: "밤늦은 수하물 픽업 서비스 연장",
    content:
      "고객 편의를 위해 2025년 6월부터 야간 수하물 픽업 가능 시간을 기존 21시에서 23시로 연장하였습니다.",
    category: "예약관련",
  },
  {
    title: "무인 보관함 QR 코드 결제 지원",
    content:
      "수하물 보관 서비스를 더욱 간편하게! 무인 보관함 내 QR 코드를 스캔하여 Toss·KakaoPay·NaverPay 등 간편결제가 가능합니다.",
    category: "결제관련",
  },
  {
    title: "긴급 수하물 회수 서비스 안내",
    content:
      "항공편 지연·결항 시 고객의 수하물이 다른 공항으로 잘못 배송된 경우, 긴급 회수 서비스를 통해 최대 2시간 내에 찾아드립니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 알러지 프리 패키지 출시",
    content:
      "항균·무향 처리된 특별 포장재를 사용한 알러지 프리 수하물 패키지를 출시하였습니다. 예민한 체질을 위한 안전한 여행을 보장합니다.",
    category: "서비스관련",
  },
  {
    title: "프리미엄 VIP 수하물 라운지 오픈",
    content:
      "2025년 9월부터 대구공항 내 프리미엄 VIP 라운지에서 수하물을 안전하게 보관하고, 라운지 이용 혜택까지 누리실 수 있습니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 분실 보험 보장 한도 상향",
    content:
      "고객 불편을 최소화하기 위해 수하물 분실 시 보장 한도를 기존 100만원에서 200만원으로 상향 조정하였습니다.",
    category: "취소/환불",
  },
  {
    title: "수하물 픽업 당일 예약 가능",
    content:
      "이제는 당일 공항 도착 후에도 수하물 픽업 예약이 가능합니다. 도착 즉시 모바일 앱에서 예약하고 바로 이용하세요.",
    category: "예약관련",
  },
  {
    title: "친환경 포장재 무료 제공",
    content:
      "환경 보호를 위해 친환경 소재로 만든 수하물 포장재를 무료로 제공해 드립니다. 포장 시 ‘친환경 선택’ 옵션을 클릭하세요.",
    category: "서비스관련",
  },
  {
    title: "수하물 우선 처리 서비스 출시",
    content:
      "프리미엄 고객을 위한 우선 처리 서비스를 도입했습니다. 우선적으로 컨베이어 벨트에 탑재되어 빠른 수하물 수령이 가능합니다.",
    category: "서비스관련",
  },
  {
    title: "공항 내 수하물 보관료 환불 정책 안내",
    content:
      "날씨나 기타 사유로 인해 지연 발생 시, 보관료의 50%가 자동 환불됩니다. 자세한 환불 절차는 웹사이트 FAQ를 참고하세요.",
    category: "취소/환불",
  },
  {
    title: "수하물 RFID 태그 무료 제공",
    content:
      "최신 RFID 기술을 적용한 수하물 태그를 무료로 제공합니다. 태그를 스캔하여 실시간 위치를 앱에서 확인할 수 있습니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 분실 예방 캠페인 진행",
    content:
      "안전한 수하물 관리를 위해 ‘분실 예방 캠페인’을 진행합니다. 수하물에 본인 연락처 기재 시 소정의 기프트를 드립니다.",
    category: "서비스관련",
  },
  {
    title: "장거리 국제선 특별 수하물 지원",
    content:
      "장거리 국제선 승객을 위해 추가 수하물 1개당 최대 5kg을 무료 지원합니다. 예약 시 옵션에서 선택하세요.",
    category: "서비스관련",
  },
  {
    title: "공항 수하물 대기 시간 단축 안내",
    content:
      "AI 기반 수하물 분류 시스템 도입으로 평균 처리 시간이 기존 대비 30% 단축되었습니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 보안 강화 알림",
    content:
      "보안 검사가 강화되어 일부 항목 검사 시간이 늘어날 수 있습니다. 탑승 1시간 전까지 공항에 도착해 주시기 바랍니다.",
    category: "서비스관련",
  },
  {
    title: "무인 로봇 수하물 수거 서비스 시범 운영",
    content:
      "공항 내 무인 로봇이 수하물을 지정된 장소로 안전하게 운반해 드리는 시범 서비스를 시작합니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 위탁 시 친환경 포장 무료 업그레이드",
    content:
      "친환경 보조 포장 옵션을 선택하시면 추가 요금 없이 친환경 소재 포장으로 업그레이드됩니다.",
    category: "서비스관련",
  },
  {
    title: "여행 성수기 수하물 요금 할인 이벤트",
    content:
      "2025년 12월 한 달간, 성수기 수하물 추가 요금이 20% 할인됩니다. 행사 기간 내 예약분에 한합니다.",
    category: "결제관련",
  },
]);
function onSearch() {
  noticeCurrentPage.value = 1;
}
// 검색어, 선택된 카테고리, 카테고리 리스트
const searchQuery = ref("");
const selectedCategory = ref("전체");
const categories = ["전체", "서비스관련", "예약관련", "결제관련", "취소/환불"];

// 필터링 + 페이징
const filteredNotices = computed(() =>
  notices.value.filter((n) => {
    const okCat =
      selectedCategory.value === "전체" ||
      n.category === selectedCategory.value;
    const okText =
      n.title.includes(searchQuery.value) ||
      n.content.includes(searchQuery.value);
    return okCat && okText;
  })
);
const noticeTotalPages = computed(() =>
  Math.ceil(filteredNotices.value.length / noticeItemsPerPage)
);
const paginatedNotices = computed(() =>
  filteredNotices.value.slice(
    (noticeCurrentPage.value - 1) * noticeItemsPerPage,
    noticeCurrentPage.value * noticeItemsPerPage
  )
);

// 토글 함수: 파라미터 i 로 비교
function toggleNotice(idx) {
  if (activeIndex.value === idx) {
    activeIndex.value = null;
    document.body.style.overflow = "";
  } else {
    activeIndex.value = idx;
    document.body.style.overflow = "hidden";
  }
}
onBeforeUnmount(() => {
  document.body.style.overflow = "";
});

// 페이지 전환
const prevNoticePage = () => {
  if (noticeCurrentPage.value > 1) noticeCurrentPage.value--;
};
const nextNoticePage = () => {
  if (noticeCurrentPage.value < noticeTotalPages.value)
    noticeCurrentPage.value++;
};

// 카테고리 선택
function setCategory(cat) {
  selectedCategory.value = cat;
  currentPage.value = 1;
  activeIndex.value = null;
}
//이용후기
// 태그 정보
const tags = ref([{ tag: "⭐⭐⭐⭐⭐" }]);

// 상품 목록
const products = ref([
  {
    name: "김철수",
    image: "/images/cr/st_review01.jpg",
    content: "정말 친절하고 빠른 서비스였습니다.",
  },
  {
    name: "이영희",
    image: "/images/cr/st_review02.jpg",
    content: "사용법도 쉬워서 자주 이용할 것 같아요.",
  },
  {
    name: "박지훈",
    image: "/images/cr/st_review03.jpg",
    content: "기대 이상으로 만족스러웠습니다!",
  },
  {
    name: "최민수",
    image: "/images/cr/st_review04.jpg",
    content: "직원분들이 너무 친절했어요.",
  },
  {
    name: "장서연",
    image: "/images/cr/st_review05.jpg",
    content: "처음 이용해봤는데 좋네요.",
  },
  {
    name: "한가은",
    image: "/images/cr/st_review06.jpg",
    content: "배송이 정확하고 빠릅니다.",
  },
  {
    name: "정우성",
    image: "/images/cr/st_review07.jpg",
    content: "매우 만족합니다. 다음에도 또 이용할게요.",
  },
  {
    name: "손예진",
    image: "/images/cr/st_review08.jpg",
    content: "친구에게도 추천하고 싶을 정도예요.",
  },
  {
    name: "유재석",
    image: "/images/cr/st_review09.jpg",
    content: "정확하고 빠른 서비스에 감동받았습니다.",
  },
  {
    name: "강호동",
    image: "/images/cr/st_review10.jpg",
    content: "간편하게 예약할 수 있어서 좋았어요.",
  },
  {
    name: "신동엽",
    image: "/images/cr/st_review11.jpg",
    content: "전체적으로 만족스러운 경험이었습니다.",
  },
  {
    name: "이효리",
    image: "/images/cr/st_review12.jpg",
    content: "정말 편리하게 이용할 수 있었어요.",
  },
  {
    name: "홍길동",
    image: "/images/cr/st_review13.jpg",
    content: "설명도 자세하고 문의도 잘 응대해주셨어요.",
  },
  {
    name: "이수리",
    image: "/images/cr/st_review14.jpg",
    content: "처음엔 걱정했지만 결과적으로 만족!",
  },
  {
    name: "박정식",
    image: "/images/cr/st_review15.jpg",
    content: "원하는 날짜에 정확히 도착했어요.",
  },
  {
    name: "최가을",
    image: "/images/cr/st_review16.jpg",
    content: "예상보다 빠르게 처리돼서 놀랐어요.",
  },
  {
    name: "장성규",
    image: "/images/cr/st_review17.jpg",
    content: "시스템이 잘 되어 있어서 편리합니다.",
  },
  {
    name: "한동준",
    image: "/images/cr/st_review18.jpg",
    content: "예약부터 수령까지 전혀 불편함이 없었어요.",
  },
  {
    name: "정유리",
    image: "/images/cr/st_review19.jpg",
    content: "간단한 절차로 쉽게 완료할 수 있었습니다.",
  },
  {
    name: "손석구",
    image: "/images/cr/st_review20.jpg",
    content: "기대하지 않았는데 서비스 좋아요!",
  },
  {
    name: "이미정",
    image: "/images/cr/st_review21.jpg",
    content: "직관적인 UI 덕분에 쉽게 예약했습니다.",
  },
  {
    name: "강동식",
    image: "/images/cr/st_review22.jpg",
    content: "자세한 설명과 빠른 피드백이 좋았어요.",
  },
  {
    name: "신나라",
    image: "/images/cr/st_review23.jpg",
    content: "서비스가 너무 좋아서 다음에도 이용할 생각입니다.",
  },
  {
    name: "이아정",
    image: "/images/cr/st_review24.jpg",
    content: "배송이 예상보다 빨라서 기분 좋았어요.",
  },
]);

// 이름 마스킹 (ex: 홍길동 → 홍**)
const maskedName = (name) => name.charAt(0) + "*".repeat(name.length - 1);

// 페이지네이션 상태
const reviewCurrentPage = ref(1);
const reviewItemsPerPage = 8; // 한 페이지당 8개 상품 표시

// 총 페이지 수 계산
const reviewTotalPages = computed(() =>
  Math.ceil(products.value.length / reviewItemsPerPage)
);

// 현재 페이지에 맞는 상품 목록 반환
const paginatedProducts = computed(() => {
  const start = (reviewCurrentPage.value - 1) * reviewItemsPerPage;
  return products.value.slice(start, start + reviewItemsPerPage);
});

// 페이지 이동 함수
const prevReviewPage = () => {
  if (reviewCurrentPage.value > 1) reviewCurrentPage.value--;
};
const nextReviewPage = () => {
  if (reviewCurrentPage.value < reviewTotalPages.value)
    reviewCurrentPage.value++;
};
const showForm = ref(false);
const newReview = ref({
  name: "",
  content: "",
  image: "",
});
const previewImage = ref("");

// 후기 추가
const addReview = () => {
  if (!newReview.value.name || !newReview.value.content) {
    alert("이름과 후기를 작성해주세요.");
    return;
  }
  const newItem = {
    name: newReview.value.name,
    image: newReview.value.image || "/images/default-user.png",
  };
  // products 목록 앞에 추가
  products.value.unshift(newItem);
  cancelForm();
};

// 이미지 업로드 처리
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.value = reader.result;
    newReview.value.image = reader.result;
  };
  reader.readAsDataURL(file);
};

const cancelForm = () => {
  newReview.value = { name: "", content: "", image: "" };
  previewImage.value = "";
  showForm.value = false;
};

//모달
const showModal = ref(false);
const selectedReview = ref(null);

const openModal = (review) => {
  selectedReview.value = review;
  showModal.value = true;
};

const closeModal = () => {
  selectedReview.value = null;
  showModal.value = false;
};
</script>

<template>
  <div class="wrap_total">
    <div class="st_wrap">
      <!-- 스텝퍼 네비바 -->
      <ProgressStepper
        v-show="showStepper"
        :steps="['고객센터', 'FAQ', '이용후기']"
        :selectors="['#step1', '#step2', '#step3']"
        :stepIndex="stepIndex"
        @go="scrollToSection"
        class="sticky-stepper hide-controls custom-stepper" />
      <!-- 고객센터 섹션 -->
      <div class="st_customer">
        <div ref="step1" id="step1" class="step-container">
          <!-- 타이틀 -->
          <div class="st_title1">
            <div class="title_txt1">
              <h1>고객센터</h1>
            </div>
          </div>
          <div class="st_info">
            <img src="/images/cr/st_notice.png" alt="상담원" class="st_image" />
            <div class="st_details">
              <p class="st_phone">053-123-1234</p>
              <ul class="st_hours">
                <li>평일 : 09:00 – 18:00</li>
                <li>토요일 : 09:00 – 13:00</li>
                <li>일요일 : 휴무 (예약일정에 따라 변동)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 구분선 -->
      <div class="line"></div>
      <!-- 공지사항 섹션 -->
      <div class="st_notice">
        <div ref="step2" id="step2" class="step-container">
          <!-- 타이틀 -->
          <div class="st_title1">
            <div class="title_txt1">
              <h1>FAQ</h1>
            </div>
          </div>
          <!-- 검색어입력 -->
          <div class="st_search-wrapper">
            <input
              v-model="searchQuery"
              class="st_search"
              type="text"
              placeholder="검색어를 입력하세요" />
            <button class="st_search-btn my-button" @click="onSearch">
              검색
            </button>
          </div>
          <!-- 카테고리버튼 -->
          <div class="st_category-buttons">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="setCategory(cat)"
              :class="{ active: selectedCategory === cat }"
              class="st_category-btn my-button">
              {{ cat }}
            </button>
          </div>
          <!-- 공지사항 출력 -->
          <table class="st_notice-table">
            <tbody class="st_scrollable-body">
              <template v-for="(notice, idx) in paginatedNotices" :key="idx">
                <tr class="notice-row my-button" @click="toggleNotice(idx)">
                  <td>
                    <div class="notice-row_title">
                      {{ notice.title }}
                      <img
                        class="st_toggle-icon my-button"
                        :src="
                          activeIndex === idx
                            ? '/images/cr/up.png'
                            : '/images/cr/down.png'
                        "
                        alt="토글 아이콘" />
                    </div>
                  </td>
                </tr>
                <tr v-if="activeIndex === idx">
                  <td class="notice-row_content my-button">
                    <div class="notice_content">
                      {{ notice.content }}
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <!-- 페이지네이션 -->
          <div class="st_pagination my-button">
            <button
              class="my-button"
              @click="prevNoticePage"
              :disabled="noticeCurrentPage === 1">
              이전
            </button>
            <span>{{ noticeCurrentPage }} / {{ noticeTotalPages }}</span>
            <button
              class="my-button"
              @click="nextNoticePage"
              :disabled="noticeCurrentPage === noticeTotalPages">
              다음
            </button>
          </div>
        </div>
      </div>
      <!-- 구분선 -->
      <div class="line"></div>
      <!-- 이용후기 섹션 -->
      <div class="st_review">
        <div ref="step3" id="step3" class="step-container">
          <!-- 타이틀 -->
          <div class="st_title1">
            <div class="title_txt1">
              <h1>이용후기</h1>
            </div>
          </div>
          <!-- 카드이용후기 -->
          <div class="st_bottom">
            <div class="st_card-container">
              <div
                class="st_card my-button"
                v-for="product in paginatedProducts"
                :key="product.image"
                @click="openModal(product)">
                <div class="st_img-product">
                  <img :src="product.image" alt="Product" />
                </div>
                <div class="st_detail">
                  <div class="st_title">
                    <div class="st_tag">
                      <a v-for="tag in tags" :href="tag.link" :key="tag.name">
                        <span>{{ tag.tag }}</span>
                      </a>
                    </div>
                    <div class="st_text">
                      <h6>{{ maskedName(product.name) }}님의 이용후기입니다</h6>
                      <span>{{ product.content }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 리뷰작성 -->
            <div class="write-btn-wrapper">
              <!-- 글쓰기 폼 오픈 버튼 -->
              <button @click="showForm = !showForm" class="write-btn my-button">
                {{ showForm ? "취소" : "글쓰기" }}
              </button>
              <!-- 글쓰기 폼 -->
              <form v-if="showForm" class="review-form">
                <input
                  type="text"
                  v-model="newReview.name"
                  placeholder="이름" />
                <textarea
                  v-model="newReview.content"
                  placeholder="후기내용"></textarea>
                <input
                  type="file"
                  @change="handleImageUpload"
                  accept="image/*" />
                <img v-if="previewImage" :src="previewImage" width="120" />
                <!-- 후기 등록·취소버튼 -->
                <div class="form-buttons my-button">
                  <button
                    class="form-buttons2 my-button"
                    type="button"
                    @click="cancelForm">
                    취소
                  </button>
                  <button
                    class="form-buttons1 my-button"
                    type="button"
                    @click="addReview">
                    등록
                  </button>
                </div>
              </form>
            </div>
            <!-- 페이지네이션 -->
            <div class="st_pagination my-button">
              <button
                class="my-button"
                @click="prevReviewPage"
                :disabled="reviewCurrentPage === 1">
                이전
              </button>
              <span>{{ reviewCurrentPage }} / {{ reviewTotalPages }}</span>
              <button
                class="my-button"
                @click="nextReviewPage"
                :disabled="reviewCurrentPage === reviewTotalPages">
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 모달창 내용 -->
      <div class="st_modal">
        <div
          v-if="showModal"
          class="modal-overlay my-button"
          @click.self="closeModal">
          <div class="modal-content">
            <h3>✨{{ maskedName(selectedReview.name) }}님의 이용후기✨</h3>
            <img :src="selectedReview.image" alt="후기 이미지" />
            <p>{{ selectedReview.content || "내용 없음" }}</p>
            <button class="my-button" @click="closeModal">닫기</button>
          </div>
        </div>
      </div>
    </div>
    <!-- /.st_wrap -->
  </div>
  <!-- /.wrap_total -->
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

// 전체 래퍼
.st_wrap {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  font-family: $font-family;
}

// 타이틀
.st_title1 {
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
:deep(.stepper) {
  display: flex;
  flex-direction: column;
  z-index: 6500;
}

.sticky-stepper {
  position: fixed;
  top: 120px;
  left: 0;
  width: 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 6500;
  padding: 10px;
  color: #555;
  &.custom-stepper {
    // only on your custom one
    left: calc(47.5% - 600px);
    width: 120px;

    &.hide-controls {
      // hide the nav & circles only when .hide-controls is present
      ::v-deep .step-nav,
      ::v-deep .circle {
        display: none !important;
      }
    }

    // style all your labels
    ::v-deep .label {
      margin-top: 6px;
      font-size: 17px;
      cursor: pointer;
      padding: 5px 10px;
      transition: background 0.2s;

      &:hover {
        border-bottom: 2px solid rgba($sub-color, 0.3);
        color: #555;
        font-weight: bold;
      }
    }

    // active-step styles
    ::v-deep .step.active .label {
      border-bottom: 2px solid rgba($sub-color, 0.3);
      color: #555;
      font-weight: bold;
    }
  }
}
// 고객센터섹션
.st_customer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.st_info {
  display: flex;
}
.st_image {
  width: 200px;
  height: auto;
  object-fit: cover;
  margin-right: 10px;
}

.st_details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.st_phone {
  font-size: 30px;
  font-weight: bold;
  color: $dark-gray;
  margin-bottom: 20px;
}

.st_hours {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #9c9c9c;
  gap: 20px;
}

.st_hours li {
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 20px;
}

// 공지사항섹션
.st_notice {
  width: 90%;
  max-width: 100%;
  text-align: center;
}

// 검색어
.st_search-wrapper {
  width: 70%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  margin-bottom: 15px;

  .st_search {
    flex: 1;
    height: 44px;
    padding: 10px;
    font-size: 15px;
    border: 1px solid $border-gray;
    border-radius: $radius;
    background: #fff;
    box-sizing: border-box;
    color: $dark-gray;

    &:focus {
      outline: 3px solid $blue-sky;
      outline-offset: -2px;
    }
  }
  .st_search-btn {
    height: 44px;
    width: 60px;
    padding: 10px;
    background-color: color.adjust($main-color, $lightness: 30%);
    color: #fff;
    border: none;
    border-radius: $radius;
    font-size: 15px;
    cursor: pointer;

    &:hover {
      background-color: color.adjust($sub-color, $lightness: 20%) !important;
    }
  }
}
// 카테고리 버튼
.st_category-buttons {
  width: 80%;
  display: flex;
  gap: 10px;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 50px;
}

.st_category-btn {
  font-size: 15px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 40px; // 평상시 높이
  width: auto;
  padding: 10px; // 좌우 패딩
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
    background: color.adjust($sub-color, $lightness: 20%);
  }
}

//공지사항
.st_scrollable-body {
  background-color: #ffffff;
  display: block;
  max-height: auto; // 리스트 최대 높이(화면 높이의 60%)
  overflow-y: auto; // 내부에서만 스크롤
  scrollbar-gutter: stable; // 스크롤바 공간 항상 확보
}
.st_scrollable-body tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.st_notice-table {
  width: 90%;
  max-width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
  color: $dark-gray;
}

.st_notice-table td {
  border: none;
  border-top: 1px solid $border-gray;
  padding: 13px;
  box-sizing: border-box;
}

.st_notice-table tr:last-child td {
  border-bottom: 1px solid $border-gray;
}

.notice-row_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: $dark-gray;
  margin: 0 5px;
}

.notice-row_content {
  width: 100%;
  display: flex;
  text-align: left;
  background: #f0f0f0;
  color: $dark-gray;
  line-height: 1.5;
}
.st_toggle-icon {
  width: 13px;
  height: 13px;
  margin-left: 8px;
  filter: invert(60%) brightness(100%);
}

// 페이지네이션 스타일
.st_pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.st_pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border: none;
  border-radius: $radius;
  background-color: color.adjust($main-color, $lightness: 30%);
  color: #fff;
  :hover {
    background-color: color.adjust($sub-color, $lightness: 20%) !important;
  }
}
.st_pagination button:disabled {
  background: #d4d4d4;
  cursor: not-allowed;
  opacity: 0.6;
}

.st_number {
  background-color: #fff;
  color: $dark-gray;
}

// 이용후기섹션
.st_view {
  width: 70%;
  max-width: 100%;
  text-align: center;
}

// 리뷰 카드
.st_card-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  font-family: none;
  margin-bottom: 30px;
}

.st_card {
  width: 250px;
  height: 450px;
  background-color: $background-maincolor;
  border: 1px solid $border-gray;
  border-radius: $radius;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.st_card:hover {
  transform: scale(1.02);
}

.st_card .st_img-product {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}

.st_card .st_img-product img {
  height: 100%;
  width: 100%;
  padding: 10px;
  border-radius: $radius;
}

.st_detail {
  height: 20%;
  padding: 0 10px;
}
.st_title {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  flex-direction: column;
  gap: 5px;
}
.st_text {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
.st_tag span {
  font-size: 14px;
}
h6 {
  font-size: 14px;
  font-weight: bold;
}
span {
  font-size: 13px;
}
// 글쓰기 폼
input,
textarea,
img,
button {
  border-radius: $radius;
}
.form-buttons2 {
  background-color: #a80311;
}
// 페이지네이션 스타일
.st_pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.st_pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border: none;
  border-radius: $radius;
  background-color: color.adjust($main-color, $lightness: 30%);
  color: #fff;
  :hover {
    background-color: color.adjust($sub-color, $lightness: 20%) !important;
  }
}
.st_pagination button:disabled {
  background: #d4d4d4;
  cursor: not-allowed;
  opacity: 0.6;
}

/* 글쓰기 버튼 */
.write-btn-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  align-items: flex-end;
  margin-bottom: 20px;
}

.write-btn {
  width: 150px;
  height: 50px;
  padding: 12px 24px;
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
.write-btn:hover {
  background-color: color.adjust($sub-color, $lightness: 20%) !important;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 30px;
}

.review-form input,
.review-form textarea {
  padding: 10px;
  border: 1px solid $border-gray;
  border-radius: &$radius;
}
button {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 10px;
  background-color: color.adjust($main-color, $lightness: 30%);
  color: white;
  width: 70px;
  height: 44px;
  border: none;
  border-radius: $radius;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    transition: background 0.2s;
    background-color: #71d575;
  }
}
.form-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.st_modal {
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: $radius;
    width: 90%;
    max-width: 400px;
    box-shadow: $box-shadow;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;

    img {
      width: 100%;
      border-radius: $radius;
      margin: 10px 0;
    }

    button {
      width: 150px;
      height: 50px;
      padding: 12px 24px;
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
    :hover {
      background-color: color.adjust($sub-color, $lightness: 20%) !important;
    }
  }
}

.my-button {
  position: relative;
  z-index: 4000; /* fixed-buttons(1000)보다 높게 */
}
</style>
