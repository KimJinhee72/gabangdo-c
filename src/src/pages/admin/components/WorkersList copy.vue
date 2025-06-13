<template>
  <!-- 기사 목록 -->
  <div class="bg-white rounded-lg shadow dark:bg-gray-600">
    <div class="p-4 pb-0 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
        기사 목록
      </h2>
    </div>

    <!-- 검색 select바 -->
      <div
        class="p-4 font-light text-sm text-gray-500 border-b dark:text-black border-gray-200 dark:bg-gray-600 flex flex-col md:flex-row gap-4">
        <div class="flex flex-col md:flex-row justify-start gap-2">
          <!-- 날짜 범위 선택 -->
          <DateRangePicker
          v-model:startDate="item.startDate"
          v-model:endDate="item.endDate" />
          <!-- 날짜 선택 인풋 -->
          <SearchDateSelect
          v-model="item.rangeType"
          v-model:startDate="item.startDate"
          v-model:endDate="item.endDate" />
          <!-- 오늘/주/한달 선택  -->
          <SearchSelect v-model="date" :options="dateOptions" class="max-[1010px]:hidden" />
          <SearchSelect v-model="pickup" :options="pickupOptions" />
          <SearchSelect v-model="area" :options="areaOptions" />
          <SearchSelect v-model="status" :options="statusOptions" />
          <button
            class="px-4 py-1 bg-indigo-600 dark:bg-indigo-300 text-white dark:text-black rounded-md hover:bg-indigo-700">
            검색
          </button>
        </div>
      </div>
    <!-- 기사 data -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr class="allpadding">
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              기사ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              이름
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              연락처
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              평점
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              현재상태
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              예약
            </th>
            <th
              class="w-[90px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              액션
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="worker in paginatedWorkers"
            :key="worker.id"
            class="hover:bg-gray-50 allpadding"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ worker.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ worker.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ windowWidth <= 830 ? worker.phone1 : worker.phone }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex items-center">
                <span class="text-yellow-400 mr-1">
                  <i class="max-[960px]:hidden fas fa-star"></i>
                </span>
                {{ worker.rating }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="getStatusClass(worker.status)"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-xl"
              >
                {{ worker.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ worker.reservations }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="relative group inline-block mr-3">
                <button
                  @click="showWorkerDetails(worker)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  <i class="fas fa-eye mr-1"></i>
                  <span class="max-[960px]:hidden">상세</span>
                </button>
                <div
                  class="hidden max-[960px]:group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 rounded bg-black/70 text-white text-xs z-10"
                >
                  상세보기
                </div>
              </div>
              <div class="relative group inline-block mr-3">
                <button class="text-yellow-600 hover:text-yellow-900">
                  <i class="fas fa-edit mr-1"></i>
                  <span class="max-[960px]:hidden">수정</span>
                </button>
                <div
                  class="hidden max-[960px]:group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 rounded bg-black/70 text-white text-xs z-10"
                >
                  수정클릭
                </div>
              </div>
              <div @click="activeStatus(worker)" class="relative group inline-block">
                <button
                  :class="[
                    'px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-xl',
                    worker.status === '대기중'
                      ? 'text-green-600 hover:text-green-600'
                      : 'text-red-600 hover:text-red-900',
                  ]"
                >
                  <i class="fas fa-ban mr-1"></i>
                  <span class="max-[960px]:hidden actionSpan ">{{
                    worker.status === '대기중' ? '활동중' : '대기중'
                  }}</span>
                </button>
                <div
                  class="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 rounded bg-black/80 text-white text-xs z-10"
                >
                  <span
                    :class="[
                      worker.status === '대기중'
                        ? 'text-red-600 hover:text-red-900'
                        : 'text-green-600 hover:text-green-600',
                    ]"
                  >
                    {{ worker.status === '대기중' ? '활동중지' : '활동클릭' }}
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 -->
      <div
        class=" w-full flex justify-between items-center bg-white rounded-lg shadow p-4 px-6 dark:bg-gray-600"
      >
        <div
          class=" pageNum w-full flex justify-between items-center max-[768px]:flex-1 max-[768px]:flex max-[768px]:items-center max-[768px]:justify-between"
        >
          <div class="block w-full">
            <p class="text-sm text-gray-700 dark:text-white">
              총 <span class="font-medium">{{ filteredWorkers.length }}</span>명 중
              <span class="font-medium">{{
                (currentPage - 1) * itemsPerPage + 1
              }}</span
              >-
              <span class="font-medium">{{
                Math.min(currentPage * itemsPerPage, filteredWorkers.length)
              }}</span
              >개 표시
            </p>
          </div>
        </div>
        <div class="pageNum w-full flex gap-2 dark:text-white">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-1 border rounded"
            :class="[
              currentPage === page
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300  text-gray-500 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-700',
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchDateSelect from "./SearchDateSelect.vue";
import SearchSelect from "./SearchSelect.vue";
import { ref, computed, onMounted } from "vue";


