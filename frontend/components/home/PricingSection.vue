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
              Plan the present, build the future
            </h2>
            <p class="text-xl text-gray-400">
              Choose the right plan for your campus with flexible options designed to grow with your needs.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Free Plan -->
            <div class="bg-neutral-900 rounded-xl p-8 relative flex flex-col">
              <div class="mb-8">
                <span class="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Starter
                </span>
                <h3 class="text-2xl font-bold mt-2 text-white">
                  Free
                </h3>
                <div class="mt-4">
                  <span class="text-3xl font-bold text-white">$0</span>
                  <span class="text-gray-400 ml-2">/ month</span>
                </div>
                <p class="mt-4 text-gray-400">
                  Perfect for small campuses looking to test our solution.
                </p>
              </div>
              
              <ul class="space-y-4 mb-8 flex-grow">
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">Up to 50 parking spaces</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">Basic analytics dashboard</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">Email support</span>
                </li>
              </ul>
              
              <UButton class="w-full" color="white" variant="outline">
                Get started for free
              </UButton>
            </div>
            
            <!-- Pro Plan -->
            <div class="bg-neutral-900 rounded-xl p-8 relative flex flex-col">
              <div class="absolute -top-4 right-8">
                <span class="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </span>
              </div>
              
              <div class="mb-8">
                <span class="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Professional
                </span>
                <h3 class="text-2xl font-bold mt-2 text-white">
                  Pro
                </h3>
                <div class="mt-4">
                  <span class="text-3xl font-bold text-white">$199</span>
                  <span class="text-gray-400 ml-2">/ month</span>
                </div>
                <p class="mt-4 text-gray-400">
                  For medium-sized campuses with advanced needs.
                </p>
              </div>
              
              <ul class="space-y-4 mb-8 flex-grow">
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">Up to 500 parking spaces</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">Advanced analytics and reporting</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">Mobile app integration</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">Priority support</span>
                </li>
              </ul>
              
              <UButton class="w-full" color="white">
                Start 14-day free trial
              </UButton>
            </div>
            
            <!-- Enterprise Plan -->
            <div class="bg-neutral-900 rounded-xl p-8 relative flex flex-col">
              <div class="mb-8">
                <span class="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Enterprise
                </span>
                <h3 class="text-2xl font-bold mt-2 text-white">
                  Custom
                </h3>
                <div class="mt-4">
                  <span class="text-3xl font-bold text-white">Custom</span>
                  <span class="text-gray-400 ml-2">pricing</span>
                </div>
                <p class="mt-4 text-gray-400">
                  For large institutions with complex requirements.
                </p>
              </div>
              
              <ul class="space-y-4 mb-8 flex-grow">
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">Unlimited parking spaces</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">Custom integrations</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">Dedicated account manager</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">24/7 phone and email support</span>
                </li>
                <li class="flex items-start">
                  <div class="mr-3 mt-1">
                    <span class="i-heroicons-check-circle text-green-500"></span>
                  </div>
                  <span class="text-gray-400">On-site training and setup</span>
                </li>
              </ul>
              
              <UButton class="w-full" color="white" variant="outline">
                Contact sales
              </UButton>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </section>
</template>

<script setup lang="ts">
// Animation is handled by the v-motion directive with visibleOnce property
</script> 