// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['vuetify-nuxt-module'],
  css: ['@progress/kendo-theme-default/dist/all.css', '@grapecity/wijmo.styles/wijmo.css'],
  typescript: {
    strict: false,
  },
})
