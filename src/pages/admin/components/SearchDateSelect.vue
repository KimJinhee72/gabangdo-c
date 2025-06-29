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
import { computed } from 'vue'

const props = defineProps({
  label: String,
  startDate: String,
  endDate: String,
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

// 변경 감지 시 두 값이 모두 존재하면 change 발생
const onStartInput = (e) => {
  emit('update:startDate', e.target.value)
  if (e.target.value && props.endDate) emit('change')
}
const onEndInput = (e) => {
  emit('update:endDate', e.target.value)
  if (e.target.value && props.startDate) emit('change')
}
</script>
