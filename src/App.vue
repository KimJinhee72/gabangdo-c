<template>
  <Header_subtypeAll v-if="!isWorkerPage" />
  <div class="wrap" :class="{ 'no-padding': isWorkerPage }">
    <main class="main">
      <router-view/>
    </main>
  </div>
  <Footer v-if="!isWorkerPage" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useI18n } from 'vue-i18n';
import { useRoute } from "vue-router";
import Header_subtypeAll from "./components/Header_subtypeAll.vue";
import Footer from "./components/Footer.vue";

// i18n 언어 설정
const { locale } = useI18n();

// window width 감지
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);

const handleResize = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener("resize", handleResize);

    // 언어 설정
    const saved = localStorage.getItem('language');
    if (saved) {
      locale.value = saved;
    }
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener("resize", handleResize);
  }
});

const route = useRoute();
const isWorkerPage = computed(() => {
  const isMobile = windowWidth.value <= 768;
  return (
    route.path.startsWith("/worker") ||
    route.path.startsWith("/admin") ||
    route.path.startsWith("/admin") ||
    route.path.startsWith("/login") ||
    route.path.startsWith("/signup") ||
    route.meta.hideLayout
  );
});
</script>
<!-- DevTools용 이름 지정 -->
<script>
export default {
  name: "App", // ✅ DevTools에서 App.vue 이름 표시
};
</script>

<style lang="scss" scoped>
.wrap {
  &.no-padding .main {
    padding-top: 0 !important;
  }
}
</style>
