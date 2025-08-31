<template>
  <div class="yh_wrap">
    <swiper
      :scrollbar="{
        hide: true,
      }"
      :slidesPerView="1"
      :spaceBetween="0"
      :centeredSlides="false"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="modules"
      @autoplayTimeLeft="onAutoplayTimeLeft"
      class="mySwiper">
      <swiper-slide style="width: 100%; margin-right: 0;"
        ><p>군위시장투어</p>
        <a
          href="https://www.daegucitytour.com/bbs/page.php?hid=tour_5_1"
          target="_blank"
          ><img
            src="/images/geen/1/KakaoTalk_20250410_194237551_02.jpg"
            alt="군위전통시장투어" /></a
      ></swiper-slide>
      <swiper-slide style="width: 100%; margin-right: 0;"
        ><p>현풍도깨비시장투어</p>
        <a
          href="https://www.daegucitytour.com/bbs/page.php?hid=tour_5_1"
          target="_blank"
          ><img
            src="/images/geen/1/KakaoTalk_20250410_194237551_03.jpg"
            alt="현풍전통시장투어" /></a
      ></swiper-slide>
      <swiper-slide style="width: 100%; margin-right: 0;"
        ><p>사시사철투어</p>
        <a
          href="https://www.daegucitytour.com/bbs/page.php?hid=tour_4"
          target="_blank"
          ><img
            src="/images/geen/1/KakaoTalk_20250410_194237551_04.jpg"
            alt="사시사철투어" /></a
      ></swiper-slide>
      <swiper-slide style="width: 100%; margin-right: 0;"
        ><p>낙동강투어</p>
        <a
          href="https://www.daegucitytour.com/bbs/page.php?hid=tour_3"
          target="_blank"
          ><img
            src="/images/geen/1/KakaoTalk_20250410_194237551_05.jpg"
            alt="낙동강투어" /></a
      ></swiper-slide>
      <swiper-slide style="width: 100%; margin-right: 0;"
        ><p>군위군돋보기투어</p>
        <a
          href="https://www.daegucitytour.com/bbs/page.php?hid=tour_2"
          target="_blank"
          ><img
            src="/images/geen/1/KakaoTalk_20250410_194237551_06.jpg"
            alt="군위군돋보기투어" /></a
      ></swiper-slide>
      <swiper-slide style="width: 100%; margin-right: 0;"
        ><p>팔공산투어</p>
        <a
          href="https://www.daegucitytour.com/bbs/page.php?hid=tour_1"
          target="_blank"
          ><img
            src="/images/geen/1/KakaoTalk_20250410_194237551_07.jpg"
            alt="팔공산투어" /></a
      ></swiper-slide>
      <swiper-slide style="width: 100%; margin-right: 0;"
        ><p>야경투어</p>
        <a href="https://www.daegucitytour.com/bbs/page.php?hid=tour_6"
          ><img
            src="/images/geen/1/KakaoTalk_20250410_194237551_01.jpg"
            alt="야경투어" /></a
      ></swiper-slide>
      <template #container-end>
        <div class="autoplay-progress">
          <svg viewBox="0 0 48 48" ref="progressCircle">
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref="progressContent"></span>
        </div>
      </template>
    </swiper>
  </div>
</template>

<script>
import { ref } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// import required modules
import { Autoplay, Pagination, Navigation, Scrollbar } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const progressCircle = ref(null);
    const progressContent = ref(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.value.style.setProperty("--progress", 1 - progress);
      progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return {
      onAutoplayTimeLeft,
      progressCircle,
      progressContent,
      modules: [Autoplay, Pagination, Navigation, Scrollbar],
    };
  },
};
</script>
<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/Main.scss" as *;
@use "@/assets/Variables.scss" as *;

.yh_wrap {
  width: 100%;
}

p {
  width: 100%;
  margin: 10px auto;
  font-family: $font-ownglyph;
  font-size: 25px;
  text-align: left;
  margin-left: 100px;
  color: $main-color;
}
.swiper{
  width: 100%;
}
.swiper-slide {
  width: 100% !important;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto !important;
  object-fit: cover;
  a {
    width: 100%;
    height: 100%;
    @media (max-width: 630px) {
      width: 100%;
    }
    img {
      width: 100% !important ;
      height: 100%;
      height: auto;
      object-fit: cover; // 또는 contain
      border-radius: $radius;
      margin-top: 20px;
      margin-bottom: 20px;
      margin-right: 0 !important;
    }
  }
}
.autoplay-progress {
  display: none;
}
:deep(.swiper-pagination) {
  display: none !important ;
}
:deep(.swiper-slide > img) {
  margin: 0 !important;
}
:deep(.swiper-button-prev) {
  color: #ee2b2b;
  top: var(--swiper-navigation-sides-offset, 80px);
  left: var(--swiper-navigation-sides-offset, 0px);
}

:deep(.swiper-button-prev::after) {
  font-size: 25px;
}
:deep(.swiper-button-next) {
  color: #ee2b2b;
    top: var(--swiper-navigation-sides-offset, 80px);
  right: var(--swiper-navigation-sides-offset, 0px);
}
:deep(.swiper-button-next::after) {
  font-size: 25px;
}
:deep(.swiper-scrollbar-drag) {
  background-color: #ee2b2b !important;
}
@media screen and (max-width: 1280px) {
  :deep(.swiper-button-prev) {
    left: var(--swiper-navigation-sides-offset, 50px);
  }
  :deep(.swiper-button-next) {
    right: var(--swiper-navigation-sides-offset, 50px);
  }
}
@media screen and (max-width: 890px) {
  :deep(.swiper-button-prev) {
    left: var(--swiper-navigation-sides-offset, 0px);
  }
  :deep(.swiper-button-next) {
    right: var(--swiper-navigation-sides-offset, 0px);
  }
}
@media screen and (max-width: 760px) {
  :deep(.swiper-button-prev) {
    display: none;
  }
  :deep(.swiper-button-next) {
    display: none;
  }
}
</style>
