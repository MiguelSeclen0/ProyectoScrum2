<template>
  <div class="cards-wrapper">
    <v-col v-for="(item, index) in  estado " :key="item.estadoId" class="secondary cards" md="3">
      <div v-if="index !== editedColumnIndex">
        <span @click="editColumn(index)">{{ item.nombre }}</span>
      </div>
      <div v-else>
        <v-text-field v-model="editedColumnName" label="Nuevo nombre" solo-inverted></v-text-field>
        <v-btn @click="saveEditedColumn(index)">Guardar</v-btn>
        <v-btn @click="cancelEdit(index)">Cancelar</v-btn>
      </div>
      <v-btn @click="deleteColumn(index)">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
      <draggable style="margin-bottom: 10px;" group="people2" @start="drag = true">
        <v-card v-for="item in  Mylist2 " :key="item.id" elevation="24" class="mx-auto cardst"
          :class="['column-card', { 'new-column': index >= Mylist3.length - 1 }]" color="secondary" max-width="250">
          <v-card-title>
            <v-icon large left class="text-caption">
              {{ item.nombreTarea }} <!-- Mostramos el nombre de la tarea -->
            </v-icon>
          </v-card-title>
          <v-card-actions>
            <v-row align-center="center" justify="space-between">
              <v-col cols="1">
                <!-- Muestra item.nombres a la izquierda -->
                <v-checkbox color="success" v-model="checkbox"></v-checkbox>
              </v-col>
              <v-col cols="6" class="align-center mr-1" style="margin-top: 7.5%; margin-bottom: 10px;">
                <span class="text-overline" :class="{ 'text-decoration-line-through text-overline': checkbox }">
                  {{ item.nombres }}
                </span>
              </v-col>
              <v-col cols="2" class="text-right" style="margin-top: 7.5%; margin-right: 2%;">
                <!-- Genera la imagen circular con las iniciales del nombre de usuario a la derecha -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-avatar class="avatar-circle" size="24px" v-bind="attrs" v-on="on">
                      <div class="avatar-inner">{{ getInitials(item.nombreUsuario) }}</div>
                    </v-avatar>
                  </template>
                  <span>{{ item.nombreUsuario }}</span>
                </v-tooltip>
              </v-col>
            </v-row>
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
          <v-text-field v-model="newColumnName" backgroundColor="secondary" outlined label="Nombre" color="textito"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="accent" @click="addColumn">Agregar</v-btn>
          <v-btn @click="closeAddColumnModal">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addTaskModal" max-width="400">
      <v-card>
        <v-card-title>Agregar Nueva Tarea</v-card-title>
        <v-card-text>
          <v-col>
            <v-text-field v-model="newColumnName" backgroundColor="secondary" outlined label="Nombre" color="textito"></v-text-field>
          </v-col>  
          <v-col>
            <v-combobox 
              label = "Responsable"
              backgroundColor="secondary"
              color="textito"
              outlined>                            
              </v-combobox>
          </v-col>
          <v-col>
            <v-textarea backgroundColor="secondary" outlined label="Descripcion"></v-textarea>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-btn color="accent" @click="addTask">Agregar</v-btn>
          <v-btn @click="closeAddTaskModal">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import draggable from 'vuedraggable'
// import { mapState } from 'vuex'
// import { FETCH_USUARIO } from '@/utils/types/users/actions.types'

// agg1
import { mapState } from 'vuex'
import { FETCH_TAREAS } from '@/utils/types/tareas/actions.types'
import { FETCH_ESTADOS } from '@/utils/types/estados/actions.types'

export default {
  name: 'InspirePage',
  data() {
    return {
      checkbox: false,
      Mylist: [
        { nombres: "Cesar" },
        { nombres: "Predro" }

      ],
      Mylist2: [
        {
          id: "001",
          nombreTarea: "tarea1",
          nombreUsuario: "Usuario Palomo",
          nombres: "U1"
        },
        {
          id: "002",
          nombreTarea: "tarea2",
          nombreUsuario: "Usuario Seclen",
          nombres: "U2"
        },
        {
          id: "003",
          nombreTarea: "tarea3m",
          nombreUsuario: "Usuario Snache",
          nombres: "USSSSSSSSS"
        },
        // Agrega más objetos de datos aquí según sea necesario
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
  // async fetch() {
  //   debugger
  //   await Promise.all([this.$store.dispatch(`usuario/${FETCH_USUARIO}`)])
  // },
  // computed: {
  //   ...mapState('usuario', ['usuario']),
  // },
  
  // agg2
  async fetch() {
    await Promise.all([
      this.$store.dispatch(`tarea/${FETCH_TAREAS}`),
      this.$store.dispatch(`estado/${FETCH_ESTADOS}`)
    ])
  },
  // agg3
  computed: {
    ...mapState('tarea', ['tarea']),
    ...mapState('estado', ['estado'])
  },

  methods: {
    getInitials(username) {
      const words = username.split(" ");
      const initials = words.map((word) => word[0].toUpperCase());
      return initials.join("");
    },
    // Abre el modal para agregar una nueva columna
    openAddColumnModal() {
      this.addColumnModal = true;
    },
    openAddTaskModal() {
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
        this.Mylist2 = [...this.Mylist2]; // Restablece Mylist2 a su estado original
        this.closeAddColumnModal(); // Cierra el modal después de agregar la columna
      }
    },
    addTask() {
      if (this.newColumnName.trim() !== '') {
        this.Mylist2.push({
          id: 5,
          nombreTarea: this.newColumnName,
          nombreUsuario: this.newColumnName,
          nombres: this.newColumnName
        });
        this.closeAddTaskModal(); // Cierra el modal después de agregar la columna
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
  overflow-x: auto;
  /* Habilita la barra de desplazamiento horizontal */
  overflow-y: auto;
  white-space: nowrap;
  /* Evita que las columnas se envuelvan */
  max-width: 100%;
  /* Asegura que el contenedor no se desborde horizontalmente */
}

.cards-wrapper {
  max-width: 100%;
  /* Puedes ajustar el valor según tus necesidades */
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

.cardst {
  margin: 5%;
}

.avatar-circle {
  border-radius: 50%;
  background-color: #007bff;
  /* Cambia el color de fondo según tus preferencias */
  color: white;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Estilo para todas las columnas */
.column-card {
  margin: 5%;
  /* Ajusta el margen entre las columnas */
  min-width: 250px;
  /* Ancho mínimo de las columnas */
  max-width: 250px;
  /* Ancho máximo de las columnas */
}

/* Estilo solo para las nuevas columnas */
.new-column {
  /* Puedes ajustar el ancho mínimo y máximo según tus preferencias */
  min-width: 250px;
  /* Ancho mínimo de las nuevas columnas */
  max-width: 250px;
  /* Ancho máximo de las nuevas columnas */
}

/* Agrega un estilo específico para el contenido dentro de las columnas */
.secondary.cards {
  margin-right: 10px;
  /* Ajusta el margen derecho según tus preferencias */
  /* Ajusta el margen entre las columnas según tus preferencias */
  margin: 1%;
  /* Establece el mismo ancho mínimo y máximo que las columnas */
  min-width: 280px;
  max-width: 250px;
}

.mx-auto.cardst {
  /* Ajusta el margen entre las tarjetas dentro de las columnas */
  margin: 5%;
}
</style>
