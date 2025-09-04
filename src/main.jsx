// main.js
import "/src/assets/Main.scss";
import "/src/assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import i18n from "./i18n"; // 기존 i18n 그대로 사용

// Vue 앱 생성
const app = createApp(App);

// Pinia 상태 관리
app.use(createPinia());

// 라우터
app.use(router);

// i18n
app.use(i18n);

// 개발 환경에서만 DevTools 활성화
if (import.meta.env.DEV) {
  app.config.devtools = true;
}
// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// 앱 마운트
app.mount("#app");
