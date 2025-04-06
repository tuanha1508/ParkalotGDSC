<template>
  <div class="lg:col-span-2">
    <div class="border border-white/30 rounded-lg overflow-visible">
      <!-- Card Header -->
      <div class="border-b border-white/20 px-6 py-4">
        <h3 class="text-xl font-semibold text-white">Your Destination</h3>
      </div>
      
      <!-- Card Content -->
      <div class="px-6 py-6 space-y-6 overflow-visible">
        <p class="text-white">Please let us know where you're planning to go so we can suggest the best parking options.</p>
        
        <!-- Destination Field -->
        <AddressAutocomplete 
          :modelValue="localDestination" 
          @update:modelValue="updateDestination"
          :required="true"
          @change="handleAddressChange"
        />
        
        <!-- Vehicle Type -->
        <CustomDropdown
          :modelValue="localVehicleType"
          @update:modelValue="updateVehicleType"
          :options="vehicleOptions"
          label="Permit Type"
          placeholder="Select permit type..."
        />
        
        <!-- Estimated Duration -->
        <CustomDropdown
          :modelValue="localDuration"
          @update:modelValue="updateDuration"
          :options="durationOptions"
          label="Estimated Duration"
          placeholder="Select duration..."
        />
        
        <!-- Button -->
        <div class="flex justify-end">
          <button 
            @click="$emit('submit')" 
            :disabled="!localDestination" 
            class="bg-white hover:bg-gray-200 text-black font-medium px-4 py-1.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-center text-sm w-32"
          >
            Find Parking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AddressAutocomplete from '../AddressAutocomplete.vue'
import CustomDropdown from '../CustomDropdown.vue'
import type { PlacePrediction } from '../../composables/useGooglePlaces'

const props = defineProps({
  destinationText: {
    type: String,
    required: true
  },
  vehicleTypeText: {
    type: String,
    default: ''
  },
  durationText: {
    type: String,
    default: ''
  },
  vehicleOptions: {
    type: Array,
    default: () => []
  },
  durationOptions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:destinationText', 'update:vehicleTypeText', 'update:durationText', 'change', 'submit'])

// Local refs
const localDestination = ref(props.destinationText)
const localVehicleType = ref(props.vehicleTypeText)
const localDuration = ref(props.durationText)

// Watch for prop changes to update local values
watch(() => props.destinationText, (newVal) => {
  localDestination.value = newVal
})

watch(() => props.vehicleTypeText, (newVal) => {
  localVehicleType.value = newVal
})

watch(() => props.durationText, (newVal) => {
  localDuration.value = newVal
})

// Update functions that emit events
const updateDestination = (value) => {
  localDestination.value = value
  emit('update:destinationText', value)
}

const updateVehicleType = (value) => {
  localVehicleType.value = value
  emit('update:vehicleTypeText', value)
}

const updateDuration = (value) => {
  localDuration.value = value
  emit('update:durationText', value)
}

const handleAddressChange = (suggestion: PlacePrediction) => {
  emit('change', suggestion)
}
</script>

<style>
.overflow-visible {
  overflow: visible !important;
}
</style> 