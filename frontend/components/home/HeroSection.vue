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
              class="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight tracking-tight"
            >
              Smart Parking Solutions <br class="hidden sm:block"> for Effortless Urban Mobility
            </h1>
          </client-only>
          
          <client-only>
            <p 
              v-motion 
              :initial="{ opacity: 0, y: 30 }" 
              :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
              class="text-sm sm:text-base text-gray-300 mb-8"
            >
              Leveraging technology to simplify parking. Find spots faster, manage payments easily, and improve overall efficiency.
            </p>
          </client-only>
          
          <client-only>
            <div 
              v-motion 
              :initial="{ opacity: 0, y: 30 }" 
              :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }"
              class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
            >
              <div class="relative group inline-block">
                <NuxtLink to="/park" class="no-underline">
                  <UButton 
                    size="sm" 
                    class="text-xs font-medium bg-white !text-black rounded-full hover:bg-gray-100 w-full sm:w-auto px-6 py-2 border-0 shadow-none"
                    color="white"
                  >
                    Get Started
                  </UButton>
                </NuxtLink>
              </div>
              
              <div class="relative group inline-block">
                <NuxtLink to="/about" class="no-underline">
                  <UButton 
                    size="sm"
                    variant="ghost" 
                    class="text-xs font-medium !text-white hover:text-gray-300 w-full sm:w-auto px-3 py-1 no-underline border-0 shadow-none outline-none focus:outline-none focus:ring-0"
                  >
                    Explore Features →
                  </UButton>
                </NuxtLink>
              </div>
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
                alt="Company Logo"
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
        >
          <div class="rounded-lg overflow-hidden shadow-xl shadow-black/30 border border-neutral-800">
            <img 
              src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" 
              alt="Parking management dashboard interface"
              class="w-full h-auto"
            />
          </div>
        </div>
      </client-only>

    </div>
  </section>
</template>

<script setup lang="ts">
// No special script logic needed for this component
</script>

<style scoped>
/* Force consistent button styling */
:deep(.u-button) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  letter-spacing: 0.025em;
}

:deep(.u-button--white) {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}

:deep(.u-button--ghost) {
  background-color: transparent;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
</style> 