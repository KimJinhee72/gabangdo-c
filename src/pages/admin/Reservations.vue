<template>
  <div class="space-y-6 text-gray-800 dark:text-gray-200 rounded">
    <!-- 페이지 헤더 -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          예약관리
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          예약 정보를 관리하고 상태를 확인할 수 있습니다.
        </p>
      </div>
      <!--새 운반 예약 추가  -->
      <button
        @click="showAddCustomerModal"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
        <i class="fas fa-plus mr-2"></i>예약추가
      </button>
    </div>

    <!-- 통계 카드 -->
    <div class="grid grid-rows-1 md:w-full grid-cols-3 gap-6">
      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div class="flex items-center">
          <div class="icon-box p-3 rounded-full bg-blue-100 text-blue-600">
            <i class="suitcase fas fa-suitcase text-2xl"></i>
          </div>
          <div class="ml-0 min-[900px]:ml-4">
            <h3
              class="block max-[510px]:hidden text-sm font-medium text-ray-500 dark:text-white">
              전체예약<span class="text-xs text-gray-500 dark:text-white">
                / 예약변화</span
              >
            </h3>
            <h3
              class="hidden max-[510px]:block text-sm font-medium text-gray-500 dark:text-white">
              예약<span class="text-xs text-gray-500 dark:text-white">
                / 변화</span
              >
            </h3>
            <p
              class="text-2xl max-[510px]:text-lg leading-9 font-semibold text-gray-800 dark:text-white">
              120
              <span
                class="text-lg max-[510px]:text-sm font-semibold text-gray-800 dark:text-white"
                >/ +15
              </span>
            </p>
            <span class="span text-sm text-green-600 dark:text-green-300"
              >+12%</span
            >
          </div>
        </div>
      </div>
      <!-- 기사카드 -->
      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div class="flex items-center">
          <div
            class="icon-box p-3 rounded-full bg-green-100 text-green-600 dark:text-green-300">
            <i class="user fas fa-check-circle text-2xl"></i>
          </div>
          <div class="ml-0 min-[900px]:ml-4">
            <h3
              class="block max-[510px]:hidden text-sm font-medium text-gray-500 dark:text-white">
              운반완료
              <span class="text-xs text-gray-500 dark:text-white"
                >/ 전체예약</span
              >
            </h3>
            <h3
              class="hidden max-[510px]:block text-sm font-medium text-gray-500 dark:text-white">
              완료<span class="text-xs text-gray-500 dark:text-white">
                / 예약</span
              >
            </h3>
            <p
              class="text-2xl max-[510px]:text-lg font-semibold text-gray-800 dark:text-white">
              18<span
                class="text-lg max-[510px]:text-sm font-semibold text-gray-800 dark:text-white">
                / 120</span
              >
            </p>
            <span class="span text-sm text-green-600 dark:text-green-300"
              >+15%</span
            >
          </div>
        </div>
      </div>
      <!-- 대기중상태카드 -->
      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div class="flex items-center">
          <div class="icon-box p-3 rounded-full bg-gray-300 text-yellow-600">
            <i class="star fas fa-clock text-2xl"></i>
          </div>
          <div class="ml-0 min-[900px]:ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-white">
              예약대기중
            </h3>
            <p
              class="text-2xl max-[510px]:text-lg font-semibold text-gray-800 dark:text-white">
              6건
            </p>
            <span class="text-sm text-green-600 dark:text-green-300">+2건</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 검색 및 필터 -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              @input="handleInput"
              placeholder="고객명 또는 예약번호로 검색"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">전체 상태</option>
            <option value="waiting">대기중</option>
            <option value="in_progress">운반중</option>
            <option value="completed">완료</option>
            <option value="cancelled">취소</option>
          </select>
          <select
            v-model="sortBy"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="date-desc">날짜순 (최신순)</option>
            <option value="date-asc">날짜순 (오래된순)</option>
            <option value="name-asc">이름순</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 예약 목록 -->
    <!-- 예약 현황 -->
    <ReservationList :reservations="filteredReservations" />
    <!-- 예약추가/수정 모달 -->
    <div
      v-if="showCustomerForm"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editingCustomer ? "예약 수정" : "예약 추가" }}
            </h3>
            <button
              @click="closeCustomerForm"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <form @submit.prevent="saveCustomer" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              v-model="customerForm.name"
              required
              class="mt-1 py-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <!-- 연락처 -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >연락처</label
            >
            <input
              type="tel"
              v-model="customerForm.phone"
              required
              class="mt-1 py-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <!-- 날짜,시간 -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >예약일시</label
            >
            <input
              type="datetime"
              v-model="selectedDate"
              :format="'yyyy-MM-dd HH:mm'"
              placeholder="예약일시를 선택하세요"
              input-class="your-input-class"
              class="mt-1 py-0.5 pl-4 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <!-- 픽업/도착 위치 -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >픽업위치</label
            >
            <select
              v-model="selectedReservation.location"
              class="w-full border border-gray-100 rounded-md px-3 py-0.5 text-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">대구공항</option>
              <option value="동대구역">동대구역</option>
              <option value="서대구역">서대구역</option>
            </select>
          </div>
          <!-- 가방수 -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >가방수</label
            >
            <input
              type="text"
              v-model="customerForm.bagCount"
              class="mt-1 py-0.5 pl-4 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </form>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="openResevDeleteModal(customer)"
            class="aaa px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            예약취소
          </button>
          <button
            @click="saveReservation"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:text-white hover:bg-indigo-600 text-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            저장
          </button>
        </div>
      </div>
    </div>

    <!-- 삭제 확인 모달 -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">고객 삭제</h3>
            <button
              @click="closeDeleteModal"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-900">
            정말로 {{ customerToDelete?.name }} 고객을 삭제하시겠습니까?
          </p>
          <p class="text-sm text-gray-500 mt-1">
            삭제된 고객 정보는 복구할 수 없습니다.
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            취소
          </button>
          <button
            @click="deleteCustomer"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, reactive } from "vue";
