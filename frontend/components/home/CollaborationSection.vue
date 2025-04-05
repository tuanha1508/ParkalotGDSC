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
              Collaborate across tools and teams
            </h2>
            <p class="text-xl text-gray-400">
              Connect your parking system with other campus tools and enable seamless teamwork among departments.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Integration 1 -->
            <div class="bg-neutral-900 rounded-xl p-8">
              <div class="flex flex-col h-full">
                <div class="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6">
                  <span class="i-heroicons-bell-alert text-2xl text-white"></span>
                </div>
                <h3 class="text-xl font-semibold mb-3 text-white">
                  Notification Systems
                </h3>
                <p class="text-gray-400">
                  Connect with email, SMS, and push notification systems to keep users informed about parking availability.
                </p>
              </div>
            </div>
            
            <!-- Integration 2 -->
            <div class="bg-neutral-900 rounded-xl p-8">
              <div class="flex flex-col h-full">
                <div class="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6">
                  <span class="i-heroicons-currency-dollar text-2xl text-white"></span>
                </div>
                <h3 class="text-xl font-semibold mb-3 text-white">
                  Payment Gateways
                </h3>
                <p class="text-gray-400">
                  Integrate with popular payment providers for smooth and secure transaction processing.
                </p>
              </div>
            </div>
            
            <!-- Integration 3 -->
            <div class="bg-neutral-900 rounded-xl p-8">
              <div class="flex flex-col h-full">
                <div class="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6">
                  <span class="i-heroicons-wrench-screwdriver text-2xl text-white"></span>
                </div>
                <h3 class="text-xl font-semibold mb-3 text-white">
                  Maintenance Tracking
                </h3>
                <p class="text-gray-400">
                  Connect with facility management systems to streamline maintenance requests and issue resolution.
                </p>
              </div>
            </div>
            
            <!-- Integration 4 -->
            <div class="bg-neutral-900 rounded-xl p-8">
              <div class="flex flex-col h-full">
                <div class="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6">
                  <span class="i-heroicons-map text-2xl text-white"></span>
                </div>
                <h3 class="text-xl font-semibold mb-3 text-white">
                  Campus Maps
                </h3>
                <p class="text-gray-400">
                  Integrate with existing campus mapping systems to provide visual navigation to parking spots.
                </p>
              </div>
            </div>
            
            <!-- Integration 5 -->
            <div class="bg-neutral-900 rounded-xl p-8">
              <div class="flex flex-col h-full">
                <div class="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6">
                  <span class="i-heroicons-identification text-2xl text-white"></span>
                </div>
                <h3 class="text-xl font-semibold mb-3 text-white">
                  Identity Management
                </h3>
                <p class="text-gray-400">
                  Connect with campus ID systems for seamless authentication and access control.
                </p>
              </div>
            </div>
            
            <!-- Integration 6 -->
            <div class="bg-neutral-900 rounded-xl p-8">
              <div class="flex flex-col h-full">
                <div class="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6">
                  <span class="i-heroicons-calendar text-2xl text-white"></span>
                </div>
                <h3 class="text-xl font-semibold mb-3 text-white">
                  Event Scheduling
                </h3>
                <p class="text-gray-400">
                  Integrate with campus event calendars to anticipate parking demand for special events.
                </p>
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