// 기사
const workers = ref([
  {
    id: "#C001",
    name: "김지훈",
    phone: "010-1234-5678",
    phone1: "1234-5678",
    rating: 4.8,
    status: "활동중",
    reservations: "11건",
    memo: "",
    joinDate: "2024-01-15",
    lastActivity: "2025-05-15",
    area: "동, 군위",
    areaGroup: "gu1",
  },
  {
    id: "#C002",
    name: "이수민",
    phone: "010-8765-4321",
    phone1: "8765-4321",
    rating: 4.5,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-01-20",
    lastActivity: "2025-05-14",
    area: "서, 중, 북",
    areaGroup: "gu2",
  },
  {
    id: "#C003",
    name: "박서준",
    phone: "010-5555-6666",
    phone1: "5555-6666",
    rating: 4.2,
    status: "대기중",
    reservations: "0건",
    memo: "",
    joinDate: "2024-01-25",
    lastActivity: "2025-04-20",
    area: "중, 수성",
    areaGroup: "gu3",
  },
  {
    id: "#C004",
    name: "한예슬",
    phone: "010-7777-8888",
    phone1: "7777-8888",
    rating: 4.9,
    status: "활동중",
    reservations: "11건",
    memo: "",
    joinDate: "2024-02-01",
    lastActivity: "2025-05-18",
    area: "달서, 달성",
    areaGroup: "gu4",
  },
  {
    id: "#C005",
    name: "정우성",
    phone: "010-9999-0000",
    phone1: "9999-0000",
    rating: 4.6,
    status: "활동중",
    reservations: "9건",
    memo: "",
    joinDate: "2024-02-05",
    lastActivity: "2025-05-10",
    area: "동, 군위",
    areaGroup: "gu1",
  },
  {
    id: "#C006",
    name: "김태희",
    phone: "010-1111-2222",
    phone1: "1111-2222",
    rating: 4.7,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-02-10",
    lastActivity: "2025-05-09",
    area: "서, 중, 북",
    areaGroup: "gu2",
  },
  {
    id: "#C007",
    name: "이준호",
    phone: "010-3333-4444",
    phone1: "3333-4444",
    rating: 4.4,
    status: "활동중",
    reservations: "9건",
    memo: "",
    joinDate: "2024-02-15",
    lastActivity: "2025-05-08",
    area: "중, 수성",
    areaGroup: "gu3",
  },
  {
    id: "#C008",
    name: "유인나",
    phone: "010-5555-7777",
    phone1: "5555-7777",
    rating: 4.8,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-02-20",
    lastActivity: "2025-05-07",
    area: "달서, 달성",
    areaGroup: "gu4",
  },
  {
    id: "#C009",
    name: "이병헌",
    phone: "010-7777-9999",
    phone1: "7777-9999",
    rating: 4.3,
    status: "대기중",
    reservations: "0건",
    memo: "",
    joinDate: "2024-02-25",
    lastActivity: "2025-04-15",
    area: "동, 군위",
    areaGroup: "gu1",
  },
  {
    id: "#C010",
    name: "한가인",
    phone: "010-9999-1111",
    phone1: "9999-1111",
    rating: 4.9,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-03-01",
    lastActivity: "2025-05-06",
    area: "서, 중, 북",
    areaGroup: "gu2",
  },
  {
    id: "#C011",
    name: "정해인",
    phone: "010-2222-3333",
    phone1: "2222-3333",
    rating: 4.5,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-03-05",
    lastActivity: "2025-05-05",
    area: "중, 수성",
    areaGroup: "gu3",
  },
  {
    id: "#C012",
    name: "고아라",
    phone: "010-4444-5555",
    phone1: "4444-5555",
    rating: 4.7,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-03-10",
    lastActivity: "2025-05-04",
    area: "달서, 달성",
    areaGroup: "gu4",
  },
  {
    id: "#C013",
    name: "남주혁",
    phone: "010-6666-7777",
    phone1: "6666-7777",
    rating: 4.2,
    status: "대기중",
    reservations: "0건",
    memo: "",
    joinDate: "2024-03-15",
    lastActivity: "2025-04-18",
    area: "동, 군위",
    areaGroup: "gu1",
  },
  {
    id: "#C014",
    name: "전지현",
    phone: "010-8888-9999",
    phone1: "8888-9999",
    rating: 4.8,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-03-20",
    lastActivity: "2025-05-03",
    area: "서, 중, 북",
    areaGroup: "gu2",
  },
  {
    id: "#C015",
    name: "송중기",
    phone: "010-0000-1111",
    phone1: "0000-1111",
    rating: 4.6,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-03-25",
    lastActivity: "2025-05-02",
    area: "중, 수성",
    areaGroup: "gu3",
  },
]);