import { useAppStore } from '@/stores/useAppStore'
import { storeToRefs } from 'pinia'
import ReservationList from "./components/ReservationList.vue";

const store = useAppStore()
const { reservations } = storeToRefs(store)

const searchQuery = ref("");
const statusFilter = ref("all");
const status = ref("all");
const sortBy = ref("date-desc");
const showCancelModal = ref(false);
const reservationToCancel = ref(null);
const editingCustomer = ref(null);
const showCustomerForm = ref(false);
const selectedDate = ref(null);
const showDeleteModal = ref(false); // 모달 표시 여부

const selectedReservation = ref({
  location: "",
});

const props = defineProps({
  workerInfo: {
    type: Object,
    default: () => ({}),
  },
});

//
const customerForm = reactive({
  name: "",
  email: "",
  phone: "",
  bagCount: "",
});
const showAddCustomerModal = () => {
  editingCustomer.value = null;
  Object.assign(customerForm, {
    name: "",
    email: "",
    phone: "",
    status: "active",
  });
  showCustomerForm.value = true;
};

const editCustomer = (customer) => {
  editingCustomer.value = customer;
  Object.assign(customerForm, { ...customer });
  showCustomerForm.value = true;
};

const closeCustomerForm = () => {
  showCustomerForm.value = false;
  editingCustomer.value = null;
};

const saveCustomer = () => {
  if (editingCustomer.value) {
    // 고객 수정
    const index = customers.value.findIndex(
      (c) => c.id === editingCustomer.value.id
    );
    if (index !== -1) {
      customers.value[index] = {
        ...customerForm,
        id: editingCustomer.value.id,
      };
    }
  } else {
    // 새 고객 추가
    const newCustomer = {
      ...customerForm,
      id: customers.value.length + 1,
      reservationCount: 0,
      avatar: "https://via.placeholder.com/50",
    };
    customers.value.push(newCustomer);
  }
  closeCustomerForm();
};

const openResevDeleteModal = (customer) => {
  customerToDelete.value = customer;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  customerToDelete.value = null;
};

const deleteCustomer = () => {
  if (customerToDelete.value) {
    customers.value = customers.value.filter(
      (c) => c.id !== customerToDelete.value.id
    );
    console.log(`${customerToDelete.value.name} 삭제됨`)
    closeDeleteModal();
  }
};

const showCustomerDetails = (customer) => {
  selectedCustomer.value = customer;
  showCustomerDetailsModal.value = true;
};

const closeCustomerDetailsModal = () => {
  showCustomerDetailsModal.value = false;
  selectedCustomer.value = null;
};

// 기사 검색 관련 상태
const showTechnicianSearchModal = ref(false);
const technicianSearchFilters = ref({
  type: "all",
  settlementRate: "all",
  area: "all",
  keyword: "",
});

