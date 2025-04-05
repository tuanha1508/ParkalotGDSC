<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium">Parking History</h3>
      <div class="flex items-center space-x-2">
        <UInput
          v-model="search"
          placeholder="Search license plate"
          size="sm"
          icon="i-heroicons-magnifying-glass"
          class="w-48"
        />
        <USelect
          v-model="filter"
          :options="filterOptions"
          size="sm"
          placeholder="Filter"
          class="w-36"
        />
      </div>
    </div>
    
    <div class="overflow-x-auto">
      <UTable :columns="columns" :rows="filteredHistory">
        <template #status-data="{ row }">
          <UBadge 
            :color="row.exitTime ? 'green' : 'blue'" 
            variant="soft" 
            size="sm"
          >
            {{ row.exitTime ? 'Completed' : 'Active' }}
          </UBadge>
        </template>
        
        <template #entryTime-data="{ row }">
          {{ formatDateTime(row.entryTime) }}
        </template>
        
        <template #exitTime-data="{ row }">
          {{ row.exitTime ? formatDateTime(row.exitTime) : '-' }}
        </template>
        
        <template #duration-data="{ row }">
          {{ calculateDuration(row.entryTime, row.exitTime) }}
        </template>
        
        <template #actions-data="{ row }">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-eye"
            size="xs"
            @click="viewDetails(row)"
          />
        </template>
      </UTable>
    </div>
    
    <UPagination
      v-model="page"
      :total="parkingStore.history.length"
      :page-size="perPage"
      class="mt-4 flex justify-center"
    />
    
    <!-- Vehicle Details Modal -->
    <UModal v-model="isDetailsModalOpen" size="md">
      <UCard v-if="selectedVehicle">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold">Vehicle Details</h3>
            <UButton 
              color="gray" 
              variant="ghost" 
              icon="i-heroicons-x-mark" 
              @click="isDetailsModalOpen = false"
            />
          </div>
        </template>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <div class="text-sm text-gray-500">License Plate</div>
              <div class="font-medium">{{ selectedVehicle.licensePlate }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Vehicle Type</div>
              <div class="font-medium capitalize">{{ selectedVehicle.type }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Entry Time</div>
              <div class="font-medium">{{ formatDateTime(selectedVehicle.entryTime) }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Exit Time</div>
              <div class="font-medium">
                {{ selectedVehicle.exitTime ? formatDateTime(selectedVehicle.exitTime) : 'Still parked' }}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Duration</div>
              <div class="font-medium">
                {{ calculateDuration(selectedVehicle.entryTime, selectedVehicle.exitTime) }}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Status</div>
              <div class="font-medium">
                <UBadge :color="selectedVehicle.exitTime ? 'green' : 'blue'" variant="soft">
                  {{ selectedVehicle.exitTime ? 'Completed' : 'Active' }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton 
              color="gray" 
              variant="solid" 
              @click="isDetailsModalOpen = false"
            >
              Close
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useParkingStore } from '~/stores/parking';
import { useParking } from '~/composables/useParking';

// Define interfaces
interface ParkingHistoryEntry {
  id: string;
  licensePlate: string;
  type: 'student' | 'staff' | 'visitor';
  entryTime: string;
  exitTime?: string;
  section: string;
  slotNumber: number;
}

const parkingStore = useParkingStore();
const { formatDateTime } = useParking();

// UI state
const search = ref('');
const filter = ref('');
const page = ref(1);
const perPage = 10;
const isDetailsModalOpen = ref(false);
const selectedVehicle = ref<ParkingHistoryEntry | null>(null);

// Table setup
const columns = [
  { key: 'licensePlate', label: 'License Plate' },
  { key: 'type', label: 'Type' },
  { key: 'entryTime', label: 'Entry Time', sortable: true },
  { key: 'exitTime', label: 'Exit Time', sortable: true },
  { key: 'duration', label: 'Duration' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' }
];

const filterOptions = [
  { label: 'All', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Student', value: 'student' },
  { label: 'Staff', value: 'staff' },
  { label: 'Visitor', value: 'visitor' }
];

// Computed properties
const filteredHistory = computed(() => {
  let history = parkingStore.history.filter(entry => {
    let matchesSearch = true;
    if (search.value) {
      matchesSearch = entry.licensePlate.toLowerCase().includes(search.value.toLowerCase());
    }
    
    let matchesFilter = true;
    if (filter.value) {
      if (filter.value === 'active') {
        matchesFilter = !entry.exitTime;
      } else if (filter.value === 'completed') {
        matchesFilter = !!entry.exitTime;
      } else {
        matchesFilter = entry.type === filter.value;
      }
    }
    
    return matchesSearch && matchesFilter;
  });
  
  // Sort by most recent
  history = [...history].sort((a, b) => {
    const dateA = a.exitTime ? new Date(a.exitTime) : new Date(a.entryTime);
    const dateB = b.exitTime ? new Date(b.exitTime) : new Date(b.entryTime);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Pagination
  const start = (page.value - 1) * perPage;
  const end = start + perPage;
  return history.slice(start, end);
});

// Methods
function calculateDuration(entryTime: string, exitTime?: string): string {
  const start = new Date(entryTime);
  const end = exitTime ? new Date(exitTime) : new Date();
  const diffMs = end.getTime() - start.getTime();
  
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHrs > 0) {
    return `${diffHrs}h ${diffMins}m`;
  }
  return `${diffMins}m`;
}

function viewDetails(vehicle: ParkingHistoryEntry): void {
  selectedVehicle.value = vehicle;
  isDetailsModalOpen.value = true;
}
</script> 