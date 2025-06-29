<template>
  <!-- 기사 목록 -->
  <div class="bg-white rounded-lg shadow dark:bg-gray-800">
    <div class="p-4 pb-0 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
        기사 목록
      </h2>
    </div>
    <!-- 검색 select바 -->
    <div
      class="p-4 py-6 font-light text-gray-500 dark:text-black text-sm border-b border-gray-200 flex flex-col md:flex-row gap-4">
      <div class="flex flex-wrap md:flex-row justify-center md:justify-start gap-2 items-center">
        <!-- 날짜 선택 일일이 선택 -->
        <SearchDateSelect v-model:startDate="items[index].startDate" v-model:endDate="items[index].endDate"
          @change="handleDateSelect" />
        <!-- 오늘/주/한달 선택  -->
        <SearchSelect v-model="date" :options="dateOptions" @change="onDateChange" />
        <!-- <SearchSelect v-model="pickup" :options="pickupOptions" /> -->
        <SearchSelect v-model="area" :options="areaOptions" />
        <SearchSelect v-model="status" :options="statusOptions" />
        <!-- <button
          class="px-4 py-1 bg-indigo-600 dark:bg-indigo-300 text-white dark:text-black rounded-md hover:bg-indigo-700"
          @click="onSearch">
          검색
        </button> -->
      </div>
    </div>
    <!-- 기사 data -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr class="allpadding">
            <th class="idTh px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              기사ID
            </th>
            <th class="hidden id1Th px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span class="ratingTh"> 이름</span>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span class="ratingTh"> 연락처</span>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span class="ratingTh"> 구역</span>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span class="ratingTh"> 평점</span>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span class="statusTh">상태</span>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span class="statusTh">예약</span>
            </th>
            <th
              class="actionTh statusTh w-[40px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              액션
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="worker in paginatedWorkers" :key="worker.id" @click="showWorkerDetails(worker)"
            class="hover:bg-gray-50 allpadding">
            <td class="idTd px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ worker.id }}
            </td>
            <td class="hidden id1Td px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ worker.id.replace('#C', '') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ worker.name }}
            </td>
            <td class="phoneTd px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ worker.phone }}
            </td>
            <td class="phone1Td hidden px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ worker.phone1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex items-center">
                <span class="max-[1090px]:hidden text-yellow-400 mr-1">
                </span>
                {{ worker.area }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex items-center">
                <span class="max-[1090px]:hidden text-yellow-400 mr-1">
                  <i class="fas fa-star"></i>
                </span>
                {{ worker.rating }}
              </div>
            </td>
            <td class="statusNor px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(worker.status)" class="px-2 py-1 text-xs  font-semibold rounded-xl">
                {{ worker.status }}
              </span>
            </td>
            <td class="statusRournd hidden px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(worker.status)" class="w-3 h-3 inline-block rounded-full">
              </span>
            </td>
            <td class="statusTh px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ worker.reservations }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="max-[1090px]:hidden eyeBtn relative group inline-block mr-3">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3">
                  <i class="fas fa-eye mr-1"></i>
                  <span>상세</span>
                </button>
                <!-- 툴팁 호버시 보임 -->
                <div
                  class="hidden max-[1090px]:group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 rounded bg-black/70 text-white text-xs z-10">
                  상세보기
                </div>
              </div>
              <!-- 수정 -->
              <div class="max-[1090px]:hidden editBtn relative group inline-block mr-3">
                <button class="text-yellow-600 hover:text-yellow-900">
                  <i class="fas fa-edit mr-1"></i>
                  <span>수정</span>
                </button>
                <!-- 툴팁 호버시 보임 -->
                <div
                  class="hidden max-[1090px]:group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 rounded bg-black/70 text-white text-xs z-10">
                  수정클릭
                </div>
              </div>

              <!-- 대기중/활동중 -->
              <div @click="activeStatus(worker)" class="relative group inline-block">
                <button :class="[
                  'px-2 inline-flex  items-center text-xs leading-5 font-semibold rounded-xl',
                  worker.status === '대기중'
                    ? 'text-green-600 hover:text-green-600'
                    : 'text-red-600 hover:text-red-900',
                ]" class="actionBtn">
                  <i class="fas fa-ban mr-1"></i>
                  <span>{{
                    worker.status === "대기중" ? "활동중" : "대기중"
                    }}</span>
                </button>
                <button class="hidden actionBtn1 " :class="[
                  'px-2 inline-flex  items-center text-xs font-semibold rounded-xl ',
                  worker.status === '대기중'
                    ? 'text-green-600 hover:text-green-600'
                    : 'text-red-600 hover:text-red-900',
                ]">
                  <i class="fas fa-ban mr-1"></i>
                </button>

                <!-- 툴팁: 호버시만 보임 -->
                <div
                  class="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 rounded bg-black/80 text-white text-xs z-10 ">
                  <span :class="[
                    worker.status === '대기중'
                      ? 'text-red-600 hover:text-red-900'
                      : 'text-green-600 hover:text-green-600',
                  ]">
                    {{ worker.status === "대기중" ? "활동중지" : "활동클릭" }}
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 페이지네이션 -->
      <div class="pageNum flex justify-between items-center bg-white rounded-lg shadow p-4 px-6 dark:bg-gray-800">
        <div
          class="pageEx w-full justify-between items-center max-[768px]:flex-1 max-[768px]:flex max-[768px]:items-center max-[768px]:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-white">
              총 <span class="font-medium">{{ totalItems }}</span>명 중
              <span class="font-medium">{{
                (currentPage - 1) * itemsPerPage + 1
                }}</span>-
              <span class="font-medium">{{
                Math.min(currentPage * itemsPerPage, totalItems)
                }}</span>개 표시
            </p>
          </div>
        </div>
        <div class="flex gap-2 dark:text-white">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)" class="px-3 py-1 border rounded"
            :class="[
              currentPage === page
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300  text-gray-500 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-700',
            ]">
            {{ page }}
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 기사 상세 모달 -->
  <div v-if="selectedWorker" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">기사 상세 정보</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 기본 정보 -->
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-gray-500 mb-2">기사 기본 정보</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700">기사ID</label>
                  <span class="text-sm text-gray-900">{{
                    selectedWorker.id
                    }}</span>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700">이름</label>
                  <span class="text-sm text-gray-900">{{
                    selectedWorker.name
                    }}</span>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700">연락처</label>
                  <span class="text-sm text-gray-900">{{
                    selectedWorker.phone
                    }}</span>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700">평점</label>
                  <div class="flex items-center">
                    <span class="text-yellow-400 mr-1">
                      <i class="fas fa-star"></i>
                    </span>
                    <span class="text-sm text-gray-900">{{
                      selectedWorker.rating
                      }}</span>
                  </div>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700">상태</label>
                  <span :class="getStatusClass(selectedWorker.status)"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ selectedWorker.status }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 담당 예약 정보 -->
            <div>
              <h4 class="text-sm font-medium text-gray-500 mb-2">담당 예약 정보</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700">현재 예약</label>
                  <span class="text-sm text-gray-900">{{
                    selectedWorker.reservations
                    }}</span>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700">총 예약</label>
                  <span class="text-sm text-gray-900">15건</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 추가 정보 -->
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-gray-500 mb-2">활동 정보</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700">가입일</label>
                  <span class="text-sm text-gray-900">{{
                    selectedWorker.joinDate
                    }}</span>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700">마지막 활동</label>
                  <span class="text-sm text-gray-900">{{
                    selectedWorker.lastActivity
                    }}</span>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700">활동 지역</label>
                  <span class="text-sm text-gray-900">{{
                    selectedWorker.area
                    }}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-sm font-medium text-gray-500 mb-2">메모</h4>
              <textarea v-model="selectedWorker.memo" rows="3"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="기사에 대한 메모를 입력하세요"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
        <button @click="closeModal"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          닫기
        </button>
        <button @click="saveWorker"
          class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          저장
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchDateSelect from "./SearchDateSelect.vue";
import SearchSelect from "./SearchSelect.vue";
import { ref, computed, reactive, watch, defineProps, defineEmits } from "vue";
import { useAppStore } from "@/stores/useAppStore";
import { format } from "date-fns";

