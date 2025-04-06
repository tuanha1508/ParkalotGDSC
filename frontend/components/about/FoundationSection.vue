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
        <h2 class="text-3xl font-bold mb-4">Built on strong foundations</h2>
        <p class="text-white/70 max-w-2xl">
          Our platform is engineered with enterprise-grade standards at every level, ensuring reliability, 
          security, and performance that you can depend on day after day.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div
          ref="security"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
          class="p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
            <span class="i-heroicons-shield-check text-xl"></span>
          </div>
          <h3 class="text-lg font-medium mb-2">Enterprise-grade security</h3>
          <p class="text-white/60 mb-4">SOC 2 compliant with advanced security features to protect your organization's data.</p>
          <ul class="text-sm text-white/70 space-y-2">
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>End-to-end encryption for all data</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Regular security audits and penetration testing</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Multi-factor authentication support</span>
            </li>
          </ul>
        </div>
        <div
          ref="performance"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
          class="p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
            <span class="i-heroicons-bolt text-xl"></span>
          </div>
          <h3 class="text-lg font-medium mb-2">Lightning fast experience</h3>
          <p class="text-white/60 mb-4">Built for speed with keyboard shortcuts and instant navigation for maximum productivity.</p>
          <ul class="text-sm text-white/70 space-y-2">
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Optimized API calls and caching</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Global CDN for consistent performance</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Real-time updates with WebSockets</span>
            </li>
          </ul>
        </div>
        <div
          ref="infrastructure"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
          class="p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
            <span class="i-heroicons-cloud text-xl"></span>
          </div>
          <h3 class="text-lg font-medium mb-2">Reliable infrastructure</h3>
          <p class="text-white/60 mb-4">99.9% uptime with full redundancy and backups ensuring your operations never miss a beat.</p>
          <ul class="text-sm text-white/70 space-y-2">
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Multi-region deployment architecture</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>Automated failover and disaster recovery</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-400 mt-0.5" />
              <span>24/7 monitoring and support team</span>
            </li>
          </ul>
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
const security = ref(null)
const performance = ref(null)
const infrastructure = ref(null)

// Set up motion animations
useMotion(headerRef)
useMotion(security)
useMotion(performance)
useMotion(infrastructure)
</script> 