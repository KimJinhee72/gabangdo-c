<template>
  <div class="space-y-6">
    <h1
      class="text-2xl text-center md:text-left font-bold text-gray-800 dark:text-white">
    대시보드
    </h1>

    <!-- 통계 카드 -->
    <!-- 예약카드 -->
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
                / 매출현황</span
              >
            </h3>
            <h3
              class="hidden max-[510px]:block text-sm font-medium text-gray-500 dark:text-white">
              예약<span class="text-xs text-gray-500 dark:text-white">
                / 매출</span
              >
            </h3>
            <p
              class="text-2xl max-[510px]:text-lg leading-9 font-semibold text-gray-800 dark:text-white">
              120<span
                class="text-lg max-[510px]:text-sm font-semibold text-gray-800 dark:text-white"
                >/+20%</span
              >
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
            <i class="user fas fa-users text-2xl"></i>
          </div>
          <div class="ml-0 min-[900px]:ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-white">
              활동기사
            </h3>
            <p
              class="text-2xl max-[510px]:text-lg font-semibold text-gray-800 dark:text-white">
              12<span class="man dark:text-white">/{{ totalWorkers }}</span>
            </p>
            <span class="span text-sm text-green-600 dark:text-green-300"
              >+2명</span
            >
          </div>
        </div>
      </div>
      <!-- 만족도카드 -->
      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div class="flex items-center">
          <div class="icon-box p-3 rounded-full bg-gray-300 text-yellow-600">
            <i class="star fas fa-star text-2xl"></i>
          </div>
          <div class="ml-0 min-[900px]:ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-white">
              평균만족
            </h3>
            <p
              class="text-2xl max-[510px]:text-lg font-semibold text-gray-800 dark:text-white">
              4.8
            </p>
            <span class="span text-sm text-green-600 dark:text-green-300"
              >+0.2</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 예약 현황 -->
    <ReservationList />

    <!-- 기사 현황 -->
    <WorkersList />
    <!--고객 현황  -->
    <CustomersList />
    <!-- 예약추이와 매출현황 차트 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 차트 -->
      <div class="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
          예약 추이
        </h2>
        <p class="text-sm text-gray-600 mb-4 dark:text-white">
        최근 6개월간 예약 추이를 확인할 수 있습니다.
      </p>
        <div class="h-64">
          <Chart />
        </div>
      </div>

      <!-- 매출 현황 -->
      <!-- <div
        class="bg-white dark:bg-gray-600 rounded-lg shadow p-6 dark:text-white">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          매출 현황
        </h2>
        <div class="h-64 dark:text-white">
          <ChartRound />
        </div>
      </div> -->
      <MonthlySale/>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Chart from "@/components/Chart.vue";
import ChartRound from "../../components/ChartRound.vue";
import ReservationList from "./components/ReservationList.vue";
import WorkersList from "./components/WorkersList.vue";
import CustomersList from "./components/CustomersList.vue";
import MonthlySale from "./components/MonthlySale.vue";

const date = ref("오늘");
const pickup = ref("all");
const area = ref("all");
const status = ref("all");
const toggleStaus = (worker) => {
  if (worker.status === "운반중") {
    worker.status = "대기중";
  } else if (worker.status === "대기중") {
    worker.status = "운반중";
  }
};
// 기준일 선택
const dateOptions = [
  { value: "all", label: "전체" },
  { value: "오늘", label: "오늘" },
  { value: "일주일", label: "일주일" },
  { value: "한달", label: "한달" },
];
// 날짜선택

const item = ref({
  rangeType: "today",
  startDate: "2025-05-20",
  endDate: "2025-05-20",
});

watch(date, (newVal) => {
  const today = new Date();
  switch (newVal) {
    case "오늘":
      item.value.rangeType = "today";
      item.value.startDate = formatDate(today);
      item.value.endDate = formatDate(today);
      break;
    case "일주일":
      item.value.rangeType = "week";
      item.value.startDate = formatDate(addDays(today, -7));
      item.value.endDate = formatDate(today);
      break;
    case "한달":
      item.value.rangeType = "month";
      item.value.startDate = formatDate(subMonths(today, 1));
      item.value.endDate = formatDate(today);
      break;
    case "all":
      item.value.rangeType = "all";
      item.value.startDate = "";
      item.value.endDate = "";
      break;
  }
});

const rangeOptions = [
  { value: "today", label: "오늘" },
  { value: "week", label: "일주일" },
  { value: "month", label: "한달" },
  { value: "all", label: "전체" },
];
// 픽업위치
const pickupOptions = [
  { value: "all", label: "픽업위치" },
  { value: "대구공항", label: "대구공항" },
  { value: "동대구역", label: "동대구역" },
  { value: "서대구역", label: "서대구역" },
];
// 담당지역
const areaOptions = [
  { value: "all", label: "담당지역" },
  { value: "gu1", label: "동, 군위" },
  { value: "gu2", label: "서, 중, 북" },
  { value: "gu3", label: "중, 수성" },
  { value: "gu4", label: "달서, 달성" },
];
// 운반상태
const statusOptions = [
  { value: "all", label: "운반상태" },
  { value: "waiting", label: "대기중" },
  { value: "assigned", label: "기사배정" },
  { value: "in_progress", label: "운반중" },
  { value: "completed", label: "완료" },
  { value: "cancelled", label: "취소" },
];
// 기사
const totalWorkers = ref(15);

const workers = ref([
  {
    id: "#C001",
    name: "이지은",
    phone: "010-1234-5678",
    rating: 4.8,
    status: "운반중",
    reservations: "2건",
  },
  {
    id: "#C002",
    name: "최윤호",
    phone: "010-8765-4321",
    rating: 4.5,
    status: "대기중",
    reservations: "1건",
  },
]);

const recentReservations = ref([
  { id: 1, customerName: "김철수", date: "2024-03-20", status: "완료" },
  { id: 2, customerName: "이영희", date: "2024-03-21", status: "대기중" },
  { id: 3, customerName: "박민수", date: "2024-03-22", status: "취소" },
  { id: 4, customerName: "정지은", date: "2024-03-23", status: "운반중" },
]);

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
</script>
<style scoped>
.rounded-full {
  width: 54px;
}
.icon-box i {
  font-size: 1.5rem; /* text-xl 정도 */
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
  margin-left: 2px;
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
    justify-content: space-around !important;
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
