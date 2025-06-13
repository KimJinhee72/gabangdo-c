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
            홍길동<span class="text-white text-sm">기사님</span>
          </div>
        </router-link>
        <!-- 알림/내역 -->

        <router-link to="/worker/assign">
          <img
            src="/public/images/yr/delivery/alert.png"
            alt="알림"
            class="w-5 h-5" />
        </router-link>
      </div>

      <!-- 타이틀 및 필터 영역 -->
      <div class="flex-shrink-0 pt-4">
        <h2 class="text-[#279BF3] text-xl font-semibold">내역확인</h2>

        <!-- 대시보드 -->
        <div
          class="bg-white rounded-xl p-2 flex justify-between items-center shadow mt-4 mb-4">
          <!-- 평가 -->
          <div class="flex flex-col items-center text-xs">
            <p class="text-black mb-1 pl-4">평가</p>
            <img
              src="/public/images/yr/delivery/star.png"
              alt="평가별"
              class="w-16 ml-4" />
            <p class="text-base font-semibold pl-4">4.0</p>
          </div>
          <div class="w-px h-12 bg-gray-200"></div>
          <!-- 총 작업수 -->
          <div class="flex flex-col items-center text-xs">
            <p class="text-black mb-1">총 작업수</p>
            <p class="text-base font-semibold text-blue-600">58건</p>
          </div>
          <div class="w-px h-12 bg-gray-200"></div>
          <!-- 수령금액 -->
          <div class="flex flex-col items-center text-xs mr-5">
            <p class="text-black mb-1">수령금액</p>
            <p class="text-base font-semibold text-red-600">
              449,500<span class="text-xs text-gray-500">원</span>
            </p>
          </div>
        </div>

        <!-- 검색 필터 -->
        <div class="relative mb-2">
          <input
            type="text"
            placeholder="고객명 또는 주소, 전화번호 검색"
            class="w-full pl-10 pr-3 py-2 rounded border border-gray-300 text-sm focus:outline-none" />
          <img
            src="/public/images/yr/delivery/glass.png"
            alt="돋보기"
            class="absolute left-3 top-2.5 w-4 h-4" />
        </div>

        <!-- 날짜 필터 -->
        <div class="mb-4">
          <select class="w-full py-2 px-3 rounded border text-sm">
            <option>최근 1주일</option>
            <option>최근 2개월</option>
            <option>최근 3개월</option>
          </select>
        </div>
      </div>

      <!-- 카드 내역들 -->
      <div class="flex-1 min-h-0 relative">
        <div class="absolute inset-0 overflow-y-auto custom-scrollbar">
          <div class="space-y-4 pb-4">
            <div class="p-2 bg-[#E9E9E9] rounded-lg">
              <!-- 카드 0 -->
              <div class="bg-white rounded-lg shadow p-3 mb-2 mb-2">
                <div
                  class="flex justify-between text-sm font-semibold text-gray-700">
                  <p>05.28 (화)</p>
                  <p class="text-red-600">13,000원</p>
                </div>
                <p class="mt-1 text-gray-900 font-medium text-[17px]">송혜연</p>
                <div
                  class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
                  <p>s사이즈 / 3개</p>
                  <p class="text-black">4.0점</p>
                </div>
                <button
                  onclick="document.getElementById('modal').classList.remove('hidden')"
                  class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
                  상세
                </button>
              </div>

              <!-- 카드 1 -->
              <div class="bg-white rounded-lg shadow p-3 mb-2">
                <div
                  class="flex justify-between text-sm font-semibold text-gray-700">
                  <p>05.27 (월)</p>
                  <p class="text-red-600">15,000원</p>
                </div>
                <p class="mt-1 text-gray-900 font-medium text-[17px]">김다현</p>
                <div
                  class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
                  <p>S사이즈 / 2개</p>
                  <p class="text-black">5점</p>
                </div>
                <button
                  onclick="document.getElementById('modal').classList.remove('hidden')"
                  class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
                  상세
                </button>
              </div>

              <!-- 카드 2 -->
              <div class="bg-white rounded-lg shadow p-3 mb-2">
                <div
                  class="flex justify-between text-sm font-semibold text-gray-700">
                  <p>05.15 (목)</p>
                  <p class="text-red-600">9,500원</p>
                </div>
                <p class="mt-1 text-gray-900 font-medium text-[17px]">이서준</p>
                <div
                  class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
                  <p>L사이즈 / 4개</p>
                  <p class="text-black">3점</p>
                </div>
                <button
                  onclick="document.getElementById('modal').classList.remove('hidden')"
                  class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
                  상세
                </button>
              </div>

              <!-- 카드 3 -->
              <div class="bg-white rounded-lg shadow p-3 mb-2">
                <div
                  class="flex justify-between text-sm font-semibold text-gray-700">
                  <p>03.21 (금)</p>
                  <p class="text-red-600">18,000원</p>
                </div>
                <p class="mt-1 text-gray-900 font-medium text-[17px]">정유진</p>
                <div
                  class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
                  <p>M사이즈 / 1개</p>
                  <p class="text-black">4점</p>
                </div>
                <button
                  onclick="document.getElementById('modal').classList.remove('hidden')"
                  class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
                  상세
                </button>
              </div>

              <!-- 카드 4 -->
              <div class="bg-white rounded-lg shadow p-3 mb-2">
                <div
                  class="flex justify-between text-sm font-semibold text-gray-700">
                  <p>03.07 (목)</p>
                  <p class="text-red-600">11,200원</p>
                </div>
                <p class="mt-1 text-gray-900 font-medium text-[17px]">박지훈</p>
                <div
                  class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
                  <p>XL사이즈 / 5개</p>
                  <p class="text-black">2점</p>
                </div>
                <button
                  onclick="document.getElementById('modal').classList.remove('hidden')"
                  class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
                  상세
                </button>
              </div>

              <!-- 카드 5 -->
              <div class="bg-white rounded-lg shadow p-3 mb-2">
                <div
                  class="flex justify-between text-sm font-semibold text-gray-700">
                  <p>12.12 (목)</p>
                  <p class="text-red-600">7,800원</p>
                </div>
                <p class="mt-1 text-gray-900 font-medium text-[17px]">한지원</p>
                <div
                  class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
                  <p>S사이즈 / 3개</p>
                  <p class="text-black">5점</p>
                </div>
                <button
                  onclick="document.getElementById('modal').classList.remove('hidden')"
                  class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
                  상세
                </button>
              </div>

              <!-- 카드 6 -->
              <div class="bg-white rounded-lg shadow p-3 mb-2">
                <div
                  class="flex justify-between text-sm font-semibold text-gray-700">
                  <p>12.01 (일)</p>
                  <p class="text-red-600">21,300원</p>
                </div>
                <p class="mt-1 text-gray-900 font-medium text-[17px]">최민서</p>
                <div
                  class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
                  <p>M사이즈 / 2개</p>
                  <p class="text-black">1점</p>
                </div>
                <button
                  onclick="document.getElementById('modal').classList.remove('hidden')"
                  class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
                  상세
                </button>
              </div>

              <!-- 카드 7 -->
              <div class="bg-white rounded-lg shadow p-3 mb-2">
                <div
                  class="flex justify-between text-sm font-semibold text-gray-700">
                  <p>03.09 (토)</p>
                  <p class="text-red-600">13,700원</p>
                </div>
                <p class="mt-1 text-gray-900 font-medium text-[17px]">윤하은</p>
                <div
                  class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
                  <p>L사이즈 / 1개</p>
                  <p class="text-black">3점</p>
                </div>
                <button
                  onclick="document.getElementById('modal').classList.remove('hidden')"
                  class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
                  상세
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 모달 -->
  <div
    id="modal"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 hidden">
    <div class="bg-white w-[350px] rounded-xl">
      <div class="rounded-lg w-[330px] m-auto p-3 pt-4">
        <!-- 이름 -->
        <div class="flex justify-between mb-2">
          <span class="text-gray-500">이름</span>
          <span class="text-black font-semibold">홍길동</span>
        </div>

        <!-- 전화번호 -->
        <div class="flex justify-between mb-2">
          <span class="text-gray-500">전화번호</span>
          <span class="text-black">010-1234-5678</span>
        </div>

        <!-- 시간 -->
        <div class="flex justify-between mb-2">
          <span class="text-gray-500">시간</span>
          <span class="text-black">2025.05.02(금) 17:00</span>
        </div>

        <!-- 수화물 -->
        <div class="flex justify-between mb-2">
          <span class="text-gray-500">수화물</span>
          <span class="text-black">S사이즈 / 3개</span>
        </div>

        <!-- 수령금액 -->
        <div class="flex justify-between mb-2">
          <span class="text-gray-500">수령금액</span>
          <span class="text-red-500 font-semibold">3,000원</span>
        </div>

        <!-- 위치/주소 -->
        <div class="flex justify-between items-start mb-3">
          <span class="text-gray-500">위치/주소</span>
          대구 중구 국채보상로 2길 121번지
        </div>
        <div class="flex justify-end mb-3">
          <img
            src="/public/images/yr/delivery/home_icon.png"
            alt=""
            class="w-[20px] h-[20px] items-end" />
        </div>
      </div>
      <!-- 평가 및 리뷰 -->
      <div class="border-t pt-2 bg-gray-100 p-5 rounded-b-lg">
        <div class="text-gray-600 mb-1 pt-2">평가 및 리뷰</div>
        <div class="text-yellow-400 mb-1">⭐⭐⭐⭐☆</div>
        <p class="text-gray-700 text-sm">
          캐리어 안에 잘 깨지는 물건이 있어서 조심히 부탁드립니다.
        </p>
        <!-- 닫기 버튼 -->
        <div class="flex justify-end mt-3">
          <button
            onclick="document.getElementById('modal').classList.add('hidden')"
            class="bg-gray-600 text-white text-sm px-4 py-1 rounded">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back(); // 또는 router.go(-1)
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

/* 스크롤 영역 최적화 */
.min-h-0 {
  min-height: 0;
}

/* 컨테이너 최적화 */
.flex-1 {
  flex: 1 1 0%;
}

.flex-shrink-0 {
  flex-shrink: 0;
}
.h-full {
  height: 98%;
}
</style>
