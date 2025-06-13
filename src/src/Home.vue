<template>
  <div class="wrap">
    <!-- <Header /> -->
    <main class="main">
      <!-- PC 전용 콘텐츠 -->
      <!-- <Content1 v-if="!isMobile" /> -->
      <!-- 635이하 전용 콘텐츠 -->
      <!-- <Homeswiper1 v-if="isMobile"/> -->
      <Content0 />
      <Content2 />
      <Homeswiper2 />
      <Modal />
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

//  각종 컴포넌트 import
import Content0 from "@/views/b_main/Content0.vue";
import Content2 from "@/views/b_main/Content2.vue";
import Homeswiper2 from "./views/b_main/Homeswiper2.vue";
import Modal from "@/views/b_main/Modal.vue";

//  반응형 관련 상태
// - isMobile: 현재 화면이 모바일인지 여부 (true: 모바일 화면)
// - isMenuOpen: 현재 메뉴가 열려 있는지 여부 (여기선 모바일에서 true)
const isMobile = ref(window.innerWidth < 635);
//  창 크기 변경 시 실행되는 함수
const handleResize = () => {
  const width = window.innerWidth;

  // 화면 너비에 따라 모바일 여부와 메뉴 오픈 여부 업데이트
  isMobile.value = width < 635;
};

//  컴포넌트가 마운트될 때: 이벤트 등록 + 최초 한 번 실행
onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize(); // 초기 실행
});

//  컴포넌트가 언마운트될 때: 이벤트 제거 (메모리 누수 방지)
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

</script>

<style lang="scss" scoped>
.main {
  padding-bottom: 100px;
}
</style>
