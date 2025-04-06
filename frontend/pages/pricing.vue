<template>
  <div class="container mx-auto py-12 px-4">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold mb-4">Pricing Plans</h1>
      <p class="text-lg text-gray-400 max-w-2xl mx-auto">
        Choose the perfect plan for your needs. All plans include our core features.
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <!-- Basic Plan -->
      <div class="bg-surface rounded-lg shadow-lg p-8 border-t-4 border-gray-400">
        <h2 class="text-xl font-bold mb-4">Basic</h2>
        <div class="mb-6">
          <span class="text-3xl font-bold">$9</span>
          <span class="text-gray-400">/month</span>
        </div>
        <ul class="space-y-3 mb-8">
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Basic feature 1</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Basic feature 2</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Basic feature 3</span>
          </li>
        </ul>
        <UButton color="gray" variant="solid" class="bg-white !text-black hover:bg-gray-100" block>Get Started</UButton>
      </div>
      
      <!-- Pro Plan -->
      <div class="bg-surface rounded-lg shadow-lg p-8 border-t-4 border-primary-500 transform md:scale-105 z-10">
        <div class="absolute -top-3 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Popular
        </div>
        <h2 class="text-xl font-bold mb-4">Pro</h2>
        <div class="mb-6">
          <span class="text-3xl font-bold">$19</span>
          <span class="text-gray-400">/month</span>
        </div>
        <ul class="space-y-3 mb-8">
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Everything in Basic</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Pro feature 1</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Pro feature 2</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Pro feature 3</span>
          </li>
        </ul>
        <UButton color="primary" variant="solid" class="bg-white !text-black hover:bg-gray-100" block>Get Started</UButton>
      </div>
      
      <!-- Enterprise Plan -->
      <div class="bg-surface rounded-lg shadow-lg p-8 border-t-4 border-purple-500">
        <h2 class="text-xl font-bold mb-4">Enterprise</h2>
        <div class="mb-6">
          <span class="text-3xl font-bold">$49</span>
          <span class="text-gray-400">/month</span>
        </div>
        <ul class="space-y-3 mb-8">
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Everything in Pro</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Enterprise feature 1</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Enterprise feature 2</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            <span>Enterprise feature 3</span>
          </li>
        </ul>
        <UButton color="purple" variant="solid" block>Contact Us</UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script> 