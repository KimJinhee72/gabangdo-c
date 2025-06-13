<template>
  <Header_subtypeAll v-if="!isWorkerPage" />
  <div class="wrap" :class="{ 'no-padding': isWorkerPage }">
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
  <Footer v-if="!isWorkerPage" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import Header_subtypeAll from "./components/Header_subtypeAll.vue"; // 공백 제거
import Footer from "./components/Footer.vue";

// 현재 라우트 정보
const route = useRoute();

// 반응형 window width 추적
const windowWidth = ref(window.innerWidth);
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// isWorkerPage: 특정 경로이거나, 모바일에서 로그인일 경우
const isWorkerPage = computed(() => {
  const isMobile = windowWidth.value <= 768;

  return (
    route.path.startsWith("/worker") || // /worker 하위
    route.path.startsWith("/admin") || // /worker 하위
    // (isMobile && route.path.startsWith("/login")) ||         // 모바일 + /login
    // route.path.startsWith("/signup") ||                      // /signup
    route.meta.hideLayout // 라우트 메타에서 숨김 처리
  );
});
</script>

<style lang="scss" scoped>
.wrap {
  &.no-padding .main {
    padding-top: 0 !important;
  }
}
</style>
