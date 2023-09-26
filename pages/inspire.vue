<template>
  <div class="cards-wrapper">
    <v-col v-for="(item, columnIndex) in Mylist3" :key="item.id" class="secondary cards" md="3">
      <div v-if="!item.editing">
        {{ item.nombres }}
        <v-btn @click="editColumn(columnIndex)">
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn @click="deleteColumn(columnIndex)">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-text-field v-model="editedColumnName" label="Nuevo Nombre"></v-text-field>
        <v-btn @click="saveEditedColumn(columnIndex)">Guardar</v-btn>
        <v-btn @click="cancelEdit(columnIndex)">Cancelar</v-btn>
      </div>
      <draggable style="margin-bottom: 10px;" group="people2" @start="drag = true">
        <v-card v-for="item in Mylist2" :key="item.id" elevation="24" class="mx-auto" color="primary" max-width="250">
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
      <v-btn style="margin-top: 1%;" @click="openAddTaskModal">
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
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
    <v-dialog v-model="addTaskModal" max-width="400">
      <v-card>
        <v-card-title>Agregar Nueva Tarea</v-card-title>
        <v-card-text>
          <v-text-field v-model="newColumnName" label="Nombre de la Tarea"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addTask">Agregar</v-btn>
          <v-btn @click="closeAddTaskModal">Cancelar</v-btn>
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
        { nombres: "Xiomar" },
        { nombres: "Xiomar" },
        { nombres: "Xiomar" },
        { nombres: "Xiomar" },
        { nombres: "Xiomar" }
      ],
      Mylist3: [
        { nombres: "TO DO", editing: false }, // Agrega 'editing: false' a cada elemento
        { nombres: "TO DO", editing: false },
        { nombres: "TO DO", editing: false }
      ],
      Mylist4: [
        { nombres: "Axel" }
      ],
      addColumnModal: false, // Controla la visibilidad del modal
      newColumnName: '',    // Almacena el nombre de la nueva columna
      editedColumnIndex: -1,     // Índice de la columna en edición
      editedColumnName: '',      // Nuevo nombre de la columna en edición
      addTaskModal: false,
      newTaskName: '',

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
    openAddTaskModal(){
      this.addTaskModal = true;
    },
    // Cierra el modal
    closeAddColumnModal() {
      this.addColumnModal = false;
      this.newColumnName = ''; // Restablece el nombre de la nueva columna
    },
    closeAddTaskModal() {
      this.addTaskModal = false;
      this.newTaskName = ''; // Restablece el nombre de la nueva columna
    },

    // Agrega una nueva columna a la lista
    addColumn() {
      if (this.newColumnName.trim() !== '') {
        this.Mylist3.push({ nombres: this.newColumnName });
        this.closeAddColumnModal(); // Cierra el modal después de agregar la columna
      }
    },
    addTask(){
      if (this.newColumnName.trim() !== '') {
        this.Mylist2.push({ nombres: this.newColumnName });
        this.closeAddTaskModal(); // Cierra el modal después de agregar la columna
      }
    },
    deleteColumn(index) {
      this.Mylist3.splice(index, 1);
    },
    // Activa el modo de edición de una columna
    editColumn(index) {
      this.Mylist3[index].editing = true;
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
      this.Mylist3[index].editing = false;
      this.editedColumnName = '';
    },
  },
}
</script>
<style>
.container {
  overflow-x: auto;
  /* Habilita la barra de desplazamiento horizontal */
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
  margin: 1%;
  /* Ajusta el margen entre las columnas */
  min-width: 250px;
  /* Ancho mínimo de las columnas */
  min-height: 750px;
  /*Alto de las columnas */
}
</style>
