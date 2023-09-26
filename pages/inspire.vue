<template>
  <div class="cards-wrapper">
    <v-col v-for="item in Mylist3" :key="item.id" class="secondary cards" md="3">
      {{ item.nombres }}
      <draggable style="margin-bottom: 10px;" group="people2" @start="drag = true">
        <!-- Eliminamos el bucle v-card -->
        <v-card elevation="24" class="mx-auto cardst" color="primary" max-width="250" v-if="Mylist2.length > 0">
          <v-card-title>
            <v-icon large left>
              {{ Mylist2[0].id }} <!-- Mostramos el código de la tarea -->
            </v-icon>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-bold">
            {{ Mylist2[0].correoElectronico }} <!-- Mostramos el nombre de la tarea -->
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <!-- Aquí puedes colocar la imagen circular con las iniciales -->
                <v-img class="elevation-6" alt="">
                  <!-- Puedes personalizar esta imagen según tus necesidades -->
                  <img src="https://placekitten.com/50/50" alt="Avatar">
                </v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <!-- Mostramos el nombre de la tarea -->
                <v-list-item-title>{{ Mylist2[0].nombreUsuario }}</v-list-item-title>
              </v-list-item-content>

              <v-row justify="end">
                <v-icon class="mr-1">
                  mdi-black-mesa
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
  </div>
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
      {
        id: "001",
        correoElectronico: "tarea1@ejemplo.com",
        nombreUsuario: "Usuario 1",
        nombres: "U1"
      },
      {
        id: "002",
        correoElectronico: "tarea2@ejemplo.com",
        nombreUsuario: "Usuario 2",
        nombres: "U2"
      },
      {
        id: "003",
        correoElectronico: "tarea3@ejemplo.com",
        nombreUsuario: "Usuario 3",
        nombres: "U3"
      },
      // Agrega más objetos de datos aquí según sea necesario
    ],
      Mylist3: [
        { nombres: "TO DO" },
        { nombres: "IN PROGRESS" },
        { nombres: "DONE" },
        { nombres: "PRUEBA" },
        { nombres: "PRueba2" }
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
.container {
  overflow-x: auto; /* Habilita la barra de desplazamiento horizontal */
  overflow-y: auto;
  white-space: nowrap; /* Evita que las columnas se envuelvan */
  max-width: 100%; /* Asegura que el contenedor no se desborde horizontalmente */
}

.cards-wrapper {
  display: inline-flex; /* Hace que las columnas se coloquen en línea */
  flex-wrap: nowrap; /* Evita el ajuste de línea */
}

.cards {
  margin: 1%; /* Ajusta el margen entre las columnas */
  min-width: 250px; /* Ancho mínimo de las columnas */
  min-height: 750px; /*Alto de las columnas */
}

.cardst{
  margin: 5%;
}
</style>
