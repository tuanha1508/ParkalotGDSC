<template>
  <!-- Navigation Bar -->
  <nav class="bg-black fixed w-full top-0 z-50 h-auto min-h-10 flex items-center">
    <div 
      class="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex items-center justify-between h-full py-2"
    >
      <!-- Logo and Parking text -->
      <ClientOnly>
        <div 
          class="flex items-center"
        >
          <NuxtLink to="/" class="flex items-center" @click="scrollToTop">
            <img src="/logo.png" alt="Logo" class="h-10 w-10 sm:h-12 sm:w-12 mr-2" />
            <span class="text-white text-sm font-normal tracking-wider">Parkalot</span>
          </NuxtLink>
        </div>
        <template #fallback>
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center" @click="scrollToTop">
              <img src="/logo.png" alt="Logo" class="h-10 w-10 sm:h-12 sm:w-12 mr-2" />
              <span class="text-white text-sm font-normal tracking-wider">Parkalot</span>
            </NuxtLink>
          </div>
        </template>
      </ClientOnly>
      
      <!-- Mobile Menu Button -->
      <ClientOnly>
        <div 
          class="md:hidden flex items-center"
        >
          <button @click="isOpen = !isOpen" class="flex items-center p-1">
            <UIcon v-if="!isOpen" name="i-mdi-menu" class="text-white text-lg sm:text-xl" />
            <UIcon v-else name="i-mdi-close" class="text-white text-lg sm:text-xl" />
          </button>
        </div>
        <template #fallback>
          <div class="md:hidden flex items-center">
            <button @click="isOpen = !isOpen" class="flex items-center p-1">
              <UIcon v-if="!isOpen" name="i-mdi-menu" class="text-white text-lg sm:text-xl" />
              <UIcon v-else name="i-mdi-close" class="text-white text-lg sm:text-xl" />
            </button>
          </div>
        </template>
      </ClientOnly>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex flex-1 items-center justify-center space-x-4 lg:space-x-6">
        <ClientOnly>
          <template v-for="(link, index) in navLinks" :key="link.to">
            <NuxtLink 
              :to="link.to" 
              :class="[
                'text-xs font-medium relative group transition-colors duration-300',
                isActive(link.to) ? 'text-white' : 'text-navTitle hover:text-white'
              ]"
              @click="scrollToTop"
            >
              {{ link.text }}
              <span 
                :class="[
                  'absolute bottom-0 left-0 h-[1px] bg-white rounded-full transition-all duration-300',
                  isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                ]"
              ></span>
            </NuxtLink>
          </template>
          <template #fallback>
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.to" 
              :to="link.to" 
              :class="[
                'text-xs font-medium relative group transition-colors duration-300',
                isActive(link.to) ? 'text-white' : 'text-navTitle hover:text-white'
              ]"
              @click="scrollToTop"
            >
              {{ link.text }}
              <span 
                :class="[
                  'absolute bottom-0 left-0 h-[1px] bg-white rounded-full transition-all duration-300',
                  isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                ]"
              ></span>
            </NuxtLink>
          </template>
        </ClientOnly>
      </div>
      
      <!-- Space holder for desktop alignment -->
      <div class="hidden md:block w-20"></div>
    </div>
  </nav>
  
  <!-- Mobile Menu -->
  <ClientOnly>
    <div 
      v-if="isOpen" 
      class="md:hidden fixed inset-0 z-40 bg-black pt-16"
    >
      <div class="container mx-auto px-4 py-5 flex flex-col">
        <div class="flex flex-col space-y-4 mb-8">
          <NuxtLink 
            v-for="(link, index) in navLinks" 
            :key="link.to"
            @click="closeMenuAndScrollToTop" 
            :to="link.to" 
            :class="[
              'text-lg font-medium py-2 relative group transition-colors duration-300',
              isActive(link.to) ? 'text-white' : 'text-navTitle hover:text-white'
            ]"
          >
            {{ link.text }}
            <span 
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300',
                isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
              ]"
            ></span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <template #fallback>
      <div 
        v-if="isOpen" 
        class="md:hidden fixed inset-0 z-40 bg-black pt-16"
      >
        <div class="container mx-auto px-4 py-5 flex flex-col">
          <div class="flex flex-col space-y-4 mb-8">
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.to"
              @click="closeMenuAndScrollToTop" 
              :to="link.to" 
              :class="[
                'text-lg font-medium py-2 relative group transition-colors duration-300',
                isActive(link.to) ? 'text-white' : 'text-navTitle hover:text-white'
              ]"
            >
              {{ link.text }}
              <span 
                :class="[
                  'absolute bottom-0 left-0 h-[1px] bg-white rounded-full transition-all duration-300',
                  isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                ]"
              ></span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isOpen = ref(false)

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/about', text: 'About' },
  { to: '/park', text: 'Park Here' }
]

// Check if route is active
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === path
  }
  return route.path.startsWith(path)
}

const scrollToTop = () => {
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
}

const closeMenuAndScrollToTop = () => {
  isOpen.value = false
  scrollToTop()
}

// Ensure scroll to top when component mounts (important for page refresh)
onMounted(() => {
  scrollToTop()
})
</script> 