// 기사 목록 (실제로는 API에서 가져와야 함)
const technicians = ref([
  {
    id: 1,
    name: "김기사",
    type: "executive",
    phone: "010-1111-2222",
    phone1: "1111-2222",
    settlementRate: 80,
    area: "seoul",
  },
  {
    id: 2,
    name: "이기사",
    type: "employee",
    phone: "010-3333-4444",
    phone1: "3333-4444",
    settlementRate: 75,
    area: "gyeonggi",
  },
  {
    id: 3,
    name: "박기사",
    type: "executive",
    phone: "010-5555-6666",
    phone1: "5555-6666",
    settlementRate: 85,
    area: "incheon",
  },
  {
    id: 4,
    name: "최기사",
    type: "employee",
    phone: "010-7777-8888",
    phone1: "7777-8888",
    settlementRate: 70,
    area: "busan",
  },
  {
    id: 5,
    name: "정기사",
    type: "executive",
    phone: "010-9999-0000",
    phone1: "9999-0000",
    settlementRate: 90,
    area: "seoul",
  },
  {
    id: 6,
    name: "강기사",
    type: "employee",
    phone: "010-2222-3333",
    phone1: "2222-3333",
    settlementRate: 75,
    area: "gyeonggi",
  },
  {
    id: 7,
    name: "조기사",
    type: "executive",
    phone: "010-4444-5555",
    phone1: "4444-5555",
    settlementRate: 80,
    area: "incheon",
  },
  {
    id: 8,
    name: "윤기사",
    type: "employee",
    phone: "010-6666-7777",
    phone1: "6666-7777",
    settlementRate: 85,
    area: "busan",
  },
  {
    id: 9,
    name: "장기사",
    type: "executive",
    phone: "010-8888-9999",
    phone1: "8888-9999",
    settlementRate: 70,
    area: "seoul",
  },
  {
    id: 10,
    name: "임기사",
    type: "employee",
    phone: "010-0000-1111",
    phone1: "0000-1111",
    settlementRate: 90,
    area: "gyeonggi",
  },
]);


// 기사 페이지네이션 관련 상태
const currentTechnicianPage = ref(1);
const techniciansPerPage = ref(5);
const technicianSearch = ref("");

// 필터링된 기사 목록
const filteredTechnicians = computed(() => {
  return technicians.value.filter((tech) => {
    const matchesType =
      technicianSearchFilters.value.type === "all" ||
      tech.type === technicianSearchFilters.value.type;
    const matchesRate =
      technicianSearchFilters.value.settlementRate === "all" ||
      tech.settlementRate.toString() ===
        technicianSearchFilters.value.settlementRate;
    const matchesArea =
      technicianSearchFilters.value.area === "all" ||
      tech.area === technicianSearchFilters.value.area;
    const matchesKeyword =
      !technicianSearchFilters.value.keyword ||
      tech.name.includes(technicianSearchFilters.value.keyword) ||
      tech.phone.includes(technicianSearchFilters.value.keyword);

    return matchesType && matchesRate && matchesArea && matchesKeyword;
  });
});

// 페이지네이션 계산
const totalTechnicianPages = computed(() => {
  return Math.ceil(filteredTechnicians.value.length / techniciansPerPage.value);
});

const paginatedTechnicians = computed(() => {
  const start = (currentTechnicianPage.value - 1) * techniciansPerPage.value;
  const end = start + techniciansPerPage.value;
  return filteredTechnicians.value.slice(start, end);
});

// 페이지 이동 함수
const goToTechnicianPage = (page) => {
  if (page >= 1 && page <= totalTechnicianPages.value) {
    currentTechnicianPage.value = page;
  }
};

const nextTechnicianPage = () => {
  if (currentTechnicianPage.value < totalTechnicianPages.value) {
    currentTechnicianPage.value++;
  }
};

const prevTechnicianPage = () => {
  if (currentTechnicianPage.value > 1) {
    currentTechnicianPage.value--;
  }
};

// 기사 유형 텍스트 변환
const getTechnicianTypeText = (type) => {
  const typeMap = {
    executive: "임원",
    employee: "사원",
  };
  return typeMap[type] || type;
};

// 지역 텍스트 변환
const getAreaText = (area) => {
  const areaMap = {
    seoul: "서울",
    gyeonggi: "경기",
    incheon: "인천",
    busan: "부산",
  };
  return areaMap[area] || area;
};

// 기사 검색 모달 열기/닫기
const openTechnicianSearchModal = () => {
  showTechnicianSearchModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeTechnicianSearchModal = () => {
  showTechnicianSearchModal.value = false;
  document.body.style.overflow = "";
};

// 기사 선택
const selectTechnician = (technician) => {
  selectedReservation.value.technician = technician;
  technicianSearch.value = technician.name;
  closeTechnicianSearchModal();
};

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!selectedReservation.value.photos) {
        selectedReservation.value.photos = [];
      }
      selectedReservation.value.photos.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removePhoto = (index) => {
  selectedReservation.value.photos.splice(index, 1);
};

const saveReservation = () => {
  // 필수 항목 검증
  const requiredFields = [
    "status",
    "cafeName",
    "businessNumber",
    "user",
    "phone",
    "modelName",
    "estimatedPrice",
    "createdAt",
    "preferredDateTime",
    "technician",
  ];

  const missingFields = requiredFields.filter(
    (field) => !selectedReservation.value[field]
  );

  if (missingFields.length > 0) {
    alert("필수 항목을 모두 입력해주세요.");
    return;
  }

  // 저장 로직 구현
  console.log("저장된 예약 정보:", selectedReservation.value);
  closeModal();
};

