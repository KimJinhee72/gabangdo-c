<!-- SearchSelect.vue -->
<template>
  <div class="flex justify-start items-center gap-2">
    <label     
    class="hidden text-sm font-medium text-gray-700 ">{{ label }}</label>
    <select
      v-model="localValue"
      @change="$emit('change', localValue)"
      class="p-2 rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value" 
      >
        {{ option.label }}
      </option>
    </select>
  </div>
    
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  options: Array,
  modelValue: String,
})
const emit = defineEmits(['update:modelValue', 'change'])

const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
