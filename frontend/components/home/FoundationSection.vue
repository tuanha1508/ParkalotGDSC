<template>
  <section class="py-24 md:py-32 bg-black relative">
    <div class="container mx-auto px-6">
      <client-only>
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          class="max-w-7xl mx-auto"
        >
          <div class="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-5xl font-bold mb-8 text-white">
              Build on strong foundations
            </h2>
            <p class="text-xl text-gray-400">
              Our parking management system is built with robust technology that ensures reliability and scalability.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Foundation 1 -->
            <div class="bg-neutral-900 rounded-xl p-8 flex flex-col h-full">
              <h3 class="text-xl font-semibold mb-4 text-white">
                Reliability
              </h3>
              <ul class="text-gray-400 space-y-4 flex-grow">
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span>99.9% uptime guarantee for all parking systems</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span>Regular backups and disaster recovery protocols</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span>Fault-tolerant architecture with redundancy</span>
                </li>
              </ul>
            </div>
            
            <!-- Foundation 2 -->
            <div class="bg-neutral-900 rounded-xl p-8 flex flex-col h-full">
              <h3 class="text-xl font-semibold mb-4 text-white">
                Security
              </h3>
              <ul class="text-gray-400 space-y-4 flex-grow">
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span>End-to-end encryption for all data transfers</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span>Role-based access control with detailed audit logs</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span>Regular security audits and vulnerability assessments</span>
                </li>
              </ul>
            </div>
            
            <!-- Foundation 3 -->
            <div class="bg-neutral-900 rounded-xl p-8 flex flex-col h-full">
              <h3 class="text-xl font-semibold mb-4 text-white">
                Scalability
              </h3>
              <ul class="text-gray-400 space-y-4 flex-grow">
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span>Built to handle from small to large campus environments</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span>Flexible architecture for easy expansion</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span>Cloud-based deployment with auto-scaling capabilities</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Technology Stack Visualization -->
          <div class="mt-16 md:mt-24">
            <div class="bg-neutral-900 rounded-xl p-8">
              <h3 class="text-xl font-semibold mb-6 text-white">
                Technology Stack
              </h3>
              <div 
                class="overflow-x-hidden"
                ref="techStackContainer"
              >
                <div 
                  ref="techStackSlider"
                  class="flex gap-6 transition-transform duration-500 ease-in-out"
                  :style="{ transform: `translateX(-${scrollPosition}px)` }"
                >
                  <!-- First set of items -->
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/vue.svg" alt="Vue.js" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">Vue.js 3</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/nuxt.svg" alt="Nuxt" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">Nuxt 3</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/typescript.svg" alt="TypeScript" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">TypeScript</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/tailwind.svg" alt="Tailwind CSS" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">Tailwind CSS</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/pinia.svg" alt="Pinia" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">Pinia</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/nestjs.svg" alt="NestJS" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">NestJS</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/supabase.svg" alt="SupaBase" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">SupaBase</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/roboflow.svg" alt="RoboFlow" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">RoboFlow</span>
                  </div>
                  
                  <!-- Duplicated set for infinite scrolling -->
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/vue.svg" alt="Vue.js" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">Vue.js 3</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/nuxt.svg" alt="Nuxt" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">Nuxt 3</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/typescript.svg" alt="TypeScript" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">TypeScript</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/tailwind.svg" alt="Tailwind CSS" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">Tailwind CSS</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/pinia.svg" alt="Pinia" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">Pinia</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/nestjs.svg" alt="NestJS" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">NestJS</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/supabase.svg" alt="SupaBase" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">SupaBase</span>
                  </div>
                  <div class="bg-neutral-800 p-6 rounded-lg text-center min-w-[150px] flex flex-col items-center justify-center">
                    <img src="/img/logos/roboflow.svg" alt="RoboFlow" class="h-12 mb-3" />
                    <span class="text-sm text-gray-400">RoboFlow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Animation is handled by the v-motion directive with visibleOnce property
const currentSlide = ref(0);
const scrollPosition = ref(0);
const itemWidth = 180; // 150px width + 30px gap
const totalItems = 8; // Number of unique tech stack items
const techStackContainer = ref<HTMLElement | null>(null);
const techStackSlider = ref<HTMLElement | null>(null);

// Use number type for setTimeout/setInterval in browser environment
const slideInterval = ref<number>(0);

// Auto scroll function for infinite scrolling
const startInfiniteScroll = () => {
  slideInterval.value = window.setInterval(() => {
    scrollPosition.value += 0.5; // Slower speed for smoother scrolling
    
    // Reset position when we've scrolled past the first set of items
    if (scrollPosition.value >= itemWidth * totalItems) {
      // Jump back to start
      scrollPosition.value = 0;
    }
  }, 30); // Slower update for smoother animation
};

onMounted(() => {
  startInfiniteScroll();
});

onUnmounted(() => {
  if (slideInterval.value) {
    window.clearInterval(slideInterval.value);
  }
});
</script>

<style scoped>
/* Add hover effect for tech stack items */
.bg-neutral-800 {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bg-neutral-800:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

/* Make images more vibrant */
img {
  transition: all 0.3s ease;
  filter: brightness(0.9);
  width: auto;
  height: 48px;
  object-fit: contain;
  object-position: center;
}

.bg-neutral-800:hover img {
  filter: brightness(1.1);
  transform: scale(1.05);
}

/* Ensure consistent card sizing */
.bg-neutral-800 {
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style> 