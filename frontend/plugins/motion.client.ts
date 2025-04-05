// This file only runs on the client side due to the .client.ts naming convention
import { MotionPlugin } from '@vueuse/motion'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Register the MotionPlugin with the Vue app
  nuxtApp.vueApp.use(MotionPlugin)
}) 