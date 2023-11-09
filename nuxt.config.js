import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ProyectoScrum',
    title: 'ProyectoScrum',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/services.js', '@/plugins/axios.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth','vuetify-dialog/nuxt','primevue/nuxt'],

  primevue: {
    components: ["DataTable", "Column", "Row", "ColumnGroup","ProgressBar"]
  },
  axios: {
    baseURL: 'http://localhost:90',
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },
  router: {
    middleware: ['auth'],
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss', '~/assets/styles.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#ffffff',
          accent: colors.grey.darken3,
          secondary: '#28292b',
          info: colors.teal.lighten1,
          warning: '#FFC0CB',
          error: '#FFC0CB',
          success: colors.green.accent3,
          text: '#ffffff',
          textito: "#929194"
        },
        light: {
          primary: '#ffffff',
          secondary: '#f2f1f6',
          accent: '#6d76bc',
          error: '#FFC0CB',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC0CB',
          text: '#ffffff',
          textito: "#929194"
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["primevue"]
  },

  // Auth Configuration
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            Headers: { 'Content-Type': 'application/json' },
            url: '/auth/login',
            method: 'post',
          },
          logout: true,
          user: {
            url: '/auth/user',
            method: 'get',
            propertyName: false,
            // Agregar la opción customTokenRequest aquí
            // customTokenRequest: (token) => {
            //   return {
            //     headers: {
            //       Authorization: `Bearer ${token}`, // Agregar el token al encabezado de autorización
            //     },
            //   };
            // },
          },
        },
      },
    },
  },
}