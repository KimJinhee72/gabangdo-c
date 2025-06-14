<template>
  <div class="dark:bg-gray-900">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-8">
      {{ t("settings.title") }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- 알림 설정 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div
          class="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600 flex items-center gap-4">
          <i class="fas fa-bell text-xl text-blue-500"></i>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
            {{ t("settings.notifications.title") }}
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.notifications.email.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.notifications.email.description") }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.emailNotifications" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500">
              </div>
            </label>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.notifications.push.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.notifications.push.description") }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.pushNotifications" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500">
              </div>
            </label>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.notifications.cancel.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.notifications.cancel.description") }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.cancelNotifications" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500">
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- 테마 설정 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div
          class="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600 flex items-center gap-4">
          <i class="fas fa-palette text-xl text-blue-500"></i>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
            {{ t("settings.theme.title") }}
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.theme.darkMode.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.theme.darkMode.description") }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.darkMode" @change="toggleDarkMode" class="sr-only peer" />
              <div class="w-11 h-6
           bg-gray-200 peer-checked:bg-blue-600
           dark:bg-gray-700 dark:peer-checked:bg-blue-500
           rounded-full peer
           after:content-[''] after:absolute after:top-[2px] after:left-[2px]
           after:w-5 after:h-5 after:rounded-full
           after:bg-white after:border after:border-gray-300
           peer-checked:after:translate-x-full peer-checked:after:border-white
           after:transition-all
           dark:after:border-gray-600"></div>
            </label>
          </div>

          <div class="space-y-4">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.theme.colorTheme.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.theme.colorTheme.description") }}
              </p>
            </div>
            <div class="flex gap-3">
              <div v-for="color in colorThemes" :key="color.value"
                class="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110" :class="{
                  'ring-2 ring-offset-2 ring-gray-800 dark:ring-white':
                    settings.colorTheme === color.value,
                }" :style="{ backgroundColor: color.value }" @click="updateColorTheme(color.value)"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 시스템 설정 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div
          class="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600 flex items-center gap-4">
          <i class="fas fa-cog text-xl text-blue-500"></i>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
            {{ t("settings.system.title") }}
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.system.autoSave.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.system.autoSave.description") }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.autoSave" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
              </div>
            </label>
          </div>

          <div class="space-y-2">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.system.language.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.system.language.description") }}
              </p>
            </div>
            <select v-model="settings.language" @change="updateLanguage"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 데이터 관리 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div
          class="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600 flex items-center gap-4">
          <i class="fas fa-database text-xl text-blue-500"></i>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
            {{ t("settings.data.title") }}
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.data.backup.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.data.backup.description") }}
              </p>
            </div>
            <button @click="backupData"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              {{ t("settings.data.backup.button") }}
            </button>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.data.restore.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.data.restore.description") }}
              </p>
            </div>
            <button @click="restoreData"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              {{ t("settings.data.restore.button") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button @click="saveSettings"
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        {{ t("settings.saveButton") }}
      </button>
    </div>

    <!-- 토스트 메시지 -->
    <div v-if="showToast"
      class="fixed bottom-8 right-8 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-slide-in">
      {{ t("settings.savedMessage") }}
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/useAppStore";

// i18n 설정
const { t, locale } = useI18n();

// 토스트 메시지 표시 여부
const showToast = ref(false);

// Pinia 스토어
const appStore = useAppStore();
const { isDarkMode, settings } = storeToRefs(appStore);

// 색상 테마 목록
const colorThemes = [
  { value: "#3498db", label: "파란색" },
  { value: "#2ecc71", label: "초록색" },
  { value: "#e74c3c", label: "빨간색" },
  { value: "#f1c40f", label: "노란색" },
  { value: "#9b59b6", label: "보라색" },
];

// ✅ 다크모드 클래스 HTML에 적용

watch(isDarkMode, (enabled) => {
  if (enabled) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, { immediate: true });

// 다크모드 토글
const toggleDarkMode = () => {
  appStore.toggleDarkMode();
};

// 색상 테마 업데이트
const updateColorTheme = (color) => {
  appStore.updateSettings({ colorTheme: color });
};

// 언어 변경 반영
const updateLanguage = () => {
  locale.value = settings.value.language;
};

// 언어 변경 감지
watch(() => settings.value.language, (newLang) => {
  locale.value = newLang;
});

// 데이터 백업
const backupData = () => {
  const data = {
    settings: settings.value,
    reservations: appStore.reservations,
    workers: appStore.workers,
    customers: appStore.customers,
    transactions: appStore.transactions,
    exportDate: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `backup-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  a.href = url;
  a.download = `admin-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// 데이터 복원
const restoreData = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      appStore.restoreData(parsed); // Pinia 스토어에 복원용 메서드 추가 필요
    } catch (error) {
      alert("잘못된 파일입니다.");
    }
  };

  input.click();
};

// 설정 저장
const saveSettings = () => {
  appStore.saveSettingsToStorage(); // 또는 적절한 저장 메서드
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
