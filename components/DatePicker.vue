<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
    min-width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field v-model="formatted" v-bind="{ ...attrs, ...$attrs }" v-on="{ ...on, ...$listeners }"
        backgroundColor="secondary" color="textito" />
    </template>
    <v-date-picker v-model="date" :type="type" color="textito" @input="menu = false"></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: () => '',
    },
    format: {
      type: String,
      default: () => 'YYYY-MM-DD',
    },
    type: {
      type: String,
      default: () => 'date',
    },
  },
  data: () => ({
    date: '',
    formatted: '',
    menu: false,
  }),
  watch: {
    date() {
      this.$emit('input', this.date)
    },
    value() {
      this.syncValue()
    },
  },
  mounted() {
    this.syncValue()
  },
  methods: {
    syncValue() {
      const formatted = this.$moment(this.value)
      if (formatted.isValid()) {
        this.date = formatted.format('YYYY-MM-DD')
        this.formatted = formatted.format(this.format)
      } else {
        this.date = ''
        this.formatted = ''
      }
    },
  },
}
</script>