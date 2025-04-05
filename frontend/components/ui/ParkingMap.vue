<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Parking Map</h2>
      <div class="flex space-x-4">
        <div class="flex items-center">
          <div class="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span class="text-sm">Available</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <span class="text-sm">Occupied</span>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 gap-8">
      <div v-for="section in sections" :key="section" class="bg-surface rounded-lg p-4">
        <h3 class="text-lg font-medium mb-4">Section {{ section }}</h3>
        <div class="grid grid-cols-5 sm:grid-cols-10 gap-2">
          <div 
            v-for="slot in getSlotsForSection(section)" 
            :key="slot.id"
            class="aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-colors"
            :class="[
              slot.isOccupied ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600',
              'relative'
            ]"
            @click="handleSlotClick(slot)"
          >
            <span class="font-medium text-white">{{ slot.number }}</span>
            <div v-if="slot.isOccupied" class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-400"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Slot Details Modal -->
    <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-md' }">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-4">
          Slot {{ selectedSlot?.section }}{{ selectedSlot?.number }}
        </h3>
        
        <div class="space-y-4">
          <div v-if="selectedSlot?.isOccupied && selectedSlot?.carInfo" class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-400">License Plate:</span>
              <span class="font-medium">{{ selectedSlot.carInfo.licensePlate }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Entry Time:</span>
              <span class="font-medium">{{ formatDateTime(selectedSlot.carInfo.entryTime) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Type:</span>
              <span class="font-medium capitalize">{{ selectedSlot.carInfo.type }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Duration:</span>
              <span class="font-medium">{{ getDuration(selectedSlot.carInfo.entryTime) }}</span>
            </div>
            
            <UButton
              class="w-full mt-2"
              color="red"
              variant="solid"
              @click="handleCarExit"
            >
              Record Exit
            </UButton>
          </div>
          
          <div v-else class="space-y-4">
            <p>This parking slot is currently available.</p>
            
            <UFormGroup label="License Plate">
              <UInput v-model="newCarData.licensePlate" placeholder="e.g. AB-123-CD" />
            </UFormGroup>
            
            <UFormGroup label="Vehicle Type">
              <USelect
                v-model="newCarData.type"
                :options="[
                  { label: 'Student', value: 'student' },
                  { label: 'Staff', value: 'staff' },
                  { label: 'Visitor', value: 'visitor' }
                ]"
              />
            </UFormGroup>
            
            <UButton
              class="w-full"
              color="green"
              variant="solid"
              :disabled="!newCarData.licensePlate"
              @click="handleCarEntry"
            >
              Record Entry
            </UButton>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useParkingStore } from '~/stores/parking'

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:showModal'])

const parkingStore = useParkingStore()
const selectedSlot = ref<any>(null)
const isModalOpen = ref(false)
const newCarData = ref({
  licensePlate: '',
  type: 'student' as 'student' | 'staff' | 'visitor'
})

const sections = computed(() => {
  const uniqueSections = new Set<string>()
  parkingStore.slots.forEach(slot => uniqueSections.add(slot.section))
  return Array.from(uniqueSections).sort()
})

const getSlotsForSection = (section: string) => {
  return parkingStore.slots
    .filter(slot => slot.section === section)
    .sort((a, b) => a.number - b.number)
}

const handleSlotClick = (slot: any) => {
  selectedSlot.value = slot
  isModalOpen.value = true
  
  // Reset new car data
  newCarData.value = {
    licensePlate: '',
    type: 'student'
  }
}

const handleCarEntry = () => {
  if (!selectedSlot.value || !newCarData.value.licensePlate) return
  
  parkingStore.carEntry(
    selectedSlot.value.id,
    newCarData.value.licensePlate,
    newCarData.value.type
  )
  
  isModalOpen.value = false
}

const handleCarExit = () => {
  if (!selectedSlot.value) return
  
  parkingStore.carExit(selectedSlot.value.id)
  isModalOpen.value = false
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}

const getDuration = (startTimeString: string) => {
  const startTime = new Date(startTimeString)
  const now = new Date()
  
  const diffMs = now.getTime() - startTime.getTime()
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  
  return `${diffHrs}h ${diffMins}m`
}
</script> 