<template>
  <div class="border border-white/30 rounded-lg overflow-hidden p-6">
    <h2 class="text-lg font-semibold text-white mb-4">Car Entry/Exit History</h2>
    
    <!-- Search and Filter Controls -->
    <div class="mb-4 flex flex-col sm:flex-row gap-3">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search license plate..." 
        class="px-4 py-2 bg-black/50 border border-white/20 rounded-md text-white text-xs w-full"
      />
      
      <select 
        v-model="permitFilter" 
        class="px-4 py-2 bg-black/50 border border-white/20 rounded-md text-white text-xs pl-4 pr-8 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M4.5%206l3.5%204%203.5-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-no-repeat bg-[length:1rem_1rem]"
      >
        <option value="all">All Permits</option>
        <option value="valid">Valid Permits</option>
        <option value="invalid">Invalid Permits</option>
      </select>
      
      <select 
        v-model="statusFilter" 
        class="px-4 py-2 bg-black/50 border border-white/20 rounded-md text-white text-xs pl-4 pr-8 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M4.5%206l3.5%204%203.5-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-no-repeat bg-[length:1rem_1rem]"
      >
        <option value="all">All Status</option>
        <option value="in">Currently Parked</option>
        <option value="out">Exited</option>
      </select>
    </div>
    
    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-white/10">
        <thead>
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">License Plate</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Entry Time</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Exit Time</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Duration</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Permit</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/10">
          <tr v-for="(car, index) in paginatedCarHistory" :key="index" class="hover:bg-white/5">
            <td class="px-4 py-3 text-xs text-white">{{ car.licensePlate }}</td>
            <td class="px-4 py-3 text-xs text-white">{{ formatTime(car.entryTime) }}</td>
            <td class="px-4 py-3 text-xs text-white">{{ car.exitTime ? formatTime(car.exitTime) : '—' }}</td>
            <td class="px-4 py-3 text-xs text-white">{{ getDuration(car) }}</td>
            <td class="px-4 py-3 text-xs">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="car.hasValidPermit ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'"
              >
                {{ car.hasValidPermit ? 'Valid' : 'Invalid' }}
              </span>
            </td>
            <td class="px-4 py-3 text-xs text-white">
              <button class="text-blue-400 hover:text-blue-300 mr-2">View</button>
              <button v-if="!car.exitTime" @click="markCarExit(car)" class="text-red-400 hover:text-red-300">Mark Exit</button>
            </td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="paginatedCarHistory.length === 0">
            <td colspan="6" class="px-4 py-8 text-center text-white/50">No car history records found.</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <p class="text-xs text-white/50">Showing {{ paginatedCarHistory.length }} of {{ filteredCarHistory.length }} entries</p>
      
      <div class="flex items-center space-x-2">
        <button 
          class="px-3 py-1 border border-white/20 rounded-md text-white/70 hover:bg-white/10"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </button>
        <span class="text-white/70">{{ currentPage }} / {{ totalPages }}</span>
        <button 
          class="px-3 py-1 border border-white/20 rounded-md text-white/70 hover:bg-white/10"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCarHistory } from '../../composables/useCarHistory'

const {
  searchQuery,
  permitFilter,
  statusFilter,
  currentPage,
  filteredCarHistory,
  paginatedCarHistory,
  totalPages,
  formatTime,
  getDuration,
  markCarExit
} = useCarHistory()
</script> 