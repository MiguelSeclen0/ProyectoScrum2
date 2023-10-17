<template>
  <v-menu bottom left offset-y :nudge-width="100">
    <template v-slot:activator="{ on, attrs }">
      <v-card
        class="fill-height"
        color="transparent"
        v-bind="attrs"
        flat
        v-on="on"
      >
        <div class="d-flex align-center fill-height px-3">
          <span class="mr-2">{{ name }}</span>
          <v-avatar :color="!image ? 'accent' : ''" size="36">
            <img v-if="image" :src="image" />
            <span v-else class="white--text">
              {{ nameInitials }} 
            </span>
          </v-avatar>
        </div>
      </v-card>
    </template>
    <v-card>
      <slot />
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  computed: {
    nameInitials() {
      const [firstName] = this.name

      return `${firstName[0]}`
    },
  },
}
</script>
