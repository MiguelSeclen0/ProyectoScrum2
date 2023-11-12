<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="color"
        v-bind="{ ...attrs, ...$attrs }"
        v-on="{ ...on, ...$listeners }"
      >
        <template #prepend-inner>
          <v-icon :color="color">mdi-circle</v-icon>
        </template>
      </v-text-field>
    </template>
    <v-color-picker
      v-model="color"
      hide-mode-switch
      dot-size="25"
      hide-inputs
      mode="hexa"
      swatches-max-height="250"
    ></v-color-picker>
  </v-menu>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: () => '#FFFFFF',
    },
  },
  data: () => ({
    color: '#FFFFFF',
    menu: false,
  }),
  watch: {
    value() {
      this.syncValue()
    },
    color() {
      this.$emit('input', this.color)
    },
  },
  mounted() {
    this.syncValue()
  },
  methods: {
    syncValue() {
      this.color = this.value
    },
  },
}
</script>
