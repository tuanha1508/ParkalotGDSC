<template>
  <div class="min-h-screen bg-background text-white">
    <Navbar />
    
    <main class="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-10">
      <PageTransition>
        <slot />
      </PageTransition>
    </main>
    
    <footer 
      class="bg-black border-t border-gray-800 py-2"
    >
      <div class="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        <div class="flex flex-col md:flex-row gap-3">
          <!-- Logo (Larger) - On the same line with footer items -->
          <div 
            class="w-full md:w-1/5 pl-0 -mt-1"
          >
            <NuxtLink to="/" class="inline-block">
              <img src="/logo.png" alt="Parkalot Logo" class="h-28 w-auto" />
            </NuxtLink>
          </div>
          
          <!-- Navigation Links -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-0 w-full md:w-4/5 md:pl-2 mt-1">
            <!-- Features Column -->
            <div>
              <h3 class="text-white font-normal mb-0 text-xs">Features</h3>
              <ul class="space-y-0">
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">Plan</a></li>
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">Build</a></li>
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">Insights</a></li>
              </ul>
            </div>
            
            <!-- Product Column -->
            <div>
              <h3 class="text-white font-normal mb-0 text-xs">Product</h3>
              <ul class="space-y-0">
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">Pricing</a></li>
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">Method</a></li>
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">Integrations</a></li>
              </ul>
            </div>
            
            <!-- Company Column -->
            <div>
              <h3 class="text-white font-normal mb-0 text-xs">Company</h3>
              <ul class="space-y-0">
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">About</a></li>
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">Customers</a></li>
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">Careers</a></li>
              </ul>
            </div>
            
            <!-- Resources Column -->
            <div>
              <h3 class="text-white font-normal mb-0 text-xs">Resources</h3>
              <ul class="space-y-0">
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">API</a></li>
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">Status</a></li>
                <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xxs">Documentation</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Social Icons and Copyright - Integrated within the footer section -->
        <ClientOnly>
          <div 
            class="mt-1 flex flex-col md:flex-row justify-center items-center pt-0"
          >
            <p class="text-xxs text-gray-400 mb-1 md:mb-0 text-center">
              &copy; {{ new Date().getFullYear() }} Parkalot. All rights reserved.
            </p>
            <div class="flex space-x-5 md:ml-6">
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                <UIcon name="i-mdi-github" class="text-base" aria-label="GitHub" />
              </a>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                <UIcon name="i-mdi-twitter" class="text-base" aria-label="Twitter" />
              </a>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                <UIcon name="i-mdi-facebook" class="text-base" aria-label="Facebook" />
              </a>
            </div>
          </div>
        </ClientOnly>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Auth functionality has been removed
</script> 