// 페이지네이션 관련 상태
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = ref(25);

// 페이지네이션 계산
const totalPages = computed(() => {
  return Math.ceil(filteredReservations.value.length / itemsPerPage.value);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const pagedReservations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return reservations.value.slice(start, end);
});

const filteredReservations = computed(() => {
  let result = [...reservations.value];

  // 검색어 필터
    if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      r =>
        r.user.toLowerCase().includes(q) ||
        r.id.toString().includes(q)
    )
  }

  // 상태 필터
  if (statusFilter.value !== "all") {
    result = result.filter((r) => r.status === statusFilter.value);
  }

  // 정렬
  switch (sortBy.value) {
    case "date-asc":
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "date-desc":
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "name-asc":
      result.sort((a, b) => a.user.localeCompare(b.user));
      break;
  }

  return result;
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

const getStatusText = (status) => {
  const statusMap = {
    waiting: "대기중",
    assigned: "기사배정",
    in_progress: "운반중",
    completed: "완료",
    cancelled: "취소",
  };
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const statusClasses = {
    대기중: "bg-yellow-100 text-yellow-800",
    운반중: "bg-blue-100 text-blue-800",
    완료: "bg-green-100 text-green-800",
    취소: "bg-red-100 text-red-800",
    기사배정: "bg-purple-100 text-purple-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

const showReservationDetails = (reservation) => {
  // 기존 예약 데이터를 복사하여 새로운 객체 생성
  selectedReservation.value = {
    ...reservation,
    // 기본값 설정
    cafeName: reservation.cafeName || "",
    businessNumber: reservation.businessNumber || "",
    modelName: reservation.modelName || "",
    estimatedPrice: reservation.estimatedPrice || "",
    createdAt: reservation.createdAt || new Date().toISOString().slice(0, 16),
    preferredDateTime:
      reservation.preferredDateTime || new Date().toISOString().slice(0, 16),
    photos: reservation.photos || [],
    requirements: reservation.requirements || "",
    memo: reservation.memo || "",
    technician: reservation.technician || null,
  };

  // 모달이 즉시 표시되도록 함
  nextTick(() => {
    document.body.style.overflow = "hidden";
  });
};

const closeModal = () => {
  selectedReservation.value = null;
  document.body.style.overflow = "";
};

const confirmCancel = (reservation) => {
  reservationToCancel.value = reservation;
  showCancelModal.value = true;
};

const closeCancelModal = () => {
  showCancelModal.value = false;
  reservationToCancel.value = null;
};

const cancelReservation = () => {
  if (reservationToCancel.value) {
    const index = reservations.value.findIndex(
      (r) => r.id === reservationToCancel.value.id
    );
    if (index !== -1) {
      reservations.value[index].status = "cancelled";
    }
  }
  closeCancelModal();
};

// 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value;
}
</script>
<style scoped>
.rounded-full {
  width: 54px;
}
.icon-box i {
  font-size: 1.5rem; /* text-xl 정도 */
  padding-left: 0;
  margin-left: 3px;
  color: rgb(53, 184, 24);
  align-items: center;
}
.icon-box .suitcase {
  margin-left: 4px;
}
.icon-box .user {
  color: blue;
}
.icon-box .star {
  color: yellow;
  margin-left: 4px;
}
/* /20 span */
.man {
  font-size: 15px;
}
@media screen and (max-width: 1260px) {
}
@media screen and (max-width: 1010px) {
  .icon-box {
    all: unset;
    display: flex;
    padding: 0;
    background: none;
    color: inherit;
  }

  .icon-box i {
    font-size: 1.5rem; /* text-xl 정도 */
    padding-left: 0;
    color: rgb(53, 184, 24);
  }
  .icon-box .user {
    color: blue;
  }
  .icon-box .star {
    color: yellow;
  }
  .transition-shadow {
    padding: 15px;
  }
}
@media screen and (max-width: 900px) {
  .flex {
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .text-2xl p {
    text-align: center;
  }
  .span {
    margin-right: 5px;
  }
  .icon-box {
    display: none;
  }
  .man {
    padding: 0 !important;
  }
}
@media screen and (max-width: 768px) {
  .flex {
    width: 90%;
    display: flex;
    justify-content: center !important;
  }
  .transition-shadow {
    padding: 20px;
  }
}

@media screen and (max-width: 570px) {
  .flex {
    width: 100%;
    align-items: center;
    text-align: center;
  }
  .icon-box {
    display: none;
  }
  .man {
    padding: 0 !important;
  }
}
@media screen and (max-width: 430px) {
  .transition-shadow {
    padding: 10px;
  }
}
</style>
