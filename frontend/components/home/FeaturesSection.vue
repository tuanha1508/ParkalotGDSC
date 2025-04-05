<template>
  <section class="py-20 md:py-28 bg-black relative">
    <div class="container mx-auto px-6 relative z-10">
      <client-only>
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          class="max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-white tracking-tight">
            Everything you need for smarter parking
          </h2>
          <p class="text-lg sm:text-xl text-gray-400">
            Our platform combines cutting-edge tech to revolutionize how parking is managed and experienced.
          </p>
        </div>
      </client-only>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        <!-- Feature 1 -->
        <client-only>
          <div 
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            class="bg-neutral-900 rounded-xl p-6 md:p-8 transition-all duration-300"
          >
            <div class="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-5">
              <span class="i-heroicons-map-pin text-2xl text-white"></span>
            </div>
            <h3 class="text-lg font-semibold mb-3 text-gray-100">Real-time Monitoring</h3>
            <p class="text-base text-gray-400">
              Track parking space availability instantly using our network of sensors and cameras.
            </p>
          </div>
        </client-only>
        
        <!-- Feature 2 -->
        <client-only>
          <div 
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
            class="bg-neutral-900 rounded-xl p-6 md:p-8 transition-all duration-300"
          >
            <div class="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-5">
              <span class="i-heroicons-device-phone-mobile text-2xl text-white"></span>
            </div>
            <h3 class="text-lg font-semibold mb-3 text-gray-100">Mobile App Integration</h3>
            <p class="text-base text-gray-400">
              Reserve spots, navigate, and pay seamlessly through our intuitive mobile application.
            </p>
          </div>
        </client-only>
        
        <!-- Feature 3 -->
        <client-only>
          <div 
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
            class="bg-neutral-900 rounded-xl p-6 md:p-8 transition-all duration-300 sm:col-span-2 md:col-span-1"
          >
            <div class="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-5">
              <span class="i-heroicons-chart-bar text-2xl text-white"></span>
            </div>
            <h3 class="text-lg font-semibold mb-3 text-gray-100">Insightful Analytics</h3>
            <p class="text-base text-gray-400">
              Gain valuable insights into parking usage patterns and revenue streams via our dashboard.
            </p>
          </div>
        </client-only>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Animation is now handled by the v-motion directive with visibleOnce property
</script> 