<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card style="background-color: aqua;">
          <draggable v-model="Mylist" group="people" @start="drag = true" @end="drag = false">
            <v-card-title v-for="item in Mylist" :key="item.nombres" class="headline">{{ item.nombres }}</v-card-title>
          </draggable>
        </v-card>
        <v-card style="background-color: peru;">
          <draggable v-model="Mylist2" group="people" @start="drag = true" @end="drag = false">
            <v-card-title v-for="item in Mylist2" :key="item.nombres" class="headline">{{ item.nombres }}</v-card-title>
          </draggable>
        </v-card>

      </v-card>
      <v-card style="background-color: brown;">
        <draggable v-model="Mylist" group="people2" @start="drag = true" @end="drag = false">
          <v-card-title v-for="item in Mylist" :key="item.nombres" class="headline">{{ item.nombres }}</v-card-title>
        </draggable>
      </v-card>
      <v-card style="background-color: blue;">
        <draggable v-model="Mylist2" group="people2" @start="drag = true" @end="drag = false">
          <v-card-title v-for="item in Mylist2" :key="item.nombres" class="headline">{{ item.nombres }}</v-card-title>
        </draggable>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'IndexPage',

  data() {
    return {
      Mylist: [
        { nombres: "Cesar" },
        { nombres: "Predro" }

      ],
      Mylist2: [
        { nombres: "Xiomar" }
      ]
    }
  },
  components: {
    draggable,
  },
}
</script>
