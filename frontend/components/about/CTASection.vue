<template>
  <section class="py-20 border-t border-white/20">
    <div class="max-w-6xl mx-auto px-4">
      <div
        ref="headerRef"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="mb-12"
      >
        <h2 class="text-3xl font-bold mb-4">Plan for success, build for the future</h2>
        <p class="text-white/70 max-w-2xl">
          Choose the plan that best fits your needs. From individual drivers to enterprise parking networks,
          we have flexible solutions that scale with your requirements.
        </p>
      </div>
      
      <div
        ref="pricingRef"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="grid grid-cols-1 md:grid-cols-6 gap-8 mt-12 bg-gray-900/40 p-8 rounded-xl border border-white/10"
      >
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium mb-2">Free</h3>
          <p class="text-white/60 mb-2">For small teams</p>
          <p class="text-2xl font-bold mb-3">$0</p>
          <ul class="text-sm text-white/70 space-y-2 mb-4">
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Basic parking finder</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Up to 3 saved locations</span>
            </li>
          </ul>
        </div>
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium mb-2">Standard</h3>
          <p class="text-white/60 mb-2">For growing teams</p>
          <p class="text-2xl font-bold mb-3">$9</p>
          <ul class="text-sm text-white/70 space-y-2 mb-4">
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Advanced parking finder</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Up to 10 saved locations</span>
            </li>
          </ul>
        </div>
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium mb-2">Plus</h3>
          <p class="text-white/60 mb-2">For larger teams</p>
          <p class="text-2xl font-bold mb-3">$29</p>
          <ul class="text-sm text-white/70 space-y-2 mb-4">
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Real-time availability</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Permit management</span>
            </li>
          </ul>
        </div>
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium mb-2">Pro</h3>
          <p class="text-white/60 mb-2">For organizations</p>
          <p class="text-2xl font-bold mb-3">$49</p>
          <ul class="text-sm text-white/70 space-y-2 mb-4">
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Admin dashboard</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Analytics and reporting</span>
            </li>
          </ul>
        </div>
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium mb-2">Enterprise</h3>
          <p class="text-white/60 mb-2">For large enterprises</p>
          <p class="text-2xl font-bold mb-3">Contact</p>
          <ul class="text-sm text-white/70 space-y-2 mb-4">
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Custom solutions</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>24/7 dedicated support</span>
            </li>
          </ul>
        </div>
        <div class="md:col-span-1 flex items-end">
          <UButton 
            class="bg-white !text-black border border-white hover:bg-gray-100 hover:text-black transition-all duration-300" 
            style="background-color: #FFFFFF !important; color: #000000 !important; border: none !important;"
            block
          >
            Get Started
          </UButton>
        </div>
      </div>
      
      <div
        ref="contactRef"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
        class="mt-16 text-center"
      >
        <h3 class="text-xl font-semibold mb-4">Need a custom solution?</h3>
        <p class="text-white/70 mb-6 max-w-2xl mx-auto">
          Our team of parking experts is ready to help you design the perfect solution for your organization's needs.
          Contact us today for a personalized consultation.
        </p>
        <UButton 
          variant="outline"
          class="border-white/20 text-white hover:bg-white/10"
        >
          Contact Sales
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import { ref } from 'vue'

// Refs for motion animations
const headerRef = ref(null)
const pricingRef = ref(null)
const contactRef = ref(null)

// Set up motion animations
useMotion(headerRef)
useMotion(pricingRef)
useMotion(contactRef)
</script> 