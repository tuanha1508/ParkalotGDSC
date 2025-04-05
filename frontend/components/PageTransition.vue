<template>
  <ClientOnly>
    <div
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      :leave="{ opacity: 0, y: -40, transition: { duration: 600, ease: 'easeIn' } }"
      class="w-full"
    >
      <slot />
    </div>
    <template #fallback>
      <div class="w-full">
        <slot />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
// PageTransition component using VueUse Motion - only used on client side
</script> 