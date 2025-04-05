<template>
  <div class="space-y-2">
    <label v-if="label" class="text-white text-sm">{{ label }} <span v-if="required" class="text-white">*</span></label>
    <div class="relative">
      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white opacity-60">
        <UIcon name="i-heroicons-map-pin" class="h-5 w-5" />
      </span>
      <input 
        v-model="inputValue" 
        type="text" 
        :placeholder="placeholder" 
        class="w-full bg-black border border-white/30 rounded-md py-2 pl-10 pr-3 text-white focus:border-white focus:outline-none"
        @input="handleInput"
        ref="inputRef"
      />
      <div v-if="suggestions.length > 0" class="absolute z-50 mt-1 w-full bg-black border border-white/30 rounded-md max-h-60 overflow-y-auto no-scrollbar">
        <div 
          v-for="(suggestion, index) in suggestions" 
          :key="index" 
          class="address-suggestion cursor-pointer text-white text-sm"
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGooglePlaces, type PlacePrediction } from '../composables/useGooglePlaces'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Destination'
  },
  placeholder: {
    type: String,
    default: 'Enter building, department, or area...'
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const inputValue = ref(props.modelValue)
const inputRef = ref<HTMLInputElement | null>(null)
const { addressSuggestions: suggestions, getPlacePredictions, isLoading } = useGooglePlaces()

// Keep input in sync with v-model
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

// Update model when input changes
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const handleInput = async () => {
  await getPlacePredictions(inputValue.value)
}

const selectSuggestion = (suggestion: PlacePrediction) => {
  inputValue.value = suggestion.description
  emit('update:modelValue', suggestion.description)
  emit('change', suggestion)
  suggestions.value = []
}
</script>

<style scoped>
.address-suggestion {
  background-color: #000000;
  color: white;
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.address-suggestion:hover {
  background-color: #777777;
}

/* Hide scrollbars but keep functionality */
.no-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style> 