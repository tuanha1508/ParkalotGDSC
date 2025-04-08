// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/google-fonts', {
      families: {
        'Varela Round': true
      },
      display: 'swap',
      download: true
    }]
  ],

  // Add runtime config for API keys
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'
    }
  },

  ui: {
    global: true
  },

  icon: {
    size: '24px',
    aliases: {
      'heroicons': 'heroicons',
      'mdi': 'mdi'
    }
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },

  app: {
    head: {
      title: 'Parkalot',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: https://*.vercel.app https://vercel.live;"
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
      appear: true
    }
  },

  typescript: {
    strict: true
  },

  css: ['~/assets/scss/main.scss'],
  compatibilityDate: '2025-04-03',
  
  // Always transpile @vueuse/motion regardless of environment
  build: {
    transpile: ['@vueuse/motion']
  },
  
  // Fix for Windows path issues with ESM
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  }
})