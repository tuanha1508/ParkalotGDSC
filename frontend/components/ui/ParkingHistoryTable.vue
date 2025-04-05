<template>
  <div class="w-full">
    <h2 class="text-xl font-semibold mb-6">Parking History</h2>
    
    <div class="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <UInput
        v-model="searchQuery"
        placeholder="Search by license plate..."
        icon="i-heroicons-magnifying-glass"
        class="w-full sm:w-64"
      />
      
      <USelect
        v-model="filterType"
        placeholder="Filter by type"
        :options="[
          { label: 'All Types', value: 'all' },
          { label: 'Student', value: 'student' },
          { label: 'Staff', value: 'staff' },
          { label: 'Visitor', value: 'visitor' }
        ]"
        class="w-full sm:w-48"
      />
      
      <USelect
        v-model="filterStatus"
        placeholder="Filter by status"
        :options="[
          { label: 'All Status', value: 'all' },
          { label: 'Currently Parked', value: 'current' },
          { label: 'Completed', value: 'completed' }
        ]"
        class="w-full sm:w-48"
      />
    </div>
    
    <div class="bg-surface rounded-lg overflow-hidden">
      <UTable :columns="columns" :rows="filteredHistory" :ui="{ 
        td: { 
          base: 'py-3'
        },
        th: {
          base: 'py-3 text-left border-b border-gray-700'
        }
      }">
        <template #type-data="{ row }">
          <UBadge 
            :color="getTypeColor(row.type)"
            variant="subtle"
            size="sm"
            class="capitalize"
          >
            {{ row.type }}
          </UBadge>
        </template>
        
        <template #status-data="{ row }">
          <UBadge 
            :color="row.exitTime ? 'gray' : 'green'"
            variant="subtle"
            size="sm"
          >
            {{ row.exitTime ? 'Completed' : 'Currently Parked' }}
          </UBadge>
        </template>
        
        <template #duration-data="{ row }">
          {{ calculateDuration(row) }}
        </template>
      </UTable>
      
      <div v-if="filteredHistory.length === 0" class="p-8 text-center text-gray-400">
        No parking history records found.
      </div>
    </div>
    
    <div class="mt-4 flex justify-between items-center">
      <p class="text-sm text-gray-400">Showing {{ filteredHistory.length }} of {{ parkingStore.history.length }} entries</p>
      
      <UPagination 
        v-model="currentPage" 
        :total="filteredHistory.length" 
        :page-count="10"
        :ui="{
          wrapper: 'flex items-center gap-1'
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useParkingStore } from '~/stores/parking'

const parkingStore = useParkingStore()

const columns = [
  { key: 'licensePlate', label: 'License Plate' },
  { key: 'type', label: 'Vehicle Type' },
  { key: 'entryTime', label: 'Entry Time' },
  { key: 'exitTime', label: 'Exit Time' },
  { key: 'duration', label: 'Duration' },
  { key: 'status', label: 'Status' }
]

const searchQuery = ref('')
const filterType = ref('all')
const filterStatus = ref('all')
const currentPage = ref(1)

const filteredHistory = computed(() => {
  return parkingStore.history
    .filter(entry => {
      // Filter by search query
      if (searchQuery.value && !entry.licensePlate.toLowerCase().includes(searchQuery.value.toLowerCase())) {
        return false
      }
      
      // Filter by type
      if (filterType.value !== 'all' && entry.type !== filterType.value) {
        return false
      }
      
      // Filter by status
      if (filterStatus.value === 'current' && entry.exitTime) {
        return false
      }
      if (filterStatus.value === 'completed' && !entry.exitTime) {
        return false
      }
      
      return true
    })
    .sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime())
})

const getTypeColor = (type: string) => {
  switch (type) {
    case 'student': return 'blue'
    case 'staff': return 'purple'
    case 'visitor': return 'orange'
    default: return 'gray'
  }
}

const calculateDuration = (entry: any) => {
  const startTime = new Date(entry.entryTime)
  const endTime = entry.exitTime ? new Date(entry.exitTime) : new Date()
  
  const diffMs = endTime.getTime() - startTime.getTime()
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  
  return `${diffHrs}h ${diffMins}m`
}
</script> 