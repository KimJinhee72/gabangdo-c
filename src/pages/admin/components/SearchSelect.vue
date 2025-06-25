<template>
  <div class="flex items-center gap-2">

    <select
      v-model="localValue"
      @change="$emit('change', localValue)"
      :class="['p-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500', $attrs.class]"
      v-bind="filteredAttrs"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAttrs } from 'vue'

const props = defineProps({
  label: String,
  options: {
    type: Array,
    required: true,
  },
  modelValue: [String, Number],
})
const emit = defineEmits(['update:modelValue', 'change'])

const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const attrs = useAttrs()
const filteredAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})
</script>

<style scoped>
</style>
