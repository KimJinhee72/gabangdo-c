<template>
  <div class="w-[390px] bg-gray-900 min-h-screen flex justify-center py-3 m-auto">
    <div class="w-[350px] mx-auto">
      <!-- 헤더 -->
      <div class="flex justify-between items-center mb-4 mt-2">
        <div class="logo">
          <router-link to="/worker/ddashboard">
            <img src="/images/yr/delivery/logoL.png" alt="로고"
            class="w-15 h-5"/>
          </router-link>
        </div>
        <div class="flex gap-2">
          <router-link to="/worker/assigned-jobs">
            <img
              src="/images/yr/delivery/check_icon.png"
              alt="체크"
              class="w-5 h-5" />
          </router-link>
          <router-link to="/worker/assign">
            <img
              src="/images/yr/delivery/alert.png"
              alt="알림"
              class="w-5 h-5" />
          </router-link>
        </div>
      </div>
      <!-- 타이틀 -->
      <h2 class="text-[#279BF3] text-xl mt-7 mb-2 font-semibold">마이페이지</h2>

      <!-- 프로필 카드 -->
      <div class="bg-white rounded-lg shadow space-y-3 mb-2">
        <div
          class="flex justify-between items-center pl-4 pr-4 pt-1.5 pb-1.5 bg-gray-200 rounded-t-2xl rounded-b-none">
          <div class="flex items-center space-x-3">
            <img src="/images/yr/delivery/profile.png" alt="" />
            <div>
              <p class="font-semibold">이준호 기사님</p>
            </div>
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs mt-[1px]">
              <img src="/images/yr/delivery/level2.png" alt="" />
            </div>
          </div>
          <button
            onclick="document.getElementById('modal').style.display='flex'"
            class="text-[13px] text-[#279BF3] border border-[#279BF3] bg-white px-2 py-1 rounded-2xl font-semibold">
            등급확인
          </button>
        </div>
        <div class="text-sm px-4 pb-4">
          <p class="mb-2">
            <span class="font-medium text-gray-600 pr-6">연락처</span>
            010-1234-5789
          </p>
          <p>
            <span class="font-medium text-gray-600 pr-2">차량정보</span> 현대
            그랜저 72가34
          </p>
        </div>
      </div>

      <!-- 운반 가능 수화물 -->
      <div class="bg-white rounded-lg shadow">
        <div class="bg-white pr-4 pl-4 pb-[0.1px] pt-[11px] rounded-t-2xl rounded-b-none">
          <div class="flex justify-between items-center mb-3 border-b-[2px] border-gray-700">
            <p class="font-medium">운반 가능 수화물</p>
            <button>
              <div class="w-4 h-4">
                <!-- <img src="/images/yr/delivery/arrowL.png" alt="" /> -->
              </div>
            </button>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 pl-4 pr-4 pb-4 pt-2 mb-2">
          <button
            @click="toggleLuggage('소형')"
            :class="['luggage-btn flex items-center px-3 py-1 rounded-lg text-[15px]', isActive('소형') ? 'bg-green-500 text-white' : 'bg-gray-300 text-white']"
          >
            <img
              :src="isActive('소형') ? '/images/yr/delivery/check_white.png' : '/images/yr/delivery/cancel_white.png'"
              :class="['icon w-4', isActive('소형') ? 'h-5 mr-1' : 'h-4 mr-1 mt-[2.2px]']"
              alt="아이콘"
            />
            <span>소형</span>
          </button>

          <button
            @click="toggleLuggage('중형')"
            :class="['luggage-btn flex items-center px-3 py-1 rounded-lg text-[15px]', isActive('중형') ? 'bg-green-500 text-white' : 'bg-gray-300 text-white']"
          >
            <img
              :src="isActive('중형') ? '/images/yr/delivery/check_white.png' : '/images/yr/delivery/cancel_white.png'"
              :class="['icon w-4', isActive('중형') ? 'h-5 mr-1' : 'h-4 mr-1 mt-[2.2px]']"
              alt="아이콘"
            />
            <span>중형</span>
          </button>

          <button
            @click="toggleLuggage('대형')"
            :class="['luggage-btn flex items-center px-3 py-1 rounded-lg text-[15px]', isActive('대형') ? 'bg-green-500 text-white' : 'bg-gray-300 text-white']"
          >
            <img
              :src="isActive('대형') ? '/images/yr/delivery/check_white.png' : '/images/yr/delivery/cancel_white.png'"
              :class="['icon w-4', isActive('대형') ? 'h-5 mr-1' : 'h-4 mr-1 mt-[2.2px]']"
              alt="아이콘"
            />
            <span>대형</span>
          </button>

          <button
            @click="toggleLuggage('특대형')"
            :class="['luggage-btn flex items-center px-3 py-1 rounded-lg text-[15px]', isActive('특대형') ? 'bg-green-500 text-white' : 'bg-gray-300 text-white']"
          >
            <img
              :src="isActive('특대형') ? '/images/yr/delivery/check_white.png' : '/images/yr/delivery/cancel_white.png'"
              :class="['icon w-4', isActive('특대형') ? 'h-5 mr-1' : 'h-4 mr-1 mt-[2.2px]']"
              alt="아이콘"
            />
            <span>특대형</span>
          </button>
        </div>
      </div>


      <!-- 선호 지역 -->
      <div class="bg-white rounded-lg shadow px-4 py-3 mb-2">
        <div class="flex justify-between">
          <p class="font-medium mb-2">나의 선호 지역</p>
          <button>
            <!-- <img
              src="/images/yr/delivery/arrowL.png"
              class="w-4 h-4"
              alt="" /> -->
          </button>
        </div>
      <div class="flex gap-2 items-end justify-center">
        <button 
          @click="togglePreference('공항')"
          :class="[
            'rounded-lg px-[20px] py-[10px] text-sm font-semibold shadow border',
            preferenceState['공항']
              ? 'border-gray-400 text-gray-500 bg-white'
              : 'border-blue-400 text-blue-500 bg-white',
          ]"
        >
          공항
        </button>

        <button
          @click="togglePreference('기차역')"
          :class="[
            'rounded-lg px-[15px] py-[10px] text-sm font-semibold shadow border',
            preferenceState['기차역']
              ? 'border-gray-400 text-gray-500 bg-white'
              : 'border-orange-300 text-orange-500 bg-white',
          ]"
        >
          기차역
        </button>

        <button
          @click="togglePreference('숙소')"
          :class="[
            'rounded-lg px-[20px] py-[10px] text-sm font-semibold shadow border mr-[15px]',
            preferenceState['숙소']
              ? 'border-gray-400 text-gray-500 bg-white'
              : 'border-green-300 text-green-500 bg-white',
          ]"
        >
          숙소
        </button>
      </div>
      </div>

      <!-- 교육 이수 내역 -->
      <div class="bg-white rounded-lg shadow space-y-2 mb-2">
        <div class="flex justify-between pb-2 px-4 py-3">
          <p class="font-medium">교육 이수 내역</p>
          <button>
            <img
              src="/images/yr/delivery/arrowL.png"
              class="w-4 h-4"
              alt="" />
          </button>
        </div>
        <div class="flex gap-2 px-4 py-1">
          <div class="w-full h-3 bg-gray-200 rounded-full relative">
            <div
              class="absolute top-0 left-0 h-3 bg-orange-500 rounded-full w-full" />
          </div>
          <div class="text-right text-[15px] text-orange-600 font-semibold">
            100%
          </div>
        </div>
        <div class="text-sm text-black flex justify-end items-end pr-4">
          2025.05.15 완료
        </div>
        <div
          class="flex items-center justify-center gap-1 text-sm text-black bg-gray-200 rounded-b-lg py-1">
          <span>다음 교육 이수:</span>
          <span class="font-medium">2026.05.15</span>
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="flex justify-between">
        <button
          class="flex items-center justify-center gap-1 bg-[#868686] w-[170px] h-[40px] rounded-lg text-sm">
          <img
            class="w-4 h-4"
            src="/images/yr/delivery/setting.png"
            alt="" />
          <p class="text-white">설정</p>
        </button>
        <button
          class="w-[170px] h-[40px] bg-[#279BF3] text-white px-6 py-2 rounded-lg text-sm font-medium">
          고객센터
        </button>
      </div>
    </div>
  </div>

