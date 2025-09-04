<template>
  <div class="flex items-center gap-2">
    <label v-if="label" class="text-sm text-gray-700">{{ label }}</label>
    <input
      type="date"
      v-model="localStartDate"
      @input="onStartInput"
      class="border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
    />
    <span class="dark:text-gray-500 bold">~</span>
    <input
      type="date"
      v-model="localEndDate"
      @input="onEndInput"
      class="border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  label: String,
  startDate: {
    type: String,
    default: () => {
      const today = new Date()
      return today.toISOString().split('T')[0] // "YYYY-MM-DD"
    },
  },
  endDate: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:startDate', 'update:endDate', 'change'])

const localStartDate = computed({
  get: () => props.startDate,
  set: (val) => emit('update:startDate', val),
})
const localEndDate = computed({
  get: () => props.endDate,
  set: (val) => emit('update:endDate', val),
})

const onStartInput = (e) => {
  emit('update:startDate', e.target.value)
  if (e.target.value && localEndDate.value) emit('change')
}
const onEndInput = (e) => {
  emit('update:endDate', e.target.value)
  if (e.target.value && localStartDate.value) emit('change')
}

// props 변경 감지 → change 자동 발생
watch([() => props.startDate, () => props.endDate], ([start, end]) => {
  if (start && end) emit('change')
})
</script>

