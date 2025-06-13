<template>
  <div class="w-[390px] m-auto h-screen flex flex-col">
    <!-- 상단 상태표시 -->
    <div class="bg-gray-900 text-white p-4 flex-shrink-0">
      <!-- 이너 -->
      <div class="w-[350px] mx-auto">
        <!-- 헤더 -->
        <div class="flex justify-between items-center mb-4">
          <button>
            <router-link to="/worker/ddashboard">
              <div class="logo">
                <img
                  src="/public/images/yr/delivery/logoL.png"
                  alt="로고"
                  class="w-15 h-5" />
              </div>
            </router-link>
          </button>
          <div class="flex gap-2">
            <router-link to="/worker/assigned-jobs">
              <button>
                <img
                  src="/public/images/yr/delivery/check_icon.png"
                  alt="체크"
                  class="w-[20px] h-[20px] mt-[3px]" />
              </button>
            </router-link>
            <router-link to="/worker/assign">
              <img
                src="/public/images/yr/delivery/alert.png"
                alt="알림"
                class="w-[20px] h-[20px] mt-[3px]" />
            </router-link>
          </div>
        </div>

        <!-- 프로필 -->
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-full mr-3">
            <img
              src="/public/images/yr/delivery/profile.png"
              alt="프로필"
              class="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <router-link to="/worker/profile">
              <p class="text-lg font-semibold underline underline-offset-4">
                홍길동 기사님
              </p>
            </router-link>
            <p class="text-sm text-gray-300">오늘도 안전 운행 하세요!</p>
          </div>
        </div>

        <!-- 작업 대시보드 -->
        <div class="bg-white rounded-xl text-black p-4 space-y-3">
          <div class="flex justify-between text-sm">
            <span>총 작업수</span>
            <span>5 / 15건</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>완료율</span>
            <span class="text-blue-500">33.3%</span>
          </div>
          <!-- 진행 바 -->
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-orange-400" style="width: 33.3%"></div>
          </div>
          <!-- 수령금액 -->
          <div class="flex justify-between text-sm font-semibold">
            <span>수령금액</span>
            <span class="text-red-500">40,000원</span>
          </div>
        </div>

        <!-- 지도 보기 / 닫기 버튼 -->
        <button
          @click="showMap = !showMap"
          :class="[
            'w-full text-white text-sm mt-3 py-2 rounded-lg flex justify-center items-center gap-1',
            showMap
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-500 hover:bg-blue-600',
          ]">
          <!-- <img
            src="/public/images/yr/delivery/map_icon.png"
            alt="지도 아이콘"
            class="w-4 h-4" /> -->
          {{ showMap ? "지도 닫기" : "지도 보기" }}
        </button>
      </div>
    </div>

    <KakaoMap v-if="showMap" class="flex-shrink-0" />

    <!-- 버튼필터 -->
    <div class="bg-gray-900 text-white py-4 flex-shrink-0">
      <!-- 내부 콘텐츠 wrapper (350px 고정) -->
      <div class="w-[350px] mx-auto">
        <!-- 상단 상태 탭 -->
        <!-- 상태 탭 -->
        <div
          class="flex justify-between text-sm font-semibold text-gray-400 mb-4">
          <button
            v-for="status in statusTabs"
            :key="status"
            @click="selectedStatus = status"
            :class="[
              'pb-1',
              selectedStatus === status
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'border-b-2 border-gray-900 mt-1',
            ]">
            {{ status }}
          </button>
        </div>

        <!-- 위치 탭 -->
        <div class="flex gap-1 justify-end items-center">
          <!-- 위치 버튼들 -->
          <div class="flex gap-2">
            <button
              v-for="(location, index) in locationTabs"
              :key="location"
              @click="selectedLocation = location"
              :class="[
                'rounded-lg w-[80px] py-[10px] text-sm font-semibold shadow border',
                index === 0
                  ? selectedLocation === location
                    ? 'border-blue-400 text-blue-500 bg-white'
                    : 'border-gray-300 text-gray-500 bg-white'
                  : index === 1
                  ? selectedLocation === location
                    ? 'border-orange-400 text-orange-500 bg-white'
                    : 'border-gray-300 text-gray-500 bg-white'
                  : selectedLocation === location
                  ? 'border-green-400 text-green-500 bg-white'
                  : 'border-gray-300 text-gray-500 bg-white',
              ]">
              {{ location }}
            </button>
          </div>

          <!-- 추가된 버튼 2개 -->
          <div class="flex gap-2 ml-4">
            <div class="relative inline-block">
              <!-- 시계 아이콘 버튼 -->
              <button
                class="w-8 h-8 rounded-lg bg-green-500 text-sm flex items-center justify-center"
                @click="showPopup = !showPopup">
                <img
                  src="/public/images/yr/delivery/clock_icon.png"
                  alt="clock"
                  class="p-1" />
              </button>

              <!-- 팝업 메뉴 -->
              <div
                v-if="showPopup"
                class="absolute top-full left-0 mt-1 w-[60px] bg-white border rounded shadow z-10 text-center text-black">
                <button
                  v-for="(time, index) in timeOptions"
                  :key="index"
                  @click="selectedTime = time"
                  :class="[
                    'w-full text-xs py-[4px]',
                    selectedTime === time
                      ? 'bg-blue-100 font-semibold text-blue-600'
                      : '',
                  ]">
                  {{ time }}
                </button>
              </div>
            </div>
            <button
              @click="isAsc = !isAsc"
              class="w-8 h-8 rounded-lg bg-blue-500 text-sm flex items-center justify-center p-0.5">
              <img
                :src="
                  isAsc
                    ? '/public/images/yr/delivery/asc_icon.png'
                    : '/public/images/yr/delivery/desc_icon.png'
                "
                alt="정렬 아이콘" />
            </button>
          </div>
        </div>

        <!-- 시간, 오름차순 탭 -->
      </div>
    </div>

    <!-- 카드 내용 -->
    <div class="bg-gray-900 text-sm flex-1 overflow-hidden">
      <div class="h-full overflow-y-auto custom-scrollbar">
        <!-- 내부 콘텐츠 wrapper (350px 고정) -->
        <div class="w-[350px] mx-auto py-4">
          <!-- 1번째줄 탭버튼만 눌렀을때 -->
          <CardWaiting v-if="selectedStatus === '전체'" />
          <CardWaiting v-if="selectedStatus === '대기중'" />
          <CardProceed v-if="selectedStatus === '진행중'" />
          <CardComplete v-if="selectedStatus === '완료'" />

          <!-- 1번째 2번째줄 혼합 -->
          <!-- 전체 -->
          <LocationAirportWaiting
            v-if="selectedStatus === '전체' && selectedLocation === '공항'" />
          <LocationSubwayWaiting
            v-if="selectedStatus === '전체' && selectedLocation === '기차역'" />
          <LocationHomeWaiting
            v-if="selectedStatus === '전체' && selectedLocation === '숙소'" />

          <!-- 대기중 -->
          <LocationAirportWaiting
            v-if="selectedStatus === '대기중' && selectedLocation === '공항'" />
          <LocationSubwayWaiting
            v-if="
              selectedStatus === '대기중' && selectedLocation === '기차역'
            " />
          <LocationHomeWaiting
            v-if="selectedStatus === '대기중' && selectedLocation === '숙소'" />

          <!-- 진행중 -->
          <LocationAirportProceed
            v-if="selectedStatus === '진행중' && selectedLocation === '공항'" />
          <LocationSubwayProceed
            v-if="
              selectedStatus === '진행중' && selectedLocation === '기차역'
            " />
          <LocationHomeProceed
            v-if="selectedStatus === '진행중' && selectedLocation === '숙소'" />

          <!-- 완료 -->
          <LocationAirportComplete
            v-if="selectedStatus === '완료' && selectedLocation === '공항'" />
          <LocationSubwayComplete
            v-if="selectedStatus === '완료' && selectedLocation === '기차역'" />
          <LocationHomeComplete
            v-if="selectedStatus === '완료' && selectedLocation === '숙소'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import KakaoMap from "@/components/KakaoMap.vue";
