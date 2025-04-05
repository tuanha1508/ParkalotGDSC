<template>
  <section class="relative pt-10 md:pt-16 pb-16 overflow-hidden bg-black">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div class="w-full md:w-1/2 md:text-left text-center">
          <client-only>
            <h1 
              v-motion 
              :initial="{ opacity: 0, y: 30 }" 
              :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
              class="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight tracking-tight whitespace-nowrap"
            >
              Never circle for parking again
            </h1>
          </client-only>
          
          <client-only>
            <p 
              v-motion 
              :initial="{ opacity: 0, y: 30 }" 
              :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
              class="text-sm sm:text-base text-gray-300 mb-8"
            >
              Our app helps you find available parking spots in real-time, saving you time and reducing stress. Know exactly where to park before you arrive.
            </p>
          </client-only>
          
          <client-only>
            <div 
              v-motion 
              :initial="{ opacity: 0, y: 30 }" 
              :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }"
              class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
            >
              <NuxtLink to="/park">
                <UButton 
                  size="md" 
                  class="text-sm font-medium bg-transparent text-white border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto px-6 py-2"
                >
                  Get Started
                </UButton>
              </NuxtLink>
              <UButton 
                size="md" 
                variant="link"
                class="text-sm font-medium text-white hover:text-gray-300 transition-all duration-300 w-full sm:w-auto px-4 py-2"
                @click="scrollToImage"
              >
                Watch Demo
              </UButton>
            </div>
          </client-only>
        </div>

        <div class="w-full md:w-1/2 flex justify-center md:justify-end">
          <client-only>
            <div 
              v-motion 
              :initial="{ opacity: 0, scale: 0.9 }" 
              :enter="{ opacity: 1, scale: 1, transition: { delay: 600 } }"
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
          v-motion 
          :initial="{ opacity: 0, y: 40 }" 
          :enter="{ opacity: 1, y: 0, transition: { delay: 700 } }"
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