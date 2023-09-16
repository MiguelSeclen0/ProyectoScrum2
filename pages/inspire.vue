<template>
  <v-row>
    <v-col cols="12" sm="8" md="3">
      <v-card-title class="headline">
        TO DO
      </v-card-title>
      <draggable style="margin-bottom: 10px;" group="people2" @start="drag = true">
        <v-card class="mx-auto" color="#26c6da" dark max-width="400">
          <v-card-title>
            <v-icon large left>
              mdi-twitter
            </v-icon>
            <span class="text-h6 font-weight-light">Twitter</span>
          </v-card-title>

          <v-card-text class="text-h5 font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as
            well."
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img class="elevation-6" alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Evan You</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
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
    <v-col cols="12" sm="8" md="3">
      <v-card-title class="headline">
        IN PROGRESS
      </v-card-title>
      <draggable style="margin-bottom: 10px;" group="people2" @start="drag = true">
      </draggable>
      <!-- <v-card style="background-color: brown;">
        <draggable style="margin-bottom: 10px;" v-model="Mylist3" group="people2" @start="drag = true"
          @end="drag = false">
          <v-card-title v-for="item in Mylist3" :key="item.nombres" class="headline">{{ item.nombres }}</v-card-title>
        </draggable>
      </v-card> -->
    </v-col>
    <v-col cols="12" sm="8" md="3">
      <v-card-title class="headline">
       DONE
      </v-card-title>
      <draggable style="margin-bottom: 10px;" group="people2" @start="drag = true">
      </draggable>
    </v-col>
  </v-row>
</template>

<script>
import draggable from 'vuedraggable'
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
        { nombres: "Patrick" },
        { nombres: "Miguel" }
      ],
      Mylist4: [
        { nombres: "Axel" }
      ]

    }
  },
  components: {
    draggable,
  },
}
</script>
