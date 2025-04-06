<template>
  <section class="relative pt-20 md:pt-24 pb-16 overflow-hidden bg-black">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div class="w-full md:w-1/2 md:text-left text-center">
          <client-only>
            <h1 
              ref="titleRef"
              v-motion 
              :initial="{ opacity: 0, y: 30 }" 
              :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
              class="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight tracking-tight whitespace-nowrap"
            >
              Park smarter, not harder
            </h1>
          </client-only>
          
          <client-only>
            <p 
              ref="additionalInfoRef"
              v-motion 
              :initial="{ opacity: 0, y: 30 }" 
              :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
              class="text-sm text-gray-400 mb-6"
            >
              Parkalot uses IoT sensors and AI to guide drivers to available parking spaces, reducing congestion and saving time.
            </p>
          </client-only>
          
          <client-only>
            <div 
              ref="buttonsRef"
              v-motion 
              :initial="{ opacity: 0, y: 30 }" 
              :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
              class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
            >
              <div class="relative group inline-block">
                <NuxtLink to="/park" class="no-underline">
                  <UButton 
                    size="sm" 
                    class="text-xs font-medium bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto px-6 py-2"
                    style="background-color: #FFFFFF !important; color: #000000 !important; border: none !important;"
                  >
                    Get Started
                  </UButton>
                </NuxtLink>
                <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[1px] bg-black rounded-full transition-all duration-300 w-0 group-hover:w-4/5"></span>
              </div>
              
              <div class="relative group inline-block">
                <UButton 
                  size="sm"
                  variant="ghost"
                  class="text-xs font-medium text-white hover:text-gray-300 transition-all duration-300 w-full sm:w-auto px-3 py-1 no-underline border-none outline-none focus:outline-none focus:ring-0 focus:border-0 active:outline-none"
                  @click="scrollToImage"
                >
                  Watch Demo
                </UButton>
                <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[1px] bg-white rounded-full transition-all duration-300 w-0 group-hover:w-4/5"></span>
              </div>
            </div>
          </client-only>
        </div>

        <div class="w-full md:w-1/2 flex justify-center md:justify-end">
          <client-only>
            <div 
              ref="logoRef"
              v-motion 
              :initial="{ opacity: 0, scale: 0.9 }" 
              :visibleOnce="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 300 } }"
              class="relative max-w-md w-full"
            >
              <img 
                src="/logo.png" 
                alt="Parkalot Logo"
                class="w-full h-auto"
              />
            </div>
          </client-only>
        </div>

      </div>

      <client-only>
        <div 
          ref="demoRef"
          v-motion 
          :initial="{ opacity: 0, y: 40 }" 
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 400 } }"
          class="max-w-5xl mx-auto relative mt-12"
          id="demoImage"
        >
          <div class="rounded-lg overflow-hidden shadow-xl shadow-black/30 border border-neutral-800 flex items-center justify-center h-80 bg-black">
            <p class="text-white/60">Dashboard Preview</p>
          </div>
        </div>
      </client-only>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import { ref } from 'vue'

// Refs for motion animations
const titleRef = ref(null)
const additionalInfoRef = ref(null)
const buttonsRef = ref(null)
const logoRef = ref(null)
const demoRef = ref(null)

// Set up motion animations
useMotion(titleRef)
useMotion(additionalInfoRef)
useMotion(buttonsRef)
useMotion(logoRef)
useMotion(demoRef)

// Hero section component for the About page
const scrollToImage = () => {
  const element = document.getElementById('demoImage');
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
</script> 