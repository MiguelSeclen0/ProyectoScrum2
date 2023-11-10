<template>
  <v-overlay :value="loading" :z-index="5000">
    <div class="loading-container">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
      <h2 class="text-loading mr-2"> cargando </h2>
    </div>
  </v-overlay>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  data: () => ({
    loading: false,
  }),
  computed: {
    // ...mapState('etiquetaIdioma', ['etiquetaIdioma']),
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
    fail() {
      this.loading = false
    },
  },
}
</script>
<style>
.loading-container {
  display: flex !important;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}
.text-loading {
  font-family: 'Rubik', sans-serif !important;
  font-weight: 400 !important;
  margin-top: 10px;
}
</style>
