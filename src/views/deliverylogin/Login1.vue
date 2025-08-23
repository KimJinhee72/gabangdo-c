<template>
  <div class="w-[400px] mx-auto bg-white rounded-2xl shadow-md">
    <!-- 로고 -->
    <div class="text-center py-6 text-3xl font-extrabold text-green-600">
      NAVER
    </div>

    <!-- 탭 버튼 -->
    <div class="flex border-b">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="[
          'flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1',
          activeTab === tab.value
            ? 'text-green-600 border-b-2 border-green-600 bg-white'
            : 'text-gray-500 bg-gray-50 hover:text-gray-700'
        ]"
      >
        <span v-html="tab.icon"></span>
        {{ tab.label }}
      </button>
    </div>

    <!-- 탭 콘텐츠 -->
    <div class="p-6">
      <!-- ID/전화번호 -->
      <div v-if="activeTab === 'id'">
        <input
          type="text"
          placeholder="아이디 또는 전화번호"
          class="w-full border rounded-md p-3 mb-3 focus:outline-green-500"
        />
        <input
          type="password"
          placeholder="비밀번호"
          class="w-full border rounded-md p-3 mb-4 focus:outline-green-500"
        />

        <div class="flex items-center justify-between text-xs mb-4">
          <label class="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" class="accent-green-600" />
            로그인 상태 유지
          </label>
          <div class="flex items-center gap-1 text-gray-600">
            <span>IP보안</span>
            <span class="text-green-600 font-bold">ON</span>
          </div>
        </div>

        <button
          class="w-full bg-gray-400 text-white py-3 rounded-md font-semibold"
        >
          로그인
        </button>

        <p class="text-xs text-gray-500 mt-2">
          지문·얼굴 인증을 설정했다면
        </p>
        <button
          class="w-full mt-3 border border-green-600 text-green-600 py-3 rounded-md font-semibold hover:bg-green-50"
        >
          패스키 로그인
        </button>
      </div>

      <!-- 일회용 번호 -->
      <div v-if="activeTab === 'otp'" class="text-center">
        <p class="text-sm text-gray-700 mb-2">
          네이버앱의 메뉴 > 설정⚙ > 로그인 아이디 관리 > 더보기! >
          <span class="text-green-600 font-semibold">일회용 로그인 번호</span>에 보이는 번호를 입력해 주세요.
        </p>

        <input
          type="text"
          placeholder="번호를 입력하세요."
          class="w-full border rounded-md p-3 mb-4 focus:outline-green-500"
        />

        <button
          class="w-full bg-gray-400 text-white py-3 rounded-md font-semibold"
        >
          로그인
        </button>
      </div>

      <!-- QR 코드 -->
      <div v-if="activeTab === 'qr'" class="text-center">
        <div class="w-40 h-40 mx-auto border rounded-md flex items-center justify-center">
          <span class="text-gray-400">QR</span>
        </div>
        <p class="mt-3 text-sm text-gray-600">
          남은시간 <span class="text-green-600 font-semibold">02분 54초</span>
        </p>
        <p class="mt-3 text-sm text-gray-500">
          공용 네트워크, 공용 PC라면 안전을 위해 <br />
          QR코드로 로그인 해주세요.
        </p>
        <p class="mt-2 text-xs text-gray-500">
          네이버 앱 <span class="text-green-600">렌즈</span>를 눌러 QR코드를 스캔하여<br />
          보이는 숫자 중 <span class="text-green-600 font-bold">58</span>을 선택하면 로그인 됩니다.
        </p>
      </div>
    </div>

    <!-- 하단 링크 -->
    <div class="flex justify-center gap-4 text-sm text-gray-500 border-t py-3">
      <a href="#">비밀번호 찾기</a>
      <a href="#">아이디 찾기</a>
      <a href="#">회원가입</a>
    </div>

    <!-- 광고 배너 -->
    <div class="border-t">
      <img
        src="https://ssl.pstatic.net/melona/libs/1436/1436863/8df1e0d79b0b9ac2a91e_20230317170953161.jpg"
        alt="광고 배너"
        class="w-full rounded-b-2xl"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref("id");

const tabs = [
  {
    label: "ID/전화번호",
    value: "id",
    icon: "📱", // 실제 프로젝트에서는 SVG 아이콘 사용 추천
  },
  {
    label: "일회용 번호",
    value: "otp",
    icon: "🔑",
  },
  {
    label: "QR코드",
    value: "qr",
    icon: "📷",
  },
];
</script>
