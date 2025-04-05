<template>
  <div class="text-white">
    <div class="flex justify-between items-center mb-5">
      <h3 class="text-lg font-medium">Parking Lot Simulation</h3>
      <div class="flex space-x-4">
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-green-500/60 border border-green-500 rounded"></div>
          <span class="text-xs text-white opacity-70">Available</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-red-500/60 border border-red-500 rounded"></div>
          <span class="text-xs text-white opacity-70">Occupied</span>
        </div>
      </div>
    </div>
    
    <!-- Main parking lot visualization -->
    <div class="border border-white/20 rounded-lg p-5">
      <h4 class="text-md font-medium mb-4 flex items-center">
        <span class="h-6 w-6 flex items-center justify-center border border-white/30 rounded-full mr-2 text-xs">P</span>
        Main Parking Area (326 Slots)
      </h4>
      
      <!-- Parking Layout with Driving Lanes -->
      <div class="relative">
        <!-- Top driving lane with North Entrance -->
        <div class="h-10 bg-gray-800/50 border-y border-dashed border-white/20 mb-4 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-b border-dashed border-white/30"></div>
          </div>
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <span class="i-heroicons-arrow-down h-3 w-3 opacity-60 mr-1"></span>
            <span class="text-xs opacity-70 font-medium">North Entrance</span>
          </div>
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs opacity-60">Main Road</div>
        </div>
        
        <!-- First row of parking slots (66 slots) -->
        <div class="grid grid-cols-6 sm:grid-cols-11 md:grid-cols-22 xl:grid-cols-33 gap-1 mb-3">
          <div v-for="i in 66" :key="`row1-${i}`" class="cursor-pointer relative group">
            <div 
              class="aspect-[4/3] rounded-sm flex flex-col items-center justify-center border transition-all duration-200"
              :class="getRandomSlotStyle()"
            >
              <div class="text-xs font-medium tracking-wider">| |</div>
            </div>
          </div>
        </div>
        
        <!-- Middle driving lane -->
        <div class="h-8 bg-gray-800/50 border-y border-dashed border-white/20 mb-3 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-b border-dashed border-white/30"></div>
          </div>
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs opacity-60">Driving Lane</div>
        </div>
        
        <!-- Second row of parking slots (66 slots) -->
        <div class="grid grid-cols-6 sm:grid-cols-11 md:grid-cols-22 xl:grid-cols-33 gap-1 mb-3">
          <div v-for="i in 66" :key="`row2-${i}`" class="cursor-pointer relative group">
            <div 
              class="aspect-[4/3] rounded-sm flex flex-col items-center justify-center border transition-all duration-200"
              :class="getRandomSlotStyle()"
            >
              <div class="text-xs font-medium tracking-wider">| |</div>
            </div>
          </div>
        </div>
        
        <!-- Middle driving lane -->
        <div class="h-8 bg-gray-800/50 border-y border-dashed border-white/20 mb-3 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-b border-dashed border-white/30"></div>
          </div>
          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs opacity-70 font-medium">Central Area</div>
        </div>
        
        <!-- Third row of parking slots (66 slots) -->
        <div class="grid grid-cols-6 sm:grid-cols-11 md:grid-cols-22 xl:grid-cols-33 gap-1 mb-3">
          <div v-for="i in 66" :key="`row3-${i}`" class="cursor-pointer relative group">
            <div 
              class="aspect-[4/3] rounded-sm flex flex-col items-center justify-center border transition-all duration-200"
              :class="getRandomSlotStyle()"
            >
              <div class="text-xs font-medium tracking-wider">| |</div>
            </div>
          </div>
        </div>
        
        <!-- Middle driving lane -->
        <div class="h-8 bg-gray-800/50 border-y border-dashed border-white/20 mb-3 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-b border-dashed border-white/30"></div>
          </div>
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs opacity-60">Driving Lane</div>
        </div>
        
        <!-- Fourth row of parking slots (66 slots) -->
        <div class="grid grid-cols-6 sm:grid-cols-11 md:grid-cols-22 xl:grid-cols-33 gap-1 mb-3">
          <div v-for="i in 66" :key="`row4-${i}`" class="cursor-pointer relative group">
            <div 
              class="aspect-[4/3] rounded-sm flex flex-col items-center justify-center border transition-all duration-200"
              :class="getRandomSlotStyle()"
            >
              <div class="text-xs font-medium tracking-wider">| |</div>
            </div>
          </div>
        </div>
        
        <!-- Fifth row of parking slots (62 slots) -->
        <div class="grid grid-cols-6 sm:grid-cols-11 md:grid-cols-22 xl:grid-cols-31 gap-1 mb-3">
          <div v-for="i in 62" :key="`row5-${i}`" class="cursor-pointer relative group">
            <div 
              class="aspect-[4/3] rounded-sm flex flex-col items-center justify-center border transition-all duration-200"
              :class="getRandomSlotStyle()"
            >
              <div class="text-xs font-medium tracking-wider">| |</div>
            </div>
          </div>
        </div>
        
        <!-- Bottom driving lane with South Entrance -->
        <div class="h-10 bg-gray-800/50 border-y border-dashed border-white/20 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-b border-dashed border-white/30"></div>
          </div>
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <span class="text-xs opacity-70 font-medium mr-1">South Entrance</span>
            <span class="i-heroicons-arrow-up h-3 w-3 opacity-60"></span>
          </div>
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs opacity-60">Exit</div>
        </div>
      </div>
      
      <!-- Statistics summary at bottom -->
      <div class="mt-8 p-4 bg-gray-800/30 border border-white/20 rounded-lg">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <div class="text-xs opacity-70">Total Parking Slots</div>
            <div class="text-xl font-semibold">326</div>
          </div>
          <div>
            <div class="text-xs opacity-70">Available</div>
            <div class="text-xl font-semibold text-green-400">{{ Math.floor(326 * 0.7) }}</div>
          </div>
          <div>
            <div class="text-xs opacity-70">Occupied</div>
            <div class="text-xl font-semibold text-red-400">{{ Math.floor(326 * 0.3) }}</div>
          </div>
        </div>
        <div class="mt-4 text-xs opacity-60 text-center">
          Note: This is a simulation. In the future, this will be connected to real-time parking data.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useParking } from '~/composables/useParking';

