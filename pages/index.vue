<template>
  <v-row>
    <v-switch v-model="$vuetify.theme.dark" hint="This toggles the global state of the Vuetify theme" inset
      label="Vuetify Theme Dark" persistent-hint></v-switch>
    <v-btn color="primary" nuxt to="/inspire"> No presionar </v-btn>
    <span>{{ Client }}</span>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import {FETCH_CLIENTS} from '@/utils/types/clients/actions.types'
export default {
  name: 'IndexPage',
  // created: function () {
  //   this.$axios.get('http://localhost:90/cliente/all').then(response => { console.log(response) })
  // }
  async fetch(){
    debugger
    await Promise.all([this.$store.dispatch(`cliente/${FETCH_CLIENTS}`)])
  },
  computed: {
    ...mapState('cliente', ['Client'])
  }
}
</script>
