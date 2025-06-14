<template>
  <div class="w-[350px] mx-auto flex flex-col gap-3 mb-2">
    <!-- 카드 1 -->
    <div
      class="card w-[350px] bg-white rounded-lg shadow flex items-center px-2 py-1 gap-1">
      <!-- 시간 -->
      <div class="time text-red-500 text-sm font-semibold w-[50px] ml-2 pr-3">
        14:50
      </div>

      <!-- 상세내용 -->
      <div class="detailContent flex flex-col gap-1 w-full">
        <!-- detail1: 상태 원 + 이름 -->
        <div class="detail1 flex items-center gap-2">
           <div class="circle w-2 h-2 rounded-full bg-gray-500"></div>
          <div class="name text-[15px] font-semibold">노승준</div>
        </div>

        <!-- detail2: 사이즈 -->
        <div class="detail2 text-[13px] text-blue-500 font-semibold">
          S사이즈 / 2개
        </div>

        <!-- detail3: 아이콘 + 주소 -->
        <div class="detail3 flex items-center text-xs text-black-700 gap-1">
          <div class="iconState">
            <img
              src="/public/images/yr/delivery/subway_icon.png"
              alt="집아이콘"
              class="w-4 h-4 text-green-600" />
          </div>
          <p class="truncate pt-1">대구 광역시 북구 사수동 내곡로90</p>
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
          class="w-[50px] h-[80px] rounded font-semibold flex items-center justify-center text-sm text-white bg-gray-500">
          <p>완료</p>
        </button>
      </div>
    </div>


  </div>
</template>

