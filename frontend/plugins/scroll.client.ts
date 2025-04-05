import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Reset scroll position on page changes and refreshes
  nuxtApp.hooks.hook('page:finish', () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  
  // Also reset scroll on initial page load
  if (process.client) {
    window.onload = () => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }
}) 