const { formatDateTime } = useParking();

// Helper functions for the demo visualization
function getRandomSlotStyle() {
  const isOccupied = Math.random() > 0.7; // 30% chance of being occupied
  if (isOccupied) {
    return 'bg-red-500/30 border-red-500/60 group-hover:bg-red-500/40';
  } else {
    return 'bg-green-500/30 border-green-500/60 group-hover:bg-green-500/40';
  }
}

function getRandomLicensePlate() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let plate = '';
  
  // First 2 letters
  for (let i = 0; i < 2; i++) {
    plate += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  plate += '-';
  
  // 3 numbers
  for (let i = 0; i < 3; i++) {
    plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  plate += '-';
  
  // Last 2 letters
  for (let i = 0; i < 2; i++) {
    plate += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  return plate;
}

// Total slots for the simulation
const totalSlots = ref(326);
const availableSlots = ref(Math.floor(326 * 0.7)); // 70% available
const occupiedSlots = ref(Math.floor(326 * 0.3)); // 30% occupied
</script>

<style scoped>
/* Custom grid columns */
@media (min-width: 640px) {
  .sm\:grid-cols-11 {
    grid-template-columns: repeat(11, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .md\:grid-cols-22 {
    grid-template-columns: repeat(22, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .xl\:grid-cols-33 {
    grid-template-columns: repeat(33, minmax(0, 1fr));
  }
  
  .xl\:grid-cols-31 {
    grid-template-columns: repeat(31, minmax(0, 1fr));
  }
}

/* Ensure parking slots are visible and properly styled */
.aspect-\[4\/3\] {
  aspect-ratio: 4/3;
  min-height: 22px;
  min-width: 16px;
}
</style> 