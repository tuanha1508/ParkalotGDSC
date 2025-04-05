<template>
  <section class="py-24 md:py-32 bg-black relative">
    <div class="container mx-auto px-6">
      <client-only>
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          class="max-w-4xl mx-auto"
        >
          <h2 class="text-center text-3xl md:text-5xl font-bold mb-16 text-white">
            Made for modern product teams
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <!-- Feature 1 -->
            <div class="text-center">
              <div class="mb-6">
                <span class="i-heroicons-rectangle-stack text-3xl text-white"></span>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-white">Personalized Experience</h3>
              <p class="text-gray-400">
                Tailored solutions that adapt to your specific parking management needs and challenges.
              </p>
            </div>
            
            <!-- Feature 2 -->
            <div class="text-center">
              <div class="mb-6">
                <span class="i-heroicons-chart-bar text-3xl text-white"></span>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-white">Intuitive to navigate</h3>
              <p class="text-gray-400">
                User-friendly interface designed to make parking management simple and efficient.
              </p>
            </div>
            
            <!-- Feature 3 -->
            <div class="text-center">
              <div class="mb-6">
                <span class="i-heroicons-bolt text-3xl text-white"></span>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-white">Effortlessly upgradable</h3>
              <p class="text-gray-400">
                Scale your parking system seamlessly as your organization grows or needs change.
              </p>
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