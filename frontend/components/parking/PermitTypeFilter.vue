<template>
  <div class="text-white h-full flex flex-col">
    <div class="bg-black rounded-lg h-full flex flex-col">
      <h3 class="text-lg font-semibold mb-3">Select Your Permit Type <span class="text-red-500">*</span></h3>
      <p class="text-xs text-gray-400 mb-3">Required field</p>
      
      <div v-if="selectedPermit" class="bg-black border border-white/20 rounded-lg p-4 mb-4 flex-grow flex items-center justify-center">
        <div class="text-xl font-medium">{{ selectedPermitLabel }}</div>
      </div>
      
      <div v-else class="space-y-2 flex-grow overflow-y-auto no-scrollbar">
        <div v-for="permit in permits" :key="permit.value" 
             class="p-3 border border-white/20 rounded hover:bg-white/10 cursor-pointer transition-colors"
             @click="selectPermit(permit)">
          {{ permit.label }}
        </div>
        <p v-if="showError" class="text-red-500 text-sm mt-2">Please select a permit type to continue</p>
      </div>
      
      <div v-if="selectedPermit" class="mt-4">
        <button 
          @click="clearSelection" 
          class="text-sm text-white/70 hover:text-white transition-colors underline">
          Change permit type
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useParkingData } from '../../composables/useParkingData'
import { useRoute } from 'vue-router'

const route = useRoute()
const parkingData = useParkingData()
const permits = computed(() => parkingData.vehicleTypes.value)
const selectedPermit = ref('')
const showError = ref(false)
const selectedPermitLabel = computed(() => {
  const permit = permits.value.find(p => p.value === selectedPermit.value)
  return permit ? permit.label : ''
})

function selectPermit(permit: { value: string, label: string }) {
  selectedPermit.value = permit.value
  showError.value = false
}

function clearSelection() {
  selectedPermit.value = ''
}

function validatePermit() {
  if (!selectedPermit.value) {
    showError.value = true
    return false
  }
  showError.value = false
  return true
}

// Expose the validation method for parent components
defineExpose({
  validatePermit,
  getSelectedPermit: () => selectedPermit.value
})

onMounted(() => {
  // Get selected permit from route or localStorage if available
  const routePermit = route.query.vehicleType as string
  const storedPermit = localStorage.getItem('selectedPermit')
  
  if (routePermit) {
    selectedPermit.value = routePermit
  } else if (storedPermit) {
    selectedPermit.value = storedPermit
  }
  
  // Also watch if parking store has a selected vehicle type
  if (parkingData.selectedVehicleType.value) {
    selectedPermit.value = parkingData.selectedVehicleType.value
  }
  
  // Set up watcher for the selectedPermit value
  watch(selectedPermit, (newValue) => {
    if (newValue) {
      localStorage.setItem('selectedPermit', newValue)
      parkingData.selectedVehicleType.value = newValue
    }
  })
})
</script>

<style>
/* Hide scrollbar while maintaining scroll functionality */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

.no-scrollbar::-webkit-scrollbar {
  display: none;             /* Chrome, Safari, Opera */
}
</style> 