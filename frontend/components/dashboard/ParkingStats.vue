<template>
  <div class="p-6 text-white">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Total Parking Slots -->
      <div class="bg-black/40 border border-white/20 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm opacity-70">Total Slots</h3>
          <span class="i-heroicons-square-2-stack h-5 w-5 opacity-50"></span>
        </div>
        <div class="mt-2 text-2xl font-semibold">326</div>
      </div>

      <!-- Available Slots -->
      <div class="bg-black/40 border border-white/20 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm opacity-70">Available</h3>
          <span class="i-heroicons-check-circle h-5 w-5 text-green-500 opacity-70"></span>
        </div>
        <div class="mt-2 text-2xl font-semibold text-green-400">228</div>
      </div>

      <!-- Occupied Slots -->
      <div class="bg-black/40 border border-white/20 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm opacity-70">Occupied</h3>
          <span class="i-heroicons-x-circle h-5 w-5 text-red-500 opacity-70"></span>
        </div>
        <div class="mt-2 text-2xl font-semibold text-red-400">98</div>
      </div>

      <!-- Occupancy Rate -->
      <div class="bg-black/40 border border-white/20 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm opacity-70">Occupancy Rate</h3>
          <span class="i-heroicons-chart-bar h-5 w-5 opacity-50"></span>
        </div>
        <div class="mt-2 text-2xl font-semibold">30%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple static parking stats for the simulation (326 total slots, 30% occupancy rate)
</script> 