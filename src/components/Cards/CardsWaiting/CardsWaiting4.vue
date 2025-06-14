<template>
  <div class="w-[350px] mx-auto flex flex-col gap-3 mb-2">
    <!-- 카드 1 -->
    <div
      class="card w-[350px] bg-white rounded-lg shadow flex items-center px-2 py-1 gap-1">
      <!-- 시간 -->
      <div class="time text-red-500 text-sm font-semibold w-[50px] ml-2 pr-3">
        12:40
      </div>

      <!-- 상세내용 -->
      <div class="detailContent flex flex-col gap-1 w-full">
        <!-- detail1: 상태 원 + 이름 -->
        <div class="detail1 flex items-center gap-2">
          <div class="circle w-2 h-2 rounded-full" :class="circleColor"></div>
          <div class="name text-[15px] font-semibold">장지혜</div>
        </div>

        <!-- detail2: 사이즈 -->
        <div class="detail2 text-[13px] text-blue-500 font-semibold">
          M사이즈 / 1개
        </div>

        <!-- detail3: 아이콘 + 주소 -->
        <div class="detail3 flex items-center text-xs text-black-700 gap-1">
          <div class="iconState">
            <img
              src="/public/images/yr/delivery/subway_icon.png"
              alt="집아이콘"
              class="w-[15px] h-4"/>
          </div>
          <p class="truncate pt-1 text-orange-500 text-[14px] font-semibold">대구역</p>
        </div>
      </div>

      <!-- 오른쪽버튼 -->
      <div class="rightButton flex items-center gap-3">
        <!-- 전화버튼 -->
        <button>
          <div class="callbuttuon w-[35px] h-[90px] pt-[30px]">
            <img src="/public/images/yr/delivery/phone_icon.png" alt="전화" />
          </div>
        </button>

        <!-- 시작 버튼 -->
        <button
          :disabled="isDisabled"
          @click="handleClick"
          class="w-[50px] h-[80px] rounded font-semibold flex items-center justify-center text-sm text-white"
          :class="buttonClass">
          <p>{{ buttonText }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const clickCount = ref(0);
const isDisabled = ref(false);

const buttonText = computed(() => {
  if (clickCount.value === 0) return "시작";
  if (clickCount.value === 1) return "완료";
  if (clickCount.value === 2) return "완료";
  return "완료";
});

const buttonClass = computed(() => {
  if (clickCount.value === 0) return "bg-red-500";
  if (clickCount.value === 1) return "bg-[#4F46E5]";
  return "bg-gray-400";
});

const circleColor = computed(() => {
  if (clickCount.value === 0) return "bg-green-500";
  if (clickCount.value === 1) return "bg-red-500";
  return "bg-gray-400";
});

function handleClick() {
  if (clickCount.value < 2) {
    clickCount.value++;
  }
  if (clickCount.value >= 2) {
    isDisabled.value = true;
  }
}
</script>
