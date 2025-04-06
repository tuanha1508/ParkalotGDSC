<template>
  <section class="py-20 border-t border-white/20">
    <div class="max-w-6xl mx-auto px-4">
      <div
        ref="headerRef"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="mb-16"
      >
        <h2 class="text-3xl font-bold mb-4">Built on strong tech stacks</h2>
        <p class="text-white/70 max-w-2xl">
          Our platform is engineered with enterprise-grade standards at every level, ensuring reliability, 
          security, and performance that you can depend on day after day.
        </p>
      </div>
      <div class="overflow-hidden py-10">
        <div class="tech-scroll flex gap-12 animate-marquee">
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/vue.svg" alt="Vue.js" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/nuxt.svg" alt="Nuxt" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/tailwind.svg" alt="Tailwind CSS" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/typescript.svg" alt="TypeScript" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/pinia.svg" alt="Pinia" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/nestjs.svg" alt="NestJS" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/supabase.svg" alt="Supabase" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/roboflow.svg" alt="Roboflow" class="h-full w-auto" />
            </div>
          </div>
          
          <!-- Duplicate logos for seamless loop -->
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/vue.svg" alt="Vue.js" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/nuxt.svg" alt="Nuxt" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/tailwind.svg" alt="Tailwind CSS" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/typescript.svg" alt="TypeScript" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/pinia.svg" alt="Pinia" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/nestjs.svg" alt="NestJS" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/supabase.svg" alt="Supabase" class="h-full w-auto" />
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="h-16 w-16 flex items-center justify-center">
              <img src="/img/logos/roboflow.svg" alt="Roboflow" class="h-full w-auto" />
            </div>
          </div>
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

// Set up motion animations
useMotion(headerRef)
</script>

<style scoped>
.tech-scroll {
  animation-duration: 25s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.animate-marquee {
  animation-name: marquee;
}

@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}
</style> 