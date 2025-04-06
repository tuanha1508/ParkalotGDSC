<template>
  <section class="py-16 border-t border-white/20">
    <div class="max-w-6xl mx-auto px-4 flex flex-wrap justify-between">
      <div 
        ref="textRef"
        class="mb-8 md:mb-0"
        v-motion-client
      >
        <p class="text-sm text-white/60">Created by the world's best product teams</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div 
          ref="statOneRef"
          class="text-center"
          v-motion-client:100
        >
          <h3 class="text-3xl font-bold">2M+</h3>
          <p class="text-white/60">Issues created</p>
        </div>
        <div 
          ref="statTwoRef"
          class="text-center"
          v-motion-client:200
        >
          <h3 class="text-3xl font-bold">300k+</h3>
          <p class="text-white/60">Active users</p>
        </div>
        <div 
          ref="statThreeRef"
          class="text-center"
          v-motion-client:300
        >
          <h3 class="text-3xl font-bold">16M+</h3>
          <p class="text-white/60">Updates tracked</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Refs for motion animations
const textRef = ref(null)
const statOneRef = ref(null)
const statTwoRef = ref(null)
const statThreeRef = ref(null)
</script> 