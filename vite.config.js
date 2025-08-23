// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";

// vueDevTools 플러그인은 개발 모드에서만 활성화
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ command, mode }) => ({
  plugins: [
    vue(),
    // 개발 모드에서만 DevTools 활성화
    command === "serve" ? vueDevTools() : null,
    createHtmlPlugin({})
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  define: {
    __VUE_I18N_FULL_INSTALL__: true,   // i18n 전체 설치
    __VUE_I18N_LEGACY_API__: false,    // Composition API만 사용
    __INTLIFY_PROD_DEVTOOLS__: command === "serve", // 개발 모드에서만 i18n DevTools 활성화
  },

  server: {
    open: true, // 개발 서버 시작 시 브라우저 자동 열기
    port: 5173, // 원하는 포트 설정
  },
}));
