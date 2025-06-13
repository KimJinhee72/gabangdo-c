<!-- components/DateRangePicker.vue -->
<template>
  <div class="flex justify-start items-center gap-2">
    <label class="text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      type="date"
      v-model="localStart"
      class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
    <span>~</span>
    <input
      type="date"
      v-model="localEnd"
      class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  startDate: String,
  endDate: String,
})

const emit = defineEmits(['update:startDate', 'update:endDate'])

const localStart = computed({
  get: () => props.startDate,
  set: (val) => emit('update:startDate', val),
})

const localEnd = computed({
  get: () => props.endDate,
  set: (val) => emit('update:endDate', val),
})
</script>
