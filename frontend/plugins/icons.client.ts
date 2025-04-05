// This file only runs on the client side due to the .client.ts naming convention
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Client-side only code for icon rendering
  // This ensures icons don't cause SSR issues
}) 