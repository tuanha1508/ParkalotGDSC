// This file only runs on the client side due to the .client.ts naming convention
import { MotionPlugin } from '@vueuse/motion'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Register the MotionPlugin with the Vue app
  nuxtApp.vueApp.use(MotionPlugin)

  nuxtApp.vueApp.directive('motion-client', {
    mounted(el, binding) {
      if (process.client) {
        el.setAttribute('v-motion', '')
        el.setAttribute(':initial', '{ opacity: 0, y: 20 }')
        el.setAttribute(':visibleOnce', '{ opacity: 1, y: 0, transition: { duration: 500 } }')
        
        // Add delay if provided in the argument
        if (binding.arg) {
          const delay = parseInt(binding.arg)
          if (!isNaN(delay)) {
            el.setAttribute(':visibleOnce', `{ opacity: 1, y: 0, transition: { duration: 500, delay: ${delay} } }`)
          }
        }
        
        // Add any custom options from the value
        if (binding.value) {
          Object.entries(binding.value).forEach(([key, val]) => {
            el.setAttribute(`:${key}`, JSON.stringify(val))
          })
        }
      }
    }
  })
}) 