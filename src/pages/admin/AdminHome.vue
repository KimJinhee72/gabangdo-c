<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();

// 메뉴 열림 여부를 관리하는 상태
const isMdMenuOpen = ref(true);

// X 버튼 클릭 시 메뉴 닫기
const mdMenuXbutton = () => {
  isMdMenuOpen.value = false;
};

// openHanmberger
const openHanmberger = () => {
  if (window.innerWidth >= 768) return;
  isMdMenuOpen.value = !isMdMenuOpen.value;
};
const links = [
  { name: "대시보드", path: "/admin/dashboard", icon: "fas fa-chart-line" },
  {
    name: "예약관리",
    path: "/admin/reservations",
    icon: "fas fa-suitcase",
  },
  { name: "기사관리", path: "/admin/workers", icon: "fas fa-user-tie" },
  { name: "고객관리", path: "/admin/customers", icon: "fas fa-users" },
  {
    name: "매출관리",
    path: "/admin/SaleStatus",
    icon: "fas fas fa-dollar-sign",
  },
  { name: "설정", path: "/admin/settings", icon: "fas fa-cog" },
];

// 현재 경로에 따른 활성화 상태 계산
const isActive = (path) => route.path === path;

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- 사이드바 -->
    <div class="fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-lg">
      <div class="flex flex-col h-full">
        <!-- top-->
        <div
          @click="openHanmberger"
          class="bb w-64 flex justify-between items-center p-4 px-10 md:justify-center border-b md:-ml-8 border-black bg-white dark:border-gray-700 dark:bg-gray-800">
          <h1
            class="w-[110px] md:w-full ml-2 text-2xl text-center py-4 md:p-4 pl-0 font-bold dark:text-white">
            관리자
          </h1>
          <i
            class="block mr-1.5 md:hidden first-line:w-8 fas fa-bars cursor-pointer hover:bg-gray-100 p-1.5 rounded-lg dark:text-white"></i>
        </div>
        <!-- 메뉴 -->
        <div v-if="isMdMenuOpen" class="relative p-4 pl-0">
          <!-- x버튼 -->
          <span
            @click="mdMenuXbutton"
            class="block md:hidden absolute top-[5px] right-[49px] text-gray-700 dark:text-gray-300 pl-1.5 pr-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >X</span
          >
          <!-- 네비게이션 메뉴 -->
          <nav class="flex flex-col flex-1 p-4 pb-0 gap-2 overflow-y-auto ">
            <router-link
              v-for="link in links"
              :key="link.path"
              :to="link.path"
              class="flex gap-3 items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-black transition-colors"
              :class="[
                isActive(link.path)
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : '',
              ]">
              <i
                :class="[
                  ...link.icon.split(' '), // 'fas fa-dollar-sign' → ['fas', 'fa-dollar-sign']
                  link.icon.includes('fa-dollar-sign')
                    ? ['text-xl', '!w-7.5', 'h-6', 'ml-.5']
                    : '!w-7.5',
                  link.icon.includes('fa-users') ? ['-ml-1', 'w-8'] : 'w-8',
                  link.icon.includes('fa-chart-line') ? ['ml-.75', 'w-8'] : 'w-8',
                ]">
              </i>
              <p
                :class="[
                  'text-base',
                  link.name.includes('고객관리') ? '!ml-1' : '',
                ]">
                {{ link.name }}
              </p>
            </router-link>
          </nav>

          <!-- 로그아웃 버튼 -->
          <div class="p-4 border-t m-auto border-gray-200 dark:border-gray-700 ">
            <button
              @click="logout"
              class="w-full flex gap-3 md:gap-5 items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-black transition-colors">
              <i class="-ml-2 w-8 fas fa-sign-out-alt"></i>
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="md:ml-[230px] ml-0 min-h-screen">
      <div class="p-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 기본 스타일 */
.min-h-screen {
  min-height: 100vh;
}

/* 반응형 스타일 */
.bb {
  border-bottom: 1px solid rgb(221, 220, 220);
}
@media (max-width: 768px) {
  .fixed {
    position: relative;
    width: 100%;
    height: auto;
    text-align: center;
  }

  .ml-64 {
    margin-left: 0;
  }

  .w-64 {
    width: 100%;
  }

  .p-8 {
    padding: 1rem;
  }
  .w-full {
    padding-left: 16px !important ;
  }
}

/* 스크롤 스타일 */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f7fafc;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 3px;
}

/* 다크모드 스크롤 스타일 */
.dark .overflow-y-auto {
  scrollbar-color: #4b5563 #1f2937;
}

.dark .overflow-y-auto::-webkit-scrollbar-track {
  background: #1f2937;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}

/* 전환 효과 */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* 호버 효과 */
.hover\:bg-gray-100:hover {
  background-color: #e7e7e9;
}

.dark .hover\:bg-gray-700:hover {
  background-color: #374151;
}

/* 활성화 상태 */
.bg-indigo-100 {
  background-color: #e0e7ff;
}

.dark .bg-indigo-900 {
  background-color: #312e81;
}

.text-indigo-700 {
  color: #4338ca;
}

.dark .text-indigo-300 {
  color: #a5b4fc;
}
</style>
