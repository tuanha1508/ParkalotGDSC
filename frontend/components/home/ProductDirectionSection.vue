<template>
  <section class="py-24 md:py-32 bg-black relative">
    <div class="container mx-auto px-6">
      <client-only>
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          class="max-w-7xl mx-auto"
        >
          <div class="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-5xl font-bold mb-8 text-white">
              Set the parking direction
            </h2>
            <p class="text-xl text-gray-400">
              Clearly define your parking strategy and efficiently manage campus spaces with our comprehensive system.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Feature 1 with image -->
            <div class="bg-neutral-900 rounded-xl overflow-hidden">
              <div class="p-8">
                <h3 class="text-xl font-semibold mb-3 text-white">
                  Project Overview
                </h3>
                <p class="text-gray-400">
                  Get at-a-glance insights about your parking facilities, available spaces, and utilization trends.
                </p>
              </div>
              <div class="px-8 pb-8">
                <div class="rounded-lg overflow-hidden bg-neutral-800 h-64">
                  <!-- Replace with actual screenshot -->
                  <img 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Dashboard interface showing parking overview" 
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <!-- Feature 2 with image -->
            <div class="bg-neutral-900 rounded-xl overflow-hidden">
              <div class="p-8">
                <h3 class="text-xl font-semibold mb-3 text-white">
                  Real-time Analytics
                </h3>
                <p class="text-gray-400">
                  Monitor current parking status, historical patterns, and predict future occupancy based on data.
                </p>
              </div>
              <div class="px-8 pb-8">
                <div class="rounded-lg overflow-hidden bg-neutral-800 h-64">
                  <!-- Replace with actual screenshot -->
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Analytics dashboard with parking metrics" 
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </section>
</template>

<script setup lang="ts">
// Animation is handled by the v-motion directive with visibleOnce property
</script> 