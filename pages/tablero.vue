<template>
  <div>
    <draggable>
      <div class="cards-wrapper">
        <v-col v-for="(item, index) in  tareaEstado" :key="item.tableroId" class="secondary cards" md="3">
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
            <v-card v-for="item in filtrarTareasPorColumna(item.nombre)" :key="item.tareaId" elevation="24"
              class="mx-auto cardst" :style="{ 'background': item.color }"
              :class="['column-card', { 'new-column': index >= tareaEstado.length - 1 }]" max-width="250">
              <v-card-title>
                <v-icon large left class="text-caption">
                  {{ item.nombre }} <!-- Mostramos el nombre de la tarea -->
                </v-icon>
              </v-card-title>
              <v-card-actions>
                <v-row align-center="center" justify="space-between">
                  <v-col cols="1">
                    <!-- Muestra item.nombres a la izquierda -->
                    <v-checkbox color="success"></v-checkbox>
                  </v-col>
                  <v-col cols="6" class="align-center mr-1" style="margin-top: 7.5%; margin-bottom: 10px;">
                    <span class="text-overline" :class="{ 'text-decoration-line-through text-overline': checkbox }">
                      {{ item.descripcion }}
                    </span>
                  </v-col>
                  <v-col cols="2" class="text-right" style="margin-top: 7.5%; margin-right: 2%;">
                    <!-- Genera la imagen circular con las iniciales del nombre de usuario a la derecha -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-avatar class="avatar-circle" size="24px" v-bind="attrs" v-on="on">
                          <div class="avatar-inner"> {{ getInitials(item.nombre) }} </div>
                        </v-avatar>
                      </template>
                      <span> {{ item.fechaLimite }} </span>
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
        <v-row>
        </v-row>
        <v-dialog v-model="addColumnModal" max-width="400">
          <v-card>
            <v-card-title>Agregar Nueva Columna</v-card-title>
            <v-card-text>
              <v-text-field v-model="newColumnName" backgroundColor="secondary" outlined label="Nombre"
                color="textito"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="accent" @click="addColumn()">Agregar</v-btn>
              <v-btn @click="closeAddColumnModal()">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="addTaskModal" max-width="400">
          <v-card>
            <v-card-title>Agregar Nueva Tarea</v-card-title>
            <v-card-text>
              <v-col>
                <v-text-field v-model="newTareaName" backgroundColor="secondary" outlined label="Nombre"
                  color="textito"></v-text-field>
              </v-col>
              <v-col>
                <v-combobox label="Responsable" backgroundColor="secondary" color="textito" outlined>
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
    </draggable>
  </div>
</template>


<script>
import draggable from 'vuedraggable'
import { mapState } from 'vuex'
import { FETCH_TAREAS } from '@/utils/types/tareas/actions.types'
import { FETCH_ESTADOS, INSERT_NOMCOLUM } from '@/utils/types/estados/actions.types'
import { GlobalValues } from '~/utils/global'

