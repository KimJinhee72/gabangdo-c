
import "/src/assets/Main.scss";
import "/src/assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import i18n from "./i18n"; // ✅ 이걸 그대로 사용

// 사용자가 저장한 언어 가져오기
const savedLang = localStorage.getItem("lang") || "ko";
i18n.global.locale = savedLang;

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n); // ✅ 중복 생성 없이 그대로 사용

app.mount("#app");

if (import.meta.env.PROD) {
  app.config.devtools = false;
}