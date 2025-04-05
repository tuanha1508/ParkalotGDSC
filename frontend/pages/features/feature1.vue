<template>
  <div class="container mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold mb-6">Feature 1</h1>
    <p class="text-lg mb-4">
      This is a detailed page about Feature 1. Add your specific feature content here.
    </p>
    <div class="bg-surface rounded-lg shadow p-6 mt-8">
      <h2 class="text-xl font-semibold mb-4">Feature Highlights</h2>
      <ul class="space-y-2">
        <li class="flex items-start">
          <span class="text-primary-500 mr-2">✓</span>
          <span>Key benefit one of Feature 1</span>
        </li>
        <li class="flex items-start">
          <span class="text-primary-500 mr-2">✓</span>
          <span>Key benefit two of Feature 1</span>
        </li>
        <li class="flex items-start">
          <span class="text-primary-500 mr-2">✓</span>
          <span>Key benefit three of Feature 1</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script> 