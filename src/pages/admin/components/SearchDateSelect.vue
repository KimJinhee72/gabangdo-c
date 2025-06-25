<template>
  <div class="flex items-center gap-2">
    <label v-if="label" class="text-sm text-gray-700">{{ label }}</label>
    <input
      type="date"
      v-model="localStartDate"
      @change="emitChange"
      class="border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
    />
    <span>~</span>
    <input
      type="date"
      v-model="localEndDate"
      @change="emitChange"
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

const emitChange = () => {
  emit('change')
}
</script>

<style scoped>
</style>
