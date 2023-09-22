<template>
    <v-text-field
      v-bind="$attrs"
      :append-icon="passwordIcon"
      :type="showPassword ? 'text' : 'password'"
      v-on="$listeners"
      @click:append="showPassword = !showPassword"
    />
  </template>
  
  <script>
  export default {
    data: () => ({
      showPassword: false,
    }),
    computed: {
      passwordIcon() {
        return this.showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
      },
    },
  }
  </script>
  