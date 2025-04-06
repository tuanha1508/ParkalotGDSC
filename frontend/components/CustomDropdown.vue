<template>
  <div class="space-y-2 overflow-visible">
    <label v-if="label" class="text-white text-sm">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative overflow-visible" ref="containerRef">
      <div 
        @click="toggle" 
        class="dropdown-trigger appearance-none w-full bg-black border border-white/30 rounded-md py-2 px-3 text-white focus:border-white cursor-pointer flex justify-between items-center"
        :class="{'border-red-500': required && !modelValue}"
        ref="triggerRef"
      >
        <span>{{ displayValue }}</span>
        <span class="flex items-center justify-center">
          <UIcon name="i-heroicons-chevron-down" class="h-5 w-5 text-white opacity-60" />
        </span>
      </div>
      
      <transition name="fade">
        <div 
          v-if="isOpen" 
          class="absolute z-[9999] mt-1 w-full bg-black border border-white/30 rounded-md shadow-lg dropdown-options"
        >
          <div 
            v-for="option in options" 
            :key="option.value"
            @click="select(option.value)"
            class="px-3 py-2 cursor-pointer text-white text-sm whitespace-nowrap"
            :class="{'bg-gray-400': modelValue === option.value, 'hover:bg-gray-500': modelValue !== option.value}"
          >
            {{ option.label }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDropdown } from '../composables/useDropdown'
import type { ParkingOption } from '../composables/useParkingData'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array as () => ParkingOption[],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option...'
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const containerRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const { isOpen, toggle, close } = useDropdown()

// Auto-close on model changes
watch(() => props.modelValue, () => {
  close()
})

const displayValue = computed(() => {
  if (!props.modelValue) {
    return props.placeholder
  }
  const option = props.options.find(opt => opt.value === props.modelValue)
  return option ? option.label : props.placeholder
})

const select = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
  close()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dropdown-options {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
</style> 