import { ref, computed } from "vue";

// 카드컴포넌트
// 대기중
import CardWaiting from "@/components/CardWaiting.vue";

// 진행중
import CardProceed from "@/components/CardProceed.vue";

// 완료
import CardComplete from "@/components/CardComplete.vue";

// 2번째줄 포함
// 대기중
// 공항
import LocationAirportWaiting from "@/components/Locations/Waiting/LocationAirportWaiting.vue";

const showMap = ref(false);
// 탭 상태값
const statusTabs = ["전체", "대기중", "진행중", "완료"];
const locationTabs = ["공항", "기차역", "숙소"];

const selectedStatus = ref("전체");
const selectedLocation = ref("공항");

// 필터링된 데이터
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const statusMatch =
      selectedStatus.value === "전체" || item.status === selectedStatus.value;
    const locationMatch = item.location === selectedLocation.value;
    return statusMatch && locationMatch;
  });
});

// 시작버튼 클릭시 변화
const clickCount = ref(0);
const buttonText = ref("시작");
const buttonColor = ref("bg-red-500");

const handleClick = () => {
  clickCount.value++;

  if (clickCount.value === 1) {
    buttonColor.value = "bg-purple-500";
    buttonText.value = "완료";
  } else if (clickCount.value === 2) {
    buttonColor.value = "bg-gray-400";
    // 텍스트는 그대로 '완료'
  }
};

// 시계버튼 아이콘

const showPopup = ref(false);
const selectedTime = ref(null);
const timeOptions = ["09:11", "11:13", "13:15", "15:17", "17:19"];

// 오름내림차순 아이콘 클릭시 변경
const isAsc = ref(true); // true면 asc, false면 desc
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

/* 스크롤바가 보이지 않을 때도 스크롤 가능하도록 */
.custom-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.custom-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 터치 디바이스에서의 스크롤 최적화 */
.custom-scrollbar {
  -webkit-overflow-scrolling: touch;
}
.h-full {
  height: 98%;
}
</style>
