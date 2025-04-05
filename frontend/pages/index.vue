<template>
  <div class="bg-black text-white min-h-screen overflow-hidden">
    <!-- Hero Section -->
    <HeroSection />
  </div>
</template>

<script setup lang="ts">
// Import components
import HeroSection from '@/components/home/HeroSection.vue'

definePageMeta({
  layout: 'default',
})
</script> 