<template>
  <FormWithImageLayout background-image="/fondo2.png">
    <v-card class="align-self-center px-5 py-5" outlined :min-width="400">
      <!-- Error alert -->
      <v-alert v-if="error" type="error" dismissible :max-width="400">
        aun no
      </v-alert>

      <!-- Login Form-->
      <v-card-title class="mb-3">
        <div class="flex-grow-1 flex-shrink-0">
          <v-img src="/LogoScrum.png" contain :max-width="110" />
        </div>
        <span class="mx-2"></span>
        <div class="flex-grow-0 flex-shrink-0">
          <v-img src="/UPN_withe.png" :max-width="150" />
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="" v-model="valid" class="text-center" lazy-validation @submit.prevent="onLogin">

          <v-text-field v-model="user.username" label='Usuario' outlined rounded color="primary"
            :rules="usernameRules" />

          <PasswordField v-model="user.password" label='Contraseña' min="6" outlined rounded color="primary"
            :rules="passwordRules" />

          <div class="text-right">
            <v-btn small color="primary" text rounded to="/forgot-your-password">
              Olvidaste Contraseña
            </v-btn>
          </div>

          <v-btn class="mt-5 black--text" type="submit" color="primary" :loading="busy" large rounded>
            <v-icon class="mr-3">mdi-login-variant</v-icon>
            Iniciar Sesión
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </FormWithImageLayout>
</template>

<script>

export default {
  async fetch() {
    await Promise.all([
      // // this.$store.dispatch(`etiquetaIdioma/${FETCH_ETIQUETA_IDIOMA}`, {
      // //   currentIdioma: { idIdioma: this.selectedIdioma },
      // // }),
      // this.fetchLabelsByLanguage(this.selectedIdioma),
    ])
  },
  layout: 'empty',
  auth: false,
  progress: false,
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      busy: false,
      valid: true,
      error: undefined,
    }
  },
  computed: {

    usernameRules() {
      return [(value) => !!value || 'Ingrese Nombre de Usuario' || '']
    },
    passwordRules() {
      return [(value) => !!value || 'Ingrese Contraseña' || '']
    },
  },
  methods: {
    // etiqueta(nombre) {
    //   for (let i = 0; i < this.etiquetaIdioma.length; ++i) {
    //     if (this.etiquetaIdioma[i].labelKey === nombre) {
    //       return this.etiquetaIdioma.descripcion
    //     }
    //   }
    // },
    // async fetchLabelsByLanguage(value) {
    //   await this.$store.dispatch(`etiquetaIdioma/${FETCH_ETIQUETA_IDIOMA}`, {
    //     currentIdioma: { idIdioma: value },
    //   })
    // },
    async onLogin() {
      // if (!this.$refs.loginForm.validate()) {
      //   return
      // }
      debugger
      this.busy = true

      try {
        // const payload = {
        //     nombreUsuario: 1 //this.user.username,
        //     // secreto: this.user.password,
        // }
        const nombreUsuario = 1

         await this.$auth.loginWith('local', nombreUsuario)

        const URL = '/tablero'
        this.$router.push(URL)
      } catch (err) {
        this.error = 'Error de inicio de sesion'
      } finally {
        this.busy = false
      }
    },
  },
}
</script>
