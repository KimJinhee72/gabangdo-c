<template>
  <!-- 전체 래퍼 -->
  <div class="w-[390px] bg-gray-900 text-white m-auto h-screen flex flex-col">
    <!-- 이너 -->
    <div class="w-[350px] mx-auto h-full flex flex-col">
      <!-- 헤더 -->
      <div
        class="flex items-center justify-between py-3 bg-gray-900 text-white flex-shrink-0">
        <!-- 뒤로가기 -->
        <button @click="goBack">
          <img
            src="/public/images/yr/delivery/backIcon.png"
            alt="뒤로가기"
            class="w-4 h-4" />
        </button>
        <!-- 사용자명 -->
        <router-link to="/worker/ddashboard">
          <div class="text-blue-500 text-lg font-bold">
            <img
              src="/public/images/yr/delivery/logoL.png"
              alt=""
              class="w-15 h-5" />
          </div>
        </router-link>
        <!-- 알림/내역 -->
        <div class="flex gap-2">
          <router-link to="/worker/assigned-jobs">
            <img
              src="/public/images/yr/delivery/check_icon.png"
              alt="체크"
              class="w-5 h-5" />
          </router-link>
        </div>
      </div>

      <!-- 알림 타이틀 -->
      <div class="flex-shrink-0 pt-4">
        <h2 class="text-[#279BF3] text-xl font-semibold">알림</h2>
        <p class="text-sm text-gray-400 mt-1 mb-4">
          새로운 알림이 {{ todayAlerts.length }}개 있습니다
        </p>
      </div>

      <!-- 알림 목록 컨테이너 -->
      <div class="flex-1 min-h-0 relative">
        <div class="absolute inset-0 overflow-y-auto custom-scrollbar">
          <div class="space-y-3 pb-4">
            <div
              v-if="alerts.length === 0"
              class="text-center py-8 text-gray-400">
              <div
                class="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <p>새로운 알림이 없습니다</p>
            </div>
            <template v-else>
              <!-- 오늘의 알림 -->
              <div v-if="todayAlerts.length > 0" class="mb-6">
                <h3 class="text-sm font-medium text-gray-300 mb-2 px-2">
                  오늘의 알림
                </h3>
                <div class="relative bg-[#E9E9E9] border rounded-lg p-2">
                  <div
                    v-for="item in todayAlerts"
                    :key="item.id"
                    class="relative bg-white border-solid border-gray-300 border-[1px] rounded-lg px-4 py-4 flex items-start gap-2 mb-2 hover:shadow-md transition-shadow">
                    <img
                      :src="item.icon"
                      alt="알림"
                      class="w-8 h-8 mr-2 flex-shrink-0" />
                    <div
                      class="flex-1 text-sm text-black pt-1.5"
                      v-html="item.message"></div>
                    <button
                      class="absolute top-2 right-2 hover:bg-gray-100 rounded-full p-1 transition-colors"
                      @click="removeAlert(item.id)">
                      <img
                        src="/public/images/yr/delivery/Xicon.png"
                        alt="닫기"
                        class="w-3 h-3" />
                    </button>
                    <div
                      class="absolute bottom-2 right-3 text-xs text-gray-400">
                      {{ item.time }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 지난 알림 -->
              <div v-if="pastAlerts.length > 0" class="mt-6">
                <h3 class="text-sm font-medium text-gray-400 mb-2 px-2">
                  지난 알림
                </h3>
                <div class="relative bg-[#E9E9E9] border rounded-lg p-2">
                  <div
                    v-for="item in pastAlerts"
                    :key="item.id"
                    class="relative bg-gray-100 border-solid border-gray-200 border-[1px] rounded-lg px-4 py-4 flex items-start gap-2 mb-2 opacity-75">
                    <img
                      :src="item.icon"
                      alt="알림"
                      class="w-8 h-8 mr-2 flex-shrink-0 opacity-75" />
                    <div
                      class="flex-1 text-sm text-gray-600 pt-1.5"
                      v-html="item.message"></div>
                    <button
                      class="absolute top-2 right-2 hover:bg-gray-200 rounded-full p-1 transition-colors"
                      @click="removeAlert(item.id)">
                      <img
                        src="/public/images/yr/delivery/Xicon.png"
                        alt="닫기"
                        class="w-3 h-3 opacity-75" />
                    </button>
                    <div
                      class="absolute bottom-2 right-3 text-xs text-gray-400">
                      {{ item.time }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- 전체 지우기 버튼 -->
      <div class="mt-3 pb-3 flex-shrink-0">
        <button
          @click="clearAlerts"
          class="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          <img
            src="/public/images/yr/delivery/trashIcon.png"
            alt="휴지통"
            class="w-5 h-5" />
          <span class="pt-0.5">전체 지우기</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.back();
};

// 현재 날짜를 YYYY-MM-DD 형식으로 가져오는 함수
// const getToday = () => {
//   const now = new Date();
//   return now.toISOString().split("T")[0];
// };
const getToday = () => {
  const now = new Date();
  // 한국 시간으로 변환 (UTC+9)
  const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return koreaTime.toISOString().split("T")[0];
};

// 알림 데이터
const alerts = ref([
  {
    id: 1,
    icon: "/public/images/yr/delivery/alert1.png",
    message: "새로운 배송 요청이 들어왔습니다.",
    time: "11:30",
    date: "2025-05-30", // 오늘 날짜
  },
  {
    id: 2,
    icon: "/public/images/yr/delivery/alert2.png",
    message: "오늘의 배송 실적이 업데이트되었습니다.",
    time: "11:15",
    date: "2025-05-30", // 오늘 날짜
  },
  {
    id: 3,
    icon: "/public/images/yr/delivery/alert3.png",
    message: "내일 예정된 배송 일정이 있습니다.",
    time: "10:00",
    date: "2025-05-30", // 오늘 날짜
  },
  {
    id: 4,
    icon: "/public/images/yr/delivery/alert1.png",
    message: "배송 완료된 주문이 있습니다.<br/>리뷰를 작성해주세요.",
    time: "11:45",
    date: "2025-05-30", // 오늘 날짜
  },
  {
    id: 5,
    icon: "/public/images/yr/delivery/alert1.png",
    message: "새로운 배송 요청이 들어왔습니다.",
    time: "21:30",
    date: "2024-03-19", // 오늘 날짜
  },
  {
    id: 6,
    icon: "/public/images/yr/delivery/alert2.png",
    message: "오늘의 배송 실적이 업데이트되었습니다.",
    time: "21:15",
    date: "2024-03-19", // 오늘 날짜
  },
  {
    id: 7,
    icon: "/public/images/yr/delivery/alert3.png",
    message: "내일 예정된 배송 일정이 있습니다.",
    time: "21:00",
    date: "2024-03-19", // 오늘 날짜
  },
  {
    id: 8,
    icon: "/public/images/yr/delivery/alert1.png",
    message: "배송 완료된 주문이 있습니다.<br/>리뷰를 작성해주세요.",
    time: "20:45",
    date: "2024-03-19", // 오늘 날짜
  },
  {
    id: 9,
    icon: "/public/images/yr/delivery/alert2.png",
    message: "5월 정산이 마무리 되었습니다.<br/>확인 부탁드립니다.",
    time: "2024.05.14",
    date: "2024-03-18", // 어제 날짜
  },
  {
    id: 10,
    icon: "/public/images/yr/delivery/alert3.png",
    message: "주간 성과 리포트가 업데이트되었습니다.",
    time: "19:15",
    date: "2024-03-18", // 어제 날짜
  },
]);

// 오늘의 알림과 지난 알림을 분류하는 computed 속성
const todayAlerts = computed(() => {
  const today = getToday();
  return alerts.value.filter((alert) => alert.date === today);
});

const pastAlerts = computed(() => {
  const today = getToday();
  return alerts.value.filter((alert) => alert.date !== today);
});

// 개별 삭제
const removeAlert = (id) => {
  alerts.value = alerts.value.filter((item) => item.id !== id);
};

// 전체 삭제
const clearAlerts = () => {
  alerts.value = [];
};
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

/* 스크롤바 숨김 */
.custom-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-scrollbar::-webkit-scrollbar {
  display: none;
}

/* 터치 디바이스 스크롤 최적화 */
.custom-scrollbar {
  -webkit-overflow-scrolling: touch;
}

/* 알림 카드 호버 효과 */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 스크롤 영역 최적화 */
.min-h-0 {
  min-height: 0;
}

/* 지난 알림 스타일 */
.opacity-75 {
  opacity: 0.75;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.text-gray-600 {
  color: #4b5563;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

/* 섹션 간격 조정 */
.mb-6 {
  margin-bottom: 1.5rem;
}

.mt-6 {
  margin-top: 1.5rem;
}
</style>
