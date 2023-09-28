<template>
  <v-app>
    <v-row>
      <div class="divstilo"><v-col class="colstilo"></v-col></div>
      <v-main>
        <v-container class="pa-0" fill-height fluid>
          <nuxt />
        </v-container>
      </v-main>
    </v-row>
  </v-app>
</template>
<script>
export default {
}
</script>
<style>
.divstilo {
  min-width: 20%;
  min-height: 100%;
  background: white;
}

.colstilo {
  background-color: #454e81;
  height: 92%;
  width: 18.5%;
  border-radius: 30px;
  margin: 27px 0px 27px 27px;
  position: fixed;
}
</style>