<!-- 모달 배경 -->
<div id="modal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" style="display: none;">
  <div class="w-[250px] bg-white rounded-xl shadow-lg overflow-hidden">
    <!-- 상단 헤더 -->
    <div class="bg-blue-500 text-white text-center py-2 text-sm font-semibold text-[18px]">
      등급별 분류
    </div>

    <!-- 등급 내용 -->
    <div class="w-[230px] mx-auto mt-4 space-y-4 text-[11px] text-gray-700 pl-[8px]">
      <!-- 등급 1 -->
      <div class="flex items-start gap-2">
        <img src="/images/yr/delivery/level1.png" alt="씨앗" class="w-12 h-10" />
        <div>
          <p class="font-semibold text-black text-[13px]">씨앗등급</p>
          <p>기사님들 중 상위 75 - 100% 이내</p>
        </div>
      </div>
      <!-- 등급 2 -->
      <div class="flex items-start gap-2">
        <img src="/images/yr/delivery/level2.png" alt="새싹" class="w-12 h-10" />
        <div>
          <p class="font-bold text-black text-[13px]">새싹등급</p>
          <p>기사님들 중 상위 50 - 80% 이내</p>
        </div>
      </div>
      <!-- 등급 3 -->
      <div class="flex items-start gap-2">
        <img src="/images/yr/delivery/level3.png" alt="꽃" class="w-12 h-10" />
        <div>
          <p class="font-bold text-black text-[13px]">새싹등급</p>
          <p>기사님들 중 상위 25 - 60% 이내</p>
        </div>
      </div>
      <!-- 등급 4 -->
      <div class="flex items-start gap-2">
        <img src="/images/yr/delivery/level4.png" alt="토마토" class="w-12 h-10" />
        <div>
          <p class="font-bold text-black text-[13px]">새싹등급</p>
          <p>기사님들 중 상위 0 - 25% 이내</p>
        </div>
      </div>
          <!-- 닫기 버튼 -->
    <div class="flex my-4 pl-[145px] pb-[10px]">
      <button
        onclick="document.getElementById('modal').style.display='none'"
        class="bg-gray-500 text-white text-sm px-6 py-1.5 rounded hover:bg-gray-600">
        닫기
      </button>
    </div>
    </div>


  </div>
