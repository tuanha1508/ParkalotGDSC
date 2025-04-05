<template>
  <section class="py-20 md:py-28 bg-black relative overflow-hidden">
    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col gap-12 md:gap-16 items-center" :class="[isReversed ? 'md:flex-row-reverse' : 'md:flex-row']">
          <client-only>
            <div 
              v-motion
              :initial="{ opacity: 0, x: isReversed ? 50 : -50 }"
              :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800 } }"
              class="md:w-5/12"
            >
              <div class="inline-block bg-neutral-800 px-3 py-1 rounded-full mb-5">
                <span class="text-gray-300 text-sm font-medium">{{ badge }}</span>
              </div>
              <h2 class="text-3xl md:text-4xl font-semibold mb-5 text-white tracking-tight">
                {{ title }}
              </h2>
              <p class="text-lg text-gray-400 mb-6">
                {{ description }}
              </p>
              <UButton 
                variant="link"
                class="text-base font-medium text-white hover:text-gray-300 transition-all duration-300 px-0 py-2"
                trailing-icon="i-heroicons-arrow-right-20-solid"
              >
                {{ ctaText }}
              </UButton>
            </div>
          </client-only>
          
          <client-only>
            <div 
              v-motion
              :initial="{ opacity: 0, x: isReversed ? -50 : 50 }"
              :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }"
              class="md:w-7/12"
            >
              <div class="overflow-hidden rounded-lg">
                <img 
                  :src="imageUrl" 
                  :alt="imageAlt" 
                  class="w-full h-auto object-cover"
                />
              </div>
            </div>
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  badge: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ctaText: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    required: true
  },
  isReversed: {
    type: Boolean,
    default: false
  }
})
</script> 