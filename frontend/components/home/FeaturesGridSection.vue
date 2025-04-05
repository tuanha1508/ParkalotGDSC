<template>
  <section class="py-24 md:py-32 bg-black relative">
    <div class="container mx-auto px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Feature 1 -->
          <client-only>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
              class="bg-neutral-900 rounded-xl p-8"
            >
              <div class="flex flex-col h-full">
                <div class="mb-6">
                  <span class="text-sm text-gray-400 font-medium">FEATURE</span>
                  <h3 class="text-xl font-semibold mt-2 text-white">
                    Smart Navigation
                  </h3>
                </div>
                <p class="text-gray-400 mb-6 flex-grow">
                  Direct drivers to available parking spots with precision, eliminating frustration and saving time.
                </p>
                <div class="rounded-lg overflow-hidden bg-neutral-800">
                  <img 
                    src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Smart navigation interface" 
                    class="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </client-only>
          
          <!-- Feature 2 -->
          <client-only>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
              class="bg-neutral-900 rounded-xl p-8"
            >
              <div class="flex flex-col h-full">
                <div class="mb-6">
                  <span class="text-sm text-gray-400 font-medium">ANALYTICS</span>
                  <h3 class="text-xl font-semibold mt-2 text-white">
                    Usage Insights
                  </h3>
                </div>
                <p class="text-gray-400 mb-6 flex-grow">
                  Gain valuable data on parking patterns, peak hours, and user behavior to optimize your operations.
                </p>
                <div class="rounded-lg overflow-hidden bg-neutral-800">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Analytics dashboard" 
                    class="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </client-only>
          
          <!-- Feature 3 -->
          <client-only>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
              class="bg-neutral-900 rounded-xl p-8"
            >
              <div class="flex flex-col h-full">
                <div class="mb-6">
                  <span class="text-sm text-gray-400 font-medium">SECURITY</span>
                  <h3 class="text-xl font-semibold mt-2 text-white">
                    Access Control
                  </h3>
                </div>
                <p class="text-gray-400 mb-6 flex-grow">
                  Manage who can access specific parking areas with robust permission systems and role-based controls.
                </p>
                <div class="rounded-lg overflow-hidden bg-neutral-800">
                  <img 
                    src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Security access control interface" 
                    class="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </client-only>
          
          <!-- Feature 4 -->
          <client-only>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
              class="bg-neutral-900 rounded-xl p-8"
            >
              <div class="flex flex-col h-full">
                <div class="mb-6">
                  <span class="text-sm text-gray-400 font-medium">PAYMENTS</span>
                  <h3 class="text-xl font-semibold mt-2 text-white">
                    Seamless Transactions
                  </h3>
                </div>
                <p class="text-gray-400 mb-6 flex-grow">
                  Process parking payments effortlessly with multiple payment options and automated billing capabilities.
                </p>
                <div class="rounded-lg overflow-hidden bg-neutral-800">
                  <img 
                    src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Payment processing interface" 
                    class="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Animation is handled by the v-motion directive
</script> 