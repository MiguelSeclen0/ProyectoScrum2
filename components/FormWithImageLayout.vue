<template>
  <v-row style="justify-content: center;" class="fill-height pa-0 has-background hidden-sm-and-down" :style="backgroundImageStyle" cols="12" md="7" lg="8"
    dense>
    <!-- ></v-col> -->
    <!-- <v-col class="d-flex justify-center px-xs-3" cols="12" md="5" lg="4"> -->
    <slot></slot>
    <!-- </v-col> -->
  </v-row>
</template>
<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      required: true,
    },
  },
  computed: {
    backgroundImageStyle() {
      return `background-image: url(${this.backgroundImage})`
    },
  },
}
</script>
<style lang="scss" scoped>
.has-background {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
  