export default {
  name: 'InspirePage',
  data() {
    return {
      checkbox: false,
      addColumnModal: false, // Controla la visibilidad del modal
      newColumnName: '',    // Almacena el nombre de la nueva columna
      newTareaName: '',    // Almacena el nombre de la nueva tarea
      editedColumnIndex: -1,     // Índice de la columna en edición
      editedColumnName: '',      // Nuevo nombre de la columna en edición
      addTaskModal: false,
      newTaskName: '',
      editedIndex: false,

    }
  },
  watch: {

  },
  components: {
    draggable,
  },
  async fetch() {
    await Promise.all([
      this.$store.dispatch(`tarea/${FETCH_TAREAS}`, {
        id: GlobalValues.idProyect,
      }),
      this.$store.dispatch(`estado/${FETCH_ESTADOS}`, {
        id: GlobalValues.idProyect
      })
    ])
  },
  computed: {
    ...mapState('tarea', ['tarea']),
    ...mapState('estado', ['tareaEstado'])
  },

  methods: {
    filtrarTareasPorColumna(nombreColumna) {
      return this.tarea.filter((item) => item.tablero.nombre === nombreColumna);
    },
    usersName() {
      return this.$auth.user.nombre
    },
    async onLogout() {
      const res = await this.$dialog.confirm({
        text: '¿Realmente desea cerrar sesión?',
        title: 'Advertencia',
        actions: {
          false: 'No',
          true: { color: 'accent', text: 'Si' },
        },
        persistent: true,
      })

      if (res) {
        await this.$auth.logout()

        this.$router.push('/login')
      }
    },
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
    async addColumn() {
      this.saveEditedColumn()
      this.closeAddColumnModal(); // Cierra el modal después de agregar la columna
    },
    addTask() {
      if (this.newTareaName.trim() !== '') {
        this.Mylist2.push({
          id: 5,
          nombreTarea: this.newTareaName,
          nombreUsuario: this.newTareaName,
          nombres: this.newTareaName
        });
        this.closeAddTaskModal(); // Cierra el modal después de agregar la columna
      }
    },
    deleteColumn(index) {
      this.Mylist3.splice(index, 1);
    },
    // Activa el modo de edición de una columna
    editColumn(index) {
      this.editedIndex = true;
      this.editedColumnIndex = index;
      this.editedColumnName = this.tareaEstado[index].nombre;
    },

    // Guarda el nombre editado de la columna
    async saveEditedColumn(index) {
      if (this.editedIndex === true) {
        if (this.editedColumnName.trim() !== '' || this.newColumnName.trim() !== '') {
          const nTableroid = this.tareaEstado[index].tableroId
          const nNombre = this.editedColumnName
          const nEstado = this.tareaEstado[index].proyecto

          const newEstado = {
            tableroId: nTableroid,
            nombre: nNombre,
            proyecto: nEstado
          }

          const res = await this.$dialog.confirm({
            text: this.editedIndex === true ? `¿Realmente desea editar esta columna?` : `¿Realmente desea agregar esta columna?`,
            title: 'ADVERTENCIA',
            actions: {
              false: 'No',
              true: { color: 'primary', text: 'Sí' },
            },
            persistent: true,
          })

          if (res) {
            try {
              // Dispatch action for update the survey and fetch all surveys again
              await this.$store.dispatch(
                `estado/${INSERT_NOMCOLUM}`,
                this.editedIndex === true ? newEstado : newEstado2
              )
              // Ya se puede ejecutar la modificación

              this.$dialog.message.success(
                this.editedIndex === true ? `La columna se modifico correctamente` : `La columna se agrego correctamente`,
                {
                  position: 'top-right',
                }
              )
              await this.$store.dispatch(`estado/${FETCH_ESTADOS}`, {
                id: GlobalValues.idProyect,
              })
              await this.$store.dispatch(`tarea/${FETCH_TAREAS}`, {
                id: GlobalValues.idProyect,
              })
            } catch (err) { }
          }
        }
      }

      const newEstado2 = {
        nombre: this.newColumnName,
        proyecto: {
          proyectoId: GlobalValues.idProyect,
        },
      }

      if (this.editedIndex === false) {
        const res = await this.$dialog.confirm({
          text: this.editedIndex === true ? `¿Realmente desea editar esta columna?` : `¿Realmente desea agregar esta columna?`,
          title: 'ADVERTENCIA',
          actions: {
            false: 'No',
            true: { color: 'primary', text: 'Sí' },
          },
          persistent: true,
        })

        if (res) {
          try {
            // Dispatch action for update the survey and fetch all surveys again
            await this.$store.dispatch(
              `estado/${INSERT_NOMCOLUM}`,
              this.editedIndex === true ? newEstado : newEstado2
            )
            // Ya se puede ejecutar la modificación

            this.$dialog.message.success(
              this.editedIndex === true ? `La columna se modifico correctamente` : `La columna se agrego correctamente`,
              {
                position: 'top-right',
              }
            )
            await this.$store.dispatch(`estado/${FETCH_ESTADOS}`, {
              id: GlobalValues.idProyect,
            })
            await this.$store.dispatch(`tarea/${FETCH_TAREAS}`, {
              id: GlobalValues.idProyect,
            })
          } catch (err) { }
        }
      }


      this.editedIndex = false
      this.closeAddColumnModal(); // Cierra el modal después de agregar la columna
      this.cancelEdit(index);
    },

    // Cancela la edición de la columna
    cancelEdit(index) {
      this.editedColumnIndex = -1;
      this.editedColumnName = '';
      this.newColumnName = '';
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
