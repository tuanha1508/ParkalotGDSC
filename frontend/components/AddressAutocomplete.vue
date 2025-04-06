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
        ref="inputRef"
        @input="onInputChange"
      />
      
      <!-- Loading indicator -->
      <div v-if="isLoading" class="absolute right-3 top-1/2 transform -translate-y-1/2">
        <div class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
      </div>
      
      <!-- Search results dropdown -->
      <div v-if="suggestions.length > 0" class="absolute z-50 mt-1 w-full bg-black border border-white/30 rounded-md max-h-60 overflow-y-auto no-scrollbar">
        <div 
          v-for="(suggestion, index) in suggestions" 
          :key="index" 
          class="address-suggestion cursor-pointer text-white text-sm"
          @click="selectSuggestion(suggestion)"
        >
          <div class="flex flex-col">
            <span class="font-medium text-ellipsis overflow-hidden">{{ suggestion.description }}</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
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
    default: 'Search for a building, landmark or business...'
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const inputValue = ref(props.modelValue)
const inputRef = ref<HTMLInputElement | null>(null)
const { predictions, getPlacePredictions, getPlaceDetails, isLoading, error } = useGooglePlaces()
const hasSearched = ref(false)
const debounceTimeout = ref<number | null>(null)

// Use the predictions directly
const suggestions = predictions

// Keep input in sync with v-model
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

// Update model when input changes
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// Handle input changes with debouncing
const onInputChange = () => {
  // Cancel previous timeout
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value)
  }
  
  // Set a new timeout to search after a short delay (250ms)
  debounceTimeout.value = setTimeout(() => {
    performSearch()
  }, 250)
}

// Perform the actual search
const performSearch = async () => {
  if (inputValue.value && inputValue.value.length >= 2) {
    console.log('Searching for:', inputValue.value)
    
    try {
      hasSearched.value = true
      await getPlacePredictions(inputValue.value)
      console.log('Search complete, found', suggestions.value.length, 'results')
    } catch (error) {
      console.error('Error during search:', error)
    }
  } else {
    predictions.value = []
    hasSearched.value = false
  }
}

const selectSuggestion = async (suggestion: PlacePrediction) => {
  // Update the input value with the description
  inputValue.value = suggestion.description
  emit('update:modelValue', suggestion.description)
  
  // Try to get detailed place information
  try {
    // Get the place_id from the suggestion
    const placeId = suggestion.place_id
    
    // Get detailed place information
    const placeDetails = await getPlaceDetails(placeId)
    
    // Emit both the suggestion and the place details if available
    emit('change', {
      ...suggestion,
      details: placeDetails
    })
  } catch (error) {
    console.error('Error getting place details:', error)
    // Fall back to just emitting the suggestion
    emit('change', suggestion)
  }
  
  // Clear suggestions
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