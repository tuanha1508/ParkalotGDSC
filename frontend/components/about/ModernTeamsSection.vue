<template>
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <div 
        ref="headerRef"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="mb-16"
      >
        <h2 class="text-3xl font-bold mb-3">Made for all parking users</h2>
        <p class="text-white/70 max-w-2xl">
          Whether you're a driver looking for parking, a business managing lots, or a municipality optimizing urban spaces, 
          Parkalot delivers a tailored experience to meet your specific needs.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        <div 
          ref="card1Ref"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
          class="bg-gray-900/50 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div class="w-12 h-12 bg-blue-600/20 flex items-center justify-center rounded-full mb-4">
            <Icon name="heroicons:sparkles" class="w-6 h-6 text-blue-400" />
          </div>
          <h3 class="text-xl font-medium mb-4">Effortless experience</h3>
          <p class="text-white/60 mb-4">Designed with care to make finding parking quick, simple, and stress-free.</p>
          <ul class="text-sm text-white/70 space-y-2">
            <li class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400" />
              <span>Intuitive mobile interface</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400" />
              <span>One-tap navigation to open spots</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400" />
              <span>Simplified payment process</span>
            </li>
          </ul>
        </div>
        
        <div 
          ref="card2Ref"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
          class="bg-gray-900/50 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div class="w-12 h-12 bg-purple-600/20 flex items-center justify-center rounded-full mb-4">
            <Icon name="heroicons:clock" class="w-6 h-6 text-purple-400" />
          </div>
          <h3 class="text-xl font-medium mb-4">Real-time accuracy</h3>
          <p class="text-white/60 mb-4">Get up-to-the-minute information on parking availability and status.</p>
          <ul class="text-sm text-white/70 space-y-2">
            <li class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400" />
              <span>Live occupancy updates</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400" />
              <span>Accurate space availability tracking</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400" />
              <span>Traffic-aware ETAs</span>
            </li>
          </ul>
        </div>
        
        <div 
          ref="card3Ref"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
          class="bg-gray-900/50 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div class="w-12 h-12 bg-green-600/20 flex items-center justify-center rounded-full mb-4">
            <Icon name="heroicons:cube-transparent" class="w-6 h-6 text-green-400" />
          </div>
          <h3 class="text-xl font-medium mb-4">Complete solution</h3>
          <p class="text-white/60 mb-4">Whether you're a driver or parking administrator, Parkalot has all the tools you need.</p>
          <ul class="text-sm text-white/70 space-y-2">
            <li class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400" />
              <span>Admin dashboard & analytics</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400" />
              <span>Revenue management tools</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400" />
              <span>Maintenance & operations support</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import { ref } from 'vue'

// Refs for motion animations
const headerRef = ref(null)
const card1Ref = ref(null)
const card2Ref = ref(null)
const card3Ref = ref(null)

// Set up motion animations
useMotion(headerRef)
useMotion(card1Ref)
useMotion(card2Ref)
useMotion(card3Ref)
</script> 