<template>
  <div class="bg-black text-white">
    <HeroSection />
    <StatsSection />
    <ModernTeamsSection />
    <FeaturesSection />
    <FoundationSection />
    <CTASection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/about/HeroSection.vue'
import StatsSection from '~/components/about/StatsSection.vue'
import ModernTeamsSection from '~/components/about/ModernTeamsSection.vue'
import FeaturesSection from '~/components/about/FeaturesSection.vue'
import FoundationSection from '~/components/about/FoundationSection.vue'
import CTASection from '~/components/about/CTASection.vue'

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
/* Dark theme styling */
:deep(.u-card) {
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