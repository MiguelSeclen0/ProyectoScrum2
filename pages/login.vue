<template>
  <FormWithImageLayout background-image="/fondo.png">
    <div style="position: absolute; top: 0; left: 0;"><v-img src="/LogoScrum.png" contain :max-width="400" /></div>
    <div class="align-self-center px-5 py-5" outlined style="width: 600px">
      <!-- Error alert -->
      <v-alert v-if="error" type="error" dismissible :max-width="600">
        {{ error }}
      </v-alert>

      <!-- Login Form-->
      <v-card-title class="mb-3">
        <v-col>
          <span class="mx-2 text-large displayBlock" style="margin-bottom: 6%;color: #ffff">Bienvenido</span>
          <span class="mx-2 text-small displayBlock" style="color: #a59599">Ingrese sus credenciales</span>
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-form ref="loginForm" v-model="valid" class="text-center" lazy-validation @submit.prevent="onLogin">
          <v-text-field v-model="user.username" label='Usuario' solo rounded :rules="usernameRules" />

          <PasswordField v-model="user.password" label='Contraseña' min="6" solo rounded style="background-color;:#e3e3e3"
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
    </div>
    <div style="position: absolute; bottom: 0; right: 0;"><v-img src="/UPN_withe.png" :max-width="200" /></div>
  </FormWithImageLayout>
</template>

<script>

export default {
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
    async onLogin() {
      this.busy = true

      try {
        const payload = {
          data: {
            username: this.user.username,
            password: this.user.password,
          }
        }
        await this.$auth.loginWith('local', payload)
        const URL = '/proyectos'
        this.$router.push(URL)
      } catch (err) {
        this.error = 'Error de inicio de sesión'
      } finally {
        this.busy = false
      }
    },
  },
}
</script>
<style>
.displayBlock {
  display: block;
}

.theme--light.v-text-field--solo>.v-input__control>.v-input__slot {
  background: #d8d5d4;
}
</style>