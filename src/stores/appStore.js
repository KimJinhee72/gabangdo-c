// stores/appStore.js (Pinia 예시)
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    settings: {
      theme: 'dark',
      language: 'ko',
      // 기타 설정값들
    },
  }),
  actions: {
    saveSettingsToStorage() {
      // 예: settings 객체를 로컬스토리지에 저장
      localStorage.setItem('appSettings', JSON.stringify(this.settings));
    },
    loadSettingsFromStorage() {
      const stored = localStorage.getItem('appSettings');
      if (stored) {
        this.settings = JSON.parse(stored);
      }
    },
  },
});
