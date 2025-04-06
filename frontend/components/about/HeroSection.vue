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
              <div class="relative inline-block">
                <NuxtLink to="/park" class="no-underline">
                  <UButton 
                    size="sm" 
                    class="text-xs font-medium bg-white text-black rounded-full w-full sm:w-auto px-6 py-2"
                    style="background-color: #FFFFFF !important; color: #000000 !important; border: none !important;"
                  >
                    Get Started
                  </UButton>
                </NuxtLink>
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
              :initial="{ opacity: 0, scale: 0.6, y: 40, rotateZ: -8 }" 
              :enter="{ 
                opacity: [0, 0.5, 1], 
                scale: [0.6, 1.05, 1], 
                y: [40, -10, 0], 
                rotateZ: [-8, 4, 0],
                transition: { 
                  duration: 1200,
                  ease: [0.25, 0.1, 0.25, 1]
                }
              }"
              class="relative max-w-md w-full logo-container"
            >
              <img 
                src="/logo.png" 
                alt="Parkalot Logo"
                class="w-full h-auto logo-image"
              />
              <div class="logo-glow"></div>
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
          <div v-if="!isVideoPlaying" class="rounded-lg overflow-hidden shadow-xl shadow-black/30 border border-neutral-800 flex items-center justify-center h-80 bg-black">
            <p class="text-white/60">Dashboard Preview</p>
          </div>
          <div v-else class="rounded-lg overflow-hidden shadow-xl shadow-black/30 border border-neutral-800 bg-black">
            <video
              ref="videoRef"
              class="w-full h-auto"
              controls
              autoplay
              src="/demo.mkv"
            ></video>
          </div>
        </div>
      </client-only>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import { ref, onMounted } from 'vue'

// Refs for motion animations
const titleRef = ref(null)
const additionalInfoRef = ref(null)
const buttonsRef = ref(null)
const logoRef = ref(null)
const demoRef = ref(null)
const videoRef = ref(null)
const isVideoPlaying = ref(false)

// Set up motion animations
useMotion(titleRef)
useMotion(additionalInfoRef)
useMotion(buttonsRef)
useMotion(logoRef)
useMotion(demoRef)

// Add subtle floating animation to logo after initial animation
onMounted(() => {
  setTimeout(() => {
    if (logoRef.value) {
      const element = logoRef.value;
      const animation = element.animate([
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-8px)' },
        { transform: 'translateY(0px)' }
      ], {
        duration: 3000,
        iterations: Infinity,
        easing: 'ease-in-out'
      });
    }
  }, 1500); // Start after main animation completes
})

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
    
    // Start playing the video after scrolling
    isVideoPlaying.value = true;
    
    // If the video element exists, make sure it plays
    if (videoRef.value) {
      setTimeout(() => {
        videoRef.value.play();
      }, 300);
    }
  }
}
</script>

<style scoped>
.logo-container {
  position: relative;
  perspective: 1200px;
  transform-style: preserve-3d;
}

.logo-image {
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.15));
  transition: filter 0.6s ease-in-out;
}

.logo-image:hover {
  filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.3));
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.2); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
}
</style> 