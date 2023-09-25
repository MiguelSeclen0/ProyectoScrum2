<template>
  <v-row>
    <v-col v-for="item in Mylist3" :key="item.id" class="secondary cards" cols="12" md="3">
      {{ item.nombres }}
      <draggable style="margin-bottom: 10px;" group="people2" @start="drag = true">
        <v-card v-for="item in usuario" :key="item.id" elevation="24" class="mx-auto cards" color="primary"
          max-width="400">
          <v-card-title>
            <v-icon large left>
              {{ item.id }}
            </v-icon>
          </v-card-title>

          <v-card-text class="text-h5 font-weight-bold">
            {{ item.correoElectronico }}
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img class="elevation-6" alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.nombreUsuario }}</v-list-item-title>
              </v-list-item-content>

              <v-row justify="end">
                <v-icon class="mr-1">
                  mdi-heart
                </v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">
                  mdi-share-variant
                </v-icon>
                <span class="subheading">45</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </draggable>
    </v-col>
  </v-row>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState } from 'vuex'
import { FETCH_USUARIO } from '@/utils/types/users/actions.types'

export default {
  name: 'InspirePage',
  data() {
    return {
      Mylist: [
        { nombres: "Cesar" },
        { nombres: "Predro" }

      ],
      Mylist2: [
        { nombres: "Xiomar" }
      ],
      Mylist3: [
        { nombres: "TO DO" },
        { nombres: "IN PROGRESS" },
        { nombres: "DONE" },
        { nombres: "PRUEBA"}
      ],
      Mylist4: [
        { nombres: "Axel" }
      ]
    }
  },
  components: {
    draggable,
  },
  async fetch() {
    debugger
    await Promise.all([this.$store.dispatch(`usuario/${FETCH_USUARIO}`)])
  },
  computed: {
    ...mapState('usuario', ['usuario']),
  },
}
</script>
<style>
.cards {
  margin-bottom: 5%;
  min-height: 700px;
  margin-left: 2%;
  margin-top: 2%;
}
</style>
