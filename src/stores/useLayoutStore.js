// stores/layoutStore.js
import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    isMenuOpen: false,
  }),
  actions: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  },
  persist: true // 👈 상태가 페이지 이동해도 유지되게
});
