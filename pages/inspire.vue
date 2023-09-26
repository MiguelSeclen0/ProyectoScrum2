<template>
  <div class="cards-wrapper">
    <v-col v-for="item in Mylist3" :key="item.id" class="secondary cards" md="3">
      {{ item.nombres }}
      <v-btn @click="deleteColumn(index)">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
        <v-btn @click="editColumn(index)">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
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
    <v-btn style="margin-top: 1%;" @click="openAddColumnModal">
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-dialog v-model="addColumnModal" max-width="400">
    <v-card>
      <v-card-title>Agregar Nueva Columna</v-card-title>
      <v-card-text>
        <v-text-field v-model="newColumnName" label="Nombre de la Columna"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addColumn">Agregar</v-btn>
        <v-btn @click="closeAddColumnModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
        { nombres: "TO DO" },
        { nombres: "TO DO" }
      ],
      Mylist4: [
        { nombres: "Axel" }
      ],
      addColumnModal: false, // Controla la visibilidad del modal
      newColumnName: '',    // Almacena el nombre de la nueva columna
      editedColumnIndex: -1,     // Índice de la columna en edición
      editedColumnName: '',      // Nuevo nombre de la columna en edición
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
  methods: {
    // Abre el modal para agregar una nueva columna
    openAddColumnModal() {
      this.addColumnModal = true;
    },

    // Cierra el modal
    closeAddColumnModal() {
      this.addColumnModal = false;
      this.newColumnName = ''; // Restablece el nombre de la nueva columna
    },

    // Agrega una nueva columna a la lista
    addColumn() {
      if (this.newColumnName.trim() !== '') {
        this.Mylist3.push({ nombres: this.newColumnName });
        this.closeAddColumnModal(); // Cierra el modal después de agregar la columna
      }
    },
    deleteColumn(index) {
      this.Mylist3.splice(index, 1);
    },
        // Activa el modo de edición de una columna
        editColumn(index) {
      this.editedColumnIndex = index;
      this.editedColumnName = this.Mylist3[index].nombres;
    },

    // Guarda el nombre editado de la columna
    saveEditedColumn(index) {
      if (this.editedColumnName.trim() !== '') {
        this.Mylist3[index].nombres = this.editedColumnName;
      }
      this.cancelEdit(index);
    },

    // Cancela la edición de la columna
    cancelEdit(index) {
      this.editedColumnIndex = -1;
      this.editedColumnName = '';
    },
  },
}
</script>
<style>
.container {
  overflow-x: auto; /* Habilita la barra de desplazamiento horizontal */
  overflow-y: auto;
  white-space: nowrap;
  /* Evita que las columnas se envuelvan */
  max-width: 100%;
  /* Asegura que el contenedor no se desborde horizontalmente */
}

.cards-wrapper {
  display: inline-flex;
  /* Hace que las columnas se coloquen en línea */
  flex-wrap: nowrap;
  /* Evita el ajuste de línea */
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
