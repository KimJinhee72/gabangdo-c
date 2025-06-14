<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-8 dark:bg-gray-800">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md dark:bg-gray-600">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-8 dark:text-white">로그인</h2>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-white" 
            >이메일</label
          >
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required />
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-white"
            >비밀번호</label
          >
          <div class="relative">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="비밀번호를 입력하세요"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required />
            <button
              @click="togglePassword"
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <template v-if="showPassword">
                <i class="fas fa-eye-slash"></i>
              </template>
              <template v-else>
                <i class="fas fa-eye"></i>
              </template>
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-200">
          로그인
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const showPassword = ref(false);
const router = useRouter();
const handleLogin = () => {
  router.push("/admin/dashboard");
};
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>
