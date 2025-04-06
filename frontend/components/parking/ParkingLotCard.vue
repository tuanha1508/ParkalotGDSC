<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="relative">
      <div class="absolute top-2 right-2 bg-black/80 rounded-full px-3 py-1 text-sm text-white">
        {{ lot.distanceInKm.toFixed(1) }} km
      </div>
      <div class="absolute top-2 left-2 bg-black/80 rounded-full px-3 py-1 text-sm text-white">
        ID: {{ lot.id }}
      </div>
      <img src="/images/default-parking.jpg" alt="Parking lot" class="w-full h-48 object-cover" />
    </div>
    
    <div class="p-5">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold text-white">{{ lot.name }}</h3>
        <button 
          @click.prevent.stop="openGoogleMapsDirections($event)" 
          class="text-white hover:text-blue-300 p-1 transition-colors"
          title="Get directions to this parking lot"
        >
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </button>
      </div>
      
      <div class="mt-2 text-white opacity-70 text-sm line-clamp-2">
        {{ lot.location }}
      </div>
      
      <!-- Distance and Duration Info -->
      <div v-if="lot.routeDistance && lot.routeDuration" class="mt-3 flex items-center text-white gap-3">
        <div class="flex items-center">
          <UIcon :name="lot.travelMode === 'walking' ? 'i-heroicons-user-circle' : 'i-heroicons-truck'" class="h-4 w-4 mr-1" />
          <span class="text-sm">{{ lot.routeDistance }}</span>
        </div>
        <div class="flex items-center">
          <UIcon name="i-heroicons-clock" class="h-4 w-4 mr-1" />
          <span class="text-sm">{{ lot.routeDuration }}</span>
        </div>
      </div>
      
      <!-- Straight-line distance if route information is not available -->
      <div v-else class="mt-3 flex items-center text-white gap-3">
        <div class="flex items-center">
          <UIcon name="i-heroicons-map-pin" class="h-4 w-4 mr-1" />
          <span class="text-sm">{{ lot.distanceInKm }} km</span>
        </div>
        <div class="flex items-center" v-if="lot.distanceInMiles">
          <UIcon name="i-heroicons-map" class="h-4 w-4 mr-1" />
          <span class="text-sm">{{ lot.distanceInMiles }} mi</span>
        </div>
      </div>
      
      <div class="mt-3 text-white">
        <span class="text-lg font-semibold">
          {{ lot.availableSpots }}
        </span>
        <span class="opacity-70">
          / {{ lot.totalSpaces }} spots available
        </span>
      </div>
      
      <div class="mt-4 w-full bg-white/10 rounded-full h-2">
        <div 
          class="h-2 rounded-full bg-white" 
          :style="{width: `${(lot.availableSpots / lot.totalSpaces) * 100}%`}"
        ></div>
      </div>
      
      <div class="mt-3 flex flex-wrap gap-1">
        <span 
          v-for="(permitType, index) in lot.permitTypes" 
          :key="index"
          class="inline-block text-xs bg-white/10 text-white px-2 py-1 rounded-full"
        >
          {{ permitType }}
        </span>
      </div>
      
      <div class="mt-4">
        <button 
          @click="$emit('select')" 
          class="bg-white hover:bg-gray-200 text-black font-medium px-4 py-1.5 rounded-full transition-all duration-200 shadow-sm text-center w-full"
        >
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParkingLot } from '../../composables/useParkingData'

const props = defineProps<{
  lot: ParkingLot
}>()

defineEmits<{
  select: []
}>()

// Function to open Google Maps with directions from current location to parking lot
function openGoogleMapsDirections(event: Event) {
  event.preventDefault();
  event.stopPropagation(); // Prevent triggering the card selection
  
  console.log('Opening Google Maps directions for:', props.lot.name);
  console.log('Parking coordinates:', props.lot.coordinates);

  try {
    const { lat, lng } = props.lot.coordinates;
    
    // Check if coordinates are valid
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
      throw new Error('Invalid parking lot coordinates');
    }

    // Get the user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User coordinates:', latitude, longitude);
          
          // Create Google Maps URL with directions and driving mode
          const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${lat},${lng}&travelmode=driving`;
          
          console.log('Maps URL:', url);
          
          // Force navigation to the URL
          window.location.href = url;
        },
        (error) => {
          console.error('Error getting current position:', error);
          // If can't get current location, use just the destination
          const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
          console.log('Fallback Maps URL (no origin):', url);
          window.location.href = url;
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      // Fallback if geolocation is not supported
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
      console.log('Fallback Maps URL (geo not supported):', url);
      window.location.href = url;
    }
  } catch (error) {
    console.error('Error in maps redirect:', error);
    
    // Last resort fallback
    try {
      const address = encodeURIComponent(props.lot.address || props.lot.location || props.lot.name);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode=driving`;
      console.log('Last resort fallback URL:', url);
      window.location.href = url;
    } catch (e) {
      console.error('Could not redirect to maps at all:', e);
      alert('Could not open directions. Please try again.');
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 2.4em; /* Fallback for non-webkit browsers */
}
</style> 