<template>
  <section class="py-16 border-t border-white/20">
    <div class="max-w-6xl mx-auto px-4 flex flex-wrap justify-between">
      <div 
        ref="textRef"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="mb-8 md:mb-0"
      >
        <p class="text-sm text-white/60">Created by the world's best product teams</p>
        <h2 class="text-xl font-semibold mt-2">Trusted by thousands of parking operators worldwide</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div 
          ref="statOneRef"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
          class="text-center"
        >
          <h3 class="text-3xl font-bold">2M+</h3>
          <p class="text-white/60">Issues created</p>
        </div>
        <div 
          ref="statTwoRef"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
          class="text-center"
        >
          <h3 class="text-3xl font-bold">300k+</h3>
          <p class="text-white/60">Active users</p>
        </div>
        <div 
          ref="statThreeRef"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
          class="text-center"
        >
          <h3 class="text-3xl font-bold">16M+</h3>
          <p class="text-white/60">Updates tracked</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import { ref } from 'vue'

// Refs for motion animations
const textRef = ref(null)
const statOneRef = ref(null)
const statTwoRef = ref(null)
const statThreeRef = ref(null)

// Set up motion animations
useMotion(textRef)
useMotion(statOneRef)
useMotion(statTwoRef)
useMotion(statThreeRef)
</script> 