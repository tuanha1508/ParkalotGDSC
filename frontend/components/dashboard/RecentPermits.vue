<template>
  <div class="border border-white/30 rounded-lg overflow-hidden p-6">
    <h2 class="text-lg font-semibold text-white mb-4">Recent Permits</h2>
    
    <div class="space-y-4">
      <div v-for="(permit, index) in recentPermits" :key="index" class="p-4 bg-black/40 rounded-lg">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-white font-medium">{{ permit.licensePlate }}</p>
            <p class="text-xs text-white/70">{{ permit.type }} Permit</p>
            <p class="text-xs text-white/50">Issued: {{ formatDate(permit.issueDate) }}</p>
            <p class="text-xs text-white/50">Expires: {{ formatDate(permit.expiryDate) }}</p>
          </div>
          <span 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="isPermitValid(permit) ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'"
          >
            {{ isPermitValid(permit) ? 'Valid' : 'Expired' }}
          </span>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="recentPermits.length === 0" class="py-6 text-center text-white/50">
        No recent permits to display.
      </div>
    </div>
    
    <button @click="viewAllPermits" class="mt-4 w-full bg-white hover:bg-gray-200 text-black font-medium py-2 rounded-md transition-all">
      View All Permits
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePermits } from '../../composables/usePermits'
import { useCarHistory } from '../../composables/useCarHistory'

const { recentPermits, isPermitValid } = usePermits()
const { formatDate } = useCarHistory()

const viewAllPermits = () => {
  // Navigate to permits page in a real app
  console.log('Navigating to all permits')
}
</script> 