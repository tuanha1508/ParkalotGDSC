<template>
  <div class="bg-black text-white">
    <HeroSection />
    <ModernTeamsSection />
    <FoundationSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/about/HeroSection.vue'
import ModernTeamsSection from '~/components/about/ModernTeamsSection.vue'
import FoundationSection from '~/components/about/FoundationSection.vue'

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
/* Dark theme styling */
:deep(.u-card),
:deep(.card),
:deep(.box),
:deep([class*="card"]),
:deep([class*="box"]),
:deep(.container),
:deep(.panel),
:deep(.section) {
  background-color: #000000;
  border-color: rgba(255, 255, 255, 0.2);
}

:deep(.u-button--ghost),
:deep(.u-button--outline) {
  border-color: rgba(255, 255, 255, 0.2);
}

:deep(.u-button--solid) {
  background-color: white;
  color: black;
}
</style> 