<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
    <div class="flex items-center mb-4 gap-2">
      <i :class="['fas', icon, 'text-xl text-blue-500']" />
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
        {{ title }}
      </h2>
    </div>
    <div class="space-y-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  icon: String,
});
</script>