</div>


</template>

<script>
  function toggleLuggage(btn) {
    const img = btn.querySelector('.icon');
    const isActive = btn.classList.contains('bg-green-500');

    if (isActive) {
      // 초록 ➜ 회색 + 엑스 아이콘
      btn.classList.remove('bg-green-500');
      btn.classList.add('bg-gray-300');
      img.src = '/images/yr/delivery/cancel_white.png';
      img.classList.remove('w-4', 'h-5');
      img.classList.add('w-4', 'h-4', 'mt-[2.2px]');
    } else {
      // 회색 ➜ 초록 + 체크 아이콘
      btn.classList.remove('bg-gray-300');
      btn.classList.add('bg-green-500');
      img.src = '/images/yr/delivery/check_white.png';
      img.classList.remove('h-4', 'mt-[2.2px]');
      img.classList.add('h-5');
    }
  }
export default {
  data() {
    return {
      selectedLuggage: [

      ],
      preferenceState: {
        공항: false,
        기차역: false,
        숙소: true,
      },
    };
  },
  methods: {
    toggleLuggage(size) {
      const idx = this.selectedLuggage.indexOf(size);
      if (idx === -1) {
        this.selectedLuggage.push(size);
      } else {
        this.selectedLuggage.splice(idx, 1);
      }
    },
    isActive(size) {
      return this.selectedLuggage.includes(size);
    },
    togglePreference(location) {
      this.preferenceState[location] = !this.preferenceState[location];
    },
  },
};


</script>