//부모에게 넘겨주기
const props = defineProps({
  workers: Array,
  searchQuery: String,
  statusFilter: String,
})

const emit = defineEmits(['update:filtered'])

const store = useAppStore();

const selectedWorker = ref(null);
const addWorker = ref(null);

const formatDate = (date) => format(date, "yyyy-MM-dd");
const today = new Date();

// 날짜 선택용 reactive 배열
const items = reactive([
  {
    rangeType: "today",
    startDate: formatDate(today),
    endDate: formatDate(today),
  },
]);
const index = 0;

function handleDateSelect() {
  if (items[index].startDate && items[index].endDate) {
    date.value = "custom";
    items[index].rangeType = "custom";
    updateDateRange(index);
  }
}
function onDateChange(value) {
  // 예: value는 'today', 'yesterday', 'tomorrow' 등일 수 있음
  items[0].rangeType = value;

  if (value === 'today') {
    const today = new Date();
    items[0].startDate = formatDate(today);
    items[0].endDate = formatDate(today);
  } else if (value === 'yesterday') {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    items[0].startDate = formatDate(yesterday);
    items[0].endDate = formatDate(yesterday);
  } else if (value === 'tomorrow') {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    items[0].startDate = formatDate(tomorrow);
    items[0].endDate = formatDate(tomorrow);
  } else if (value === 'custom') {
    // 커스텀은 사용자가 직접 입력
  }

  // 검색 조건 다시 적용
  currentPage.value = 1;
}