// 기사 검색 관련 상태
const showTechnicianSearchModal = ref(false);
const technicianSearchFilters = ref({
  type: "all",
  settlementRate: "all",
  area: "all",
  keyword: "",
});


// 반응형 전화번호 표시
const windowWidth = ref(window.innerWidth);
window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

// 필터 데이터
const item = ref({
  startDate: "",
  endDate: "",
  rangeType: "all", // 'all' | 'today' | 'week' | 'month'
});
// 날짜 
const date = ref("오늘");
const pickup = ref("all");
const area = ref("all");
const status = ref("all");

// 필터 옵션
const dateOptions = [
  { value: "all", label: "전체" },
  { value: "today", label: "오늘" },
  { value: "week", label: "이번주" },
  { value: "month", label: "이번달" },
];
const pickupOptions = [
  { value: "all", label: "픽업위치" },
  { value: "대구공항", label: "대구공항" },
  { value: "동대구역", label: "동대구역" },
  { value: "서대구역", label: "서대구역" },
];
const areaOptions = [
  { value: "all", label: "담당구역" },
  { value: "gu1", label: "동, 군위" },
  { value: "gu2", label: "서, 중, 북" },
  { value: "gu3", label: "중, 수성" },
  { value: "gu4", label: "달서, 달성" },
];
const statusOptions = [
  { value: "all", label: "전체" },
  { value: "waiting", label: "대기중" },
  { value: "assigned", label: "기사배정" },
  { value: "in_progress", label: "운반중" },
  { value: "completed", label: "완료" },
  { value: "cancelled", label: "취소" },
];

// 상태값 매핑
const statusMap = {
  waiting: "대기중",
  assigned: "기사배정",
  in_progress: "운반중",
  completed: "완료",
  cancelled: "취소",
};
 

// 상태별 색상 클래스 리턴
function getStatusClass(status) {
  switch (status) {
    case "대기중":
      return "bg-green-100 text-green-700";
    case "기사배정":
      return "bg-indigo-100 text-indigo-700";
    case "운반중":
      return "bg-yellow-100 text-yellow-700";
    case "완료":
      return "bg-blue-100 text-blue-700";
    case "취소":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

// 필터링된 workers
const filteredWorkers = computed(() => {
  return workers.value.filter((worker) => {
    // 날짜 필터링 (lastActivity 기준)
    if (item.value.rangeType !== "all" && item.value.startDate && item.value.endDate) {
      const workerDate = new Date(worker.lastActivity);
      const start = new Date(item.value.startDate);
      const end = new Date(item.value.endDate);
      if (workerDate < start || workerDate > end) {
        return false;
      }
    }

    // 픽업 위치 필터링 (area 필드에 포함되어 있는지 체크)
    if (pickup.value !== "all" && !worker.area.includes(pickup.value)) {
      return false;
    }

    // 담당 지역 필터링
    if (area.value !== "all") {
      if (
        area.value === "gu1" &&
        !["동", "군위"].some((loc) => worker.area.includes(loc))
      ) {
        return false;
      }
      if (
        area.value === "gu2" &&
        !["서", "중", "북"].some((loc) => worker.area.includes(loc))
      ) {
        return false;
      }
      if (
        area.value === "gu3" &&
        !["중", "수성"].some((loc) => worker.area.includes(loc))
      ) {
        return false;
      }
      if (
        area.value === "gu4" &&
        !["달서", "달성"].some((loc) => worker.area.includes(loc))
      ) {
        return false;
      }
    }

    // 상태 필터링
    if (status.value !== "all") {
      if (worker.status !== statusMap[status.value]) {
        return false;
      }
    }

    return true;
  });
});

// 페이지네이션
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = computed(() =>
  Math.ceil(filteredWorkers.value.length / itemsPerPage.value)
);
const paginatedWorkers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredWorkers.value.slice(start, start + itemsPerPage.value);
});

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function goToPage(page) {
  currentPage.value = page;
}

// 검색 버튼 클릭 시 페이지 초기화
function onSearch() {
  currentPage.value = 1;
}

// 기사 상세 보기 (예시용 alert)
function showWorkerDetails(worker) {
  alert(`${worker.name} 상세보기`);
}

// 기사 상태 토글: 대기중 ↔ 활동중(기사배정)
function activeStatus(worker) {
  if (worker.status === "대기중") {
    worker.status = "기사배정";
  } else if (worker.status === "기사배정") {
    worker.status = "대기중";
  }
}
</script>

<style scoped>
.allpadding {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

@media (max-width: 500px) {
  .max-\[960px\]\:hidden {
    display: none !important;
  }
}
</style>
