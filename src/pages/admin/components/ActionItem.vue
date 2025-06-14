<template>
  <div class="flex justify-between items-center">
    <div>
      <h3 class="text-gray-800 dark:text-white font-medium">{{ title }}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ description }}</p>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
});
</script>