const showTechnicianSearchModal = ref(false);
const technicianSearchFilters = ref({
  type: "all",
  settlementRate: "all",
  area: "all",
  keyword: "",
});

const windowWidth = ref(window.innerWidth);
window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

const item = ref({
  startDate: "",
  endDate: "",
  rangeType: "",
});

const pickup = ref("all");
const area = ref("all");
const status = ref("all");
const date = ref("today");

const dateOptions = [
  { label: "오늘", value: "today" },
  { label: "어제", value: "yesterday" },
  { label: "내일", value: "tomorrow" },
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
  { value: "all", label: "활동상태" },
  { value: "waiting", label: "대기중" },
  { value: "in_progress", label: "활동중" },
  { value: "joboff", label: "휴무" },
];

const statusMap = {
  waiting: "대기중",
  in_progress: "활동중",
  joboff: "휴무",
};

function getStatusClass(status) {
  switch (status) {
    case "활동중":
      return "bg-green-600 text-green-100";
    case "기사배정":
      return "bg-indigo-100 text-indigo-700";
    case "운반중":
      return "bg-yellow-100 text-yellow-700";
    case "완료":
      return "bg-blue-100 text-blue-700";
    case "대기중":
      return "bg-red-600 text-red-100";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

// 필터링된 workers
const filteredWorkers = computed(() => {
  // 1. 우선 store.workers 배열 복사
  let result = [...store.workers];

  // 2. 검색어 필터링
  if (props.searchQuery) {
    const query = props.searchQuery.toLowerCase();
    result = result.filter(w => w.name.toLowerCase().includes(query));
  }

  // 3. 상태 필터링
  if (props.statusFilter && props.statusFilter !== 'all') {
    result = result.filter(w => w.status === props.statusFilter);
  }

  // 4. 날짜 필터링 (오늘, 어제, 내일 등)
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const yesterday = new Date(todayDate);
  yesterday.setDate(todayDate.getDate() - 1);

  const tomorrow = new Date(todayDate);
  tomorrow.setDate(todayDate.getDate() + 1);

  result = result.filter(worker => {
    const workerDate = worker.lastActivity === "휴무" ? null : new Date(worker.lastActivity)
  if (workerDate) workerDate.setHours(0, 0, 0, 0)

  // today
  if (date.value === "today") {
    if (worker.lastActivity !== "휴무" && workerDate?.getTime() !== todayDate.getTime()) return false
    if (worker.lastActivity === "휴무" && worker.day !== "today") return false
  }

  // yesterday
  else if (date.value === "yesterday") {
    if (worker.lastActivity !== "휴무" && workerDate?.getTime() !== yesterday.getTime()) return false
    if (worker.lastActivity === "휴무" && worker.day !== "yesterday") return false
  }

  // tomorrow
  else if (date.value === "tomorrow") {
    if (worker.lastActivity !== "휴무" && workerDate?.getTime() !== tomorrow.getTime()) return false
    if (worker.lastActivity === "휴무" && worker.day !== "tomorrow") return false
  }



    // rangeType 날짜 범위 필터
    if (workerDate && item.value.rangeType !== "all" && item.value.startDate && item.value.endDate) {
      const start = new Date(item.value.startDate);
      const end = new Date(item.value.endDate);
      if (workerDate < start || workerDate > end) return false;
    }

    // 픽업 위치 필터
    if (pickup.value !== "all" && !worker.area.includes(pickup.value)) return false;

    // 지역 필터
    if (area.value !== "all") {
      const guAreaMap = {
        gu1: ["동", "군위"],
        gu2: ["서", "중", "북"],
        gu3: ["중", "수성"],
        gu4: ["달서", "달성"],
      };
      if (!guAreaMap[area.value].some(loc => worker.area.includes(loc))) return false;
    }

    // 상태 필터
    if (status.value !== "all" && worker.status !== statusMap[status.value]) return false;

    return true;
  });

  return result;
});

// ✅ filteredWorkers가 바뀔 때마다 emit
watch(filteredWorkers, (newVal) => {
  emit('update:filtered', newVal)
}, { immediate: true })

// 🔍 검색 필터 추가 적용
const searchedWorkers = computed(() => {
  const keyword = props.searchWorker?.toLowerCase()?.trim() || ''
  if (!keyword) return filteredWorkers.value

  const normalizedKeyword = keyword.replace(/-/g, '')

  return filteredWorkers.value.filter((worker) => {
    const nameMatch = worker.name.includes(keyword)
    const phoneMatch = worker.phone.replace(/-/g, '').includes(normalizedKeyword)
    const phone1Match = worker.phone1.replace(/-/g, '').includes(normalizedKeyword)

    return nameMatch || phoneMatch || phone1Match
  })
})
// 부모에게 emit
watch(searchedWorkers, (val) => {
  emit('update:filtered', val)
}, { immediate: true })

//페이지네이션
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = computed(() => filteredWorkers.value.length);
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

function onSearch() {
  currentPage.value = 1;
}

const activeStatus = (worker) => {
  const currentStatus = worker.status;
  const newStatus = currentStatus === "대기중" ? "활동중" : "대기중";
  store.updateWorker(worker.id, { status: newStatus });
};

const showWorkerDetails = (worker) => {
  addWorker.value = { ...worker };
  document.body.style.overflow = "hidden";
  selectedWorker.value = { ...worker };
};

const closeModal = () => {
  selectedWorker.value = null;
  addWorker.value = null;
  document.body.style.overflow = "";
};

const saveWorker = () => {
  if (selectedWorker.value) {
    store.updateWorker(selectedWorker.value.id, selectedWorker.value);
  }
  console.log("저장된 기사 정보:", selectedWorker.value);
  closeModal();
};

function handleInput(event) {
  searchQuery.value = event.target.value;
}
</script>


<style scoped>
.allpadding {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

@media screen and (max-width: 1260px) {
  .phoneTd {
    display: none !important;
  }

  .phone1Td {
    display: block;
  }

  .eyeBtn {
    display: none;
  }

  .editBtn {
    display: none !important;
  }
}

@media screen and (max-width: 1010px) {
  .cardtxt {
    margin-left: 0px !important;
    text-align: center;
  }

  th {
    padding-left: 5px;
    padding-right: 5px;
  }

  td {
    padding-left: 5px;
    padding-right: 5px;
  }

  .eyeBtn {
    margin-right: 0px !important;
  }

  .banBtn {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}

@media screen and (max-width: 500px) {

  .idTd,
  .idTh {
    display: none;
  }

  .id1Td,
  .id1Th {
    display: block;
  }

  .ratingTh {
    display: none;
  }

  .statusTh {
    display: none;
  }

  .statusNor {
    display: none;
  }

  .statusRournd {
    display: block !important;
    ;
  }

  .actionTh {
    width: 40px;
  }

  .actionBtn {
    display: none;
    width: 40px;
  }

  .actionBtn1 {
    display: block;
    width: 40px;
  }

  .pageNation {
    display: flex;
    justify-content: center;
  }

  .pageEx {
    display: none;
  }

  .pageNum {
    display: flex;
    justify-content: center;
  }
}
</style>
