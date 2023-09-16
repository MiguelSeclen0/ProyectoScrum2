<template>
  <v-row>
    <v-switch v-model="$vuetify.theme.dark" hint="This toggles the global state of the Vuetify theme" inset
      label="Vuetify Theme Dark" persistent-hint></v-switch>
    <v-btn color="primary" nuxt to="/inspire"> No presionar </v-btn>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  created: function () {
    this.$axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => { console.log(response) })
  }


}
</script>
