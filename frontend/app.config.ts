// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineAppConfig({
  title: 'Parkalot',
  description: 'School parking tracking system for vehicle management',
  theme: {
    dark: true,
    colors: {
      primary: '#000000'
    }
  },
  ui: {
    primary: 'black',
    gray: 'slate',
    notification: {
      position: 'top-right'
    }
  }
}) 