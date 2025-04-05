<template>
  <div class="w-full">
    <h2 class="text-xl font-semibold mb-6">Parking Statistics</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Total Slots -->
      <div class="bg-surface rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm">Total Slots</p>
            <p class="text-2xl font-semibold mt-1">{{ parkingStore.totalSlots }}</p>
          </div>
          <div class="p-3 rounded-full bg-blue-500/20 text-blue-500">
            <span class="i-heroicons-square-3-stack-3d text-2xl"></span>
          </div>
        </div>
      </div>
      
      <!-- Available Slots -->
      <div class="bg-surface rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm">Available Slots</p>
            <p class="text-2xl font-semibold mt-1">{{ parkingStore.availableSlots }}</p>
          </div>
          <div class="p-3 rounded-full bg-green-500/20 text-green-500">
            <span class="i-heroicons-check-circle text-2xl"></span>
          </div>
        </div>
      </div>
      
      <!-- Occupied Slots -->
      <div class="bg-surface rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm">Occupied Slots</p>
            <p class="text-2xl font-semibold mt-1">{{ parkingStore.occupiedSlots }}</p>
          </div>
          <div class="p-3 rounded-full bg-red-500/20 text-red-500">
            <span class="i-heroicons-x-circle text-2xl"></span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Occupancy Rate -->
    <div class="mt-6 bg-surface rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <p class="font-medium">Occupancy Rate</p>
        <p class="text-2xl font-semibold">{{ Math.round(parkingStore.occupancyRate) }}%</p>
      </div>
      <UProgress 
        :value="parkingStore.occupancyRate" 
        color="primary" 
        size="lg"
        :ui="{ 
          track: { rounded: 'rounded-full' }, 
          bar: { rounded: 'rounded-full' } 
        }"
      />
    </div>
    
    <!-- Section Stats -->
    <div class="mt-6 bg-surface rounded-lg p-6">
      <h3 class="font-medium mb-4">Section Occupancy</h3>
      
      <div class="space-y-4">
        <div v-for="(stats, section) in parkingStore.sectionStats" :key="section" class="space-y-2">
          <div class="flex items-center justify-between">
            <p>Section {{ section }}</p>
            <p class="font-medium">{{ stats.occupied }} / {{ stats.total }}</p>
          </div>
          <UProgress 
            :value="(stats.occupied / stats.total) * 100" 
            color="primary" 
            :ui="{ 
              track: { rounded: 'rounded-full' }, 
              bar: { rounded: 'rounded-full' } 
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useParkingStore } from '~/stores/parking'

const parkingStore = useParkingStore()
</script> 