<template>
  <div class="space-y-8">
    <!-- Parking Tips Card -->
    <ParkingTips />
    
    <!-- Quick Actions Card -->
    <QuickActions @view-map="$emit('view-map')" />
  </div>
</template>

<script setup lang="ts">
import ParkingTips from '../ParkingTips.vue'
import QuickActions from '../QuickActions.vue'

defineEmits<{
  (e: 'view-map'): void
}>()
</script> 