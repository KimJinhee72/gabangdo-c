<template>
  <div class="flex justify-between items-center">
    <div>
      <h3 class="text-gray-800 dark:text-white font-medium">{{ title }}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ description }}</p>
    </div>
    <label class="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        class="sr-only peer"
        :checked="modelValue"
        @change="onChange"
      />
      <div
        class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-500 transition-colors"
      ></div>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  modelValue: Boolean,
});
const emit = defineEmits(['update:modelValue', 'change']);

function onChange(event) {
  emit('update:modelValue', event.target.checked);
  emit('change', event.target.checked);
}
</script>
