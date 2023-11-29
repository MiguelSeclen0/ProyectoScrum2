<template>
  <div>
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
            <v-card-title class="text-small">
              <span>{{ item.nombre }}</span>
            </v-card-title>
            <v-card-actions>
              <v-row align-center="center" justify="space-between">
                <v-col cols="1">
                  <!-- Muestra item.nombres a la izquierda -->
                  <!--<v-checkbox color="success"></v-checkbox>-->
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
                  <v-icon style="margin-left: 3%;" color="accent" medium @click="editTarea(item)">mdi-pencil</v-icon>
                  <v-icon style="margin-left: 3%;" color="accent" medium @click="openDeleteTaskModal(item)">mdi-trash-can-outline</v-icon>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </draggable>
        <v-btn style="margin-top: 1%;" @click="openAddTaskModal(item.tableroId)">
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
            <v-text-field v-model="newColumnName" backgroundColor="secondary" outlined label="Nombre" :rules="nameRules"
              color="textito"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="accent" @click="addColumn()">Agregar</v-btn>
            <v-btn @click="closeAddColumnModal()">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">¿Estás seguro de eliminar esta columna?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDeleteColumn()">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="ConfDeleteColumn()">Eliminar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDeleteTask" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">¿Estás seguro de eliminar esta tarea?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDeleteTask()">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="deleteTask()">Eliminar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addTaskModal" max-width="400">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitlee }}</span>
          </v-card-title>
          <v-card-text>
            <v-col>
              <v-text-field v-model="newTarea.nombre" backgroundColor="secondary" outlined label="Nombre" ref="campo1refTab"
                :rules="nameRules" color="textito"></v-text-field>
              <ColorPicker label="Color" v-model="newTarea.ColorPicker" outlined color="textito" />
            </v-col>
            <v-col>
              <v-select label="Responsable" v-model="responsableSelect" item-value="usuarioId" :items="usuario"
                item-text="nombre" backgroundColor="secondary" :rules="selectRules" color="textito" outlined
                item-color="secondary">
              </v-select>
              <DatePicker ref="campo2RefTab" label="Fecha Limite" v-model="newTarea.fechaLimite" outlined type='date'
                :rules="fechaFinalRules" color="textito" />
            </v-col>
            <v-col>
              <v-textarea v-model="newTarea.descripcion" backgroundColor="secondary" outlined
                label="Descripcion"></v-textarea>
            </v-col>
          </v-card-text>
          <span class="classerror" v-if="incompletefield === true">Por favor, completa todos los campos.</span>
          <v-card-actions>
            <v-btn color="accent" @click="addTask()">Aceptar</v-btn>
            <v-btn @click="closeAddTaskModal()">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="deleteTaskModal" max-width="400">
        <v-card>
          <v-card-title>Eliminar Tarea</v-card-title>
          <v-card-text>
            <v-col>
              <v-select label="Tarea" v-model="tareaSelect" item-value="tareaId" :items="tarea" item-text="nombre"
                backgroundColor="secondary" color="textito" outlined item-color="secondary">
              </v-select>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-btn color="accent" @click="deleteTask()">Eliminar</v-btn>
            <v-btn @click="closeDeleteTaskModal()">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>


<script>
import draggable from 'vuedraggable'
import { mapState } from 'vuex'
import { FETCH_TAREAS, INSERT_TAREAS, DELETE_TAREAS } from '@/utils/types/tareas/actions.types'
import { FETCH_ESTADOS, INSERT_NOMCOLUM, DELETE_COLUM } from '@/utils/types/estados/actions.types'
import { FETCH_USUARIO } from '@/utils/types/users/actions.types'
import { GlobalValues } from '~/utils/global'

export default {
  name: 'InspirePage',
  data() {
    return {
      checkbox: false,
      incompletefield: false,
      addColumnModal: false, // Controla la visibilidad del modal
      newColumnName: '',    // Almacena el nombre de la nueva columna
      editedColumnIndex: -1,     // Índice de la columna en edición
      editedColumnName: '',      // Nuevo nombre de la columna en edición
      addTaskModal: false,
      dialogDeleteTask: false,
      deleteTaskModal: false,
      newTaskName: '',
      editedIndex: false,
      columnaDelete: '',
      tabId: '',
      tarId: '',
      tarIdD: '',
      estId: '',
      usuId: '',
      dialogDelete: false,
      newTarea: {
        tareaId: '',
        nombre: '',    // Almacena el nombre de la nueva tarea        
        ColorPicker: '',
        usuario: {
          usuarioId: '',
          nombre: '',
        },
        fechaLimite: '',
        fechaFin: '',
        descripcion: '',
        tablero: {
          tableroId: '',
        },
        etiqueta: {
          etiquetaId: '',
        },
        proyecto: {
          proyectoId: '',
        },
        estado: {
          estadoId: '',
        },
      },
      responsableSelect: {

      },
      columnaSelect: {},
      tareaSelect: {},
      nameRules: [v => !!v || 'Nombre es requerido'],
      colorRules: [v => !!v || 'Seleccionar un color es requerido'],
      selectRules: [v => !!v || 'El valor es requerido'],
      fechaFinalRules: [v => !!v || 'Fecha limite es requerido'],
      responsableSelect: {
        usuarioId: '6521fd2fa1598a4ca722cabe',
        nombre: '',
      },
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
      this.$store.dispatch(`usuario/${FETCH_USUARIO}`, {
        id: GlobalValues.idProyect,
      }),
      this.$store.dispatch(`estado/${FETCH_ESTADOS}`, {
        id: GlobalValues.idProyect
      })
    ])
  },
  computed: {
    ...mapState('tarea', ['tarea']),
    ...mapState('usuario', ['usuario']),
    ...mapState('estado', ['tareaEstado']),
    formTitlee() {
      return this.editedIndex === true ? 'Editar Tarea' : 'Nueva Tarea'
    },
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
        titleColor: 'red',
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
    openAddTaskModal(item) {
      this.editedIndex = false
      this.tabId = item
      this.addTaskModal = true;
    },
    // Cierra el modal
    closeAddColumnModal() {
      this.addColumnModal = false;
      this.newColumnName = ''; // Restablece el nombre de la nueva columna
    },
    closeAddTaskModal() {
      this.clearTareas()
      this.addTaskModal = false;
    },
    closeDeleteTaskModal() {
      this.deleteTaskModal = false;
    },

    // Agrega una nueva columna a la lista
    async addColumn() {
      this.saveEditedColumn()
      this.closeAddColumnModal(); // Cierra el modal después de agregar la columna
    },
    editTarea(item) {
      this.editedIndex = true
      this.addTaskModal = true
      this.estId = item.estado.estadoId
      this.tabId = item.tablero.tableroId
      this.usuId = item.usuario.usuarioId
      this.callTareas(item)
    },
    callTareas(item) {
      this.newTarea.tareaId = item.tareaId;
      this.newTarea.nombre = item.nombre;
      this.newTarea.descripcion = item.descripcion;
      this.newTarea.fechaLimite = item.fechaLimite;
      this.newTarea.ColorPicker = item.color;
      this.responsableSelect = item.usuario;
    },
    async addTask() {
      const valorCampo1 = this.$refs.campo1refTab ? this.$refs.campo1refTab.value.trim() : ''
      const valorCampo2 = this.$refs.campo2RefTab ? this.$refs.campo2RefTab.value.trim() : ''

      if (!valorCampo1 || valorCampo1 === undefined
        || !valorCampo2 || valorCampo2 === undefined
      ) {
        this.incompletefield = true
      } else {
        this.incompletefield = false

        const nuevaTarea = {
          nombre: this.newTarea.nombre,
          descripcion: this.newTarea.descripcion,
          fechaLimite: this.newTarea.fechaLimite,
          color: this.newTarea.ColorPicker,
          etiqueta: {
            etiquetaId: '65370f8bb21e1239553afba4',
          },
          proyecto: {
            proyectoId: GlobalValues.idProyect,
          },
          tablero: {
            tableroId: this.tabId,
          },
          usuario: {
            usuarioId: this.responsableSelect,
            nombre: '',
          },
        }

        const modifTarea = {
          tareaId: this.newTarea.tareaId,
          nombre: this.newTarea.nombre,
          descripcion: this.newTarea.descripcion,
          fechaLimite: this.newTarea.fechaLimite,
          fechaFin: null,
          color: this.newTarea.ColorPicker,
          etiqueta: {
            etiquetaId: '65370f8bb21e1239553afba4',
          },
          proyecto: {
            proyectoId: GlobalValues.idProyect,
          },
          tablero: {
            tableroId: this.tabId,
          },
          usuario: {
            usuarioId: this.usuId,
            nombre: '',
          },
          estado: {
            estadoId: this.estId,
          },
        }

        const res = await this.$dialog.confirm({
          text: this.editedIndex === true ? `¿Realmente desea modificar la tarea?` : `¿Realmente desea agregar la tarea?`,
          title: 'ADVERTENCIA',
          actions: {
            false: 'No',
            true: { color: 'accent', text: 'Sí' },
          },
          persistent: true,
        })

        if (res) {
          try {
            await this.$store.dispatch(
              `tarea/${INSERT_TAREAS}`,
              this.editedIndex === true ? modifTarea : nuevaTarea
            )

            this.$dialog.message.success(
              this.editedIndex === true ? `La tarea se modifico correctamente` : `La tarea se agrego correctamente`,
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
        this.editedIndex = false
        this.incompletefield = false
        this.closeAddTaskModal();
      }
    },
    clearTareas() {
      this.newTarea.nombre = '';
      this.newTarea.descripcion = '';
      this.newTarea.fechaLimite = '';
      this.newTarea.ColorPicker = '';
      this.responsableSelect = null;
    },
    openDeleteTaskModal(item) {
      this.tarIdD = item.tareaId;
      this.dialogDeleteTask = true
    },
    closeDeleteTask() {
      this.dialogDeleteTask = false
    },
    async deleteTask() {
      const tareaId = this.tarIdD

      try {
        await this.$store.dispatch(
          `tarea/${DELETE_TAREAS}`, {
          id: tareaId,
        })
      } catch (err) { }
      this.$dialog.message.success(
        'La tarea se elimino correctamente',
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
      this.closeDeleteTask()
    },
    deleteColumn(index) {
      this.columnaDelete = this.tareaEstado[index].tableroId;
      this.dialogDelete = true;
    },

    async ConfDeleteColumn() {
      const tableroId = this.columnaDelete

      try {
        console.log('tableroId', tableroId)
        await this.$store.dispatch(
          `estado/${DELETE_COLUM}`, {
          id: tableroId,
        })
      } catch (err) { }
      this.$dialog.message.success(
        'La columna se elimino correctamente',
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
      this.closeDeleteColumn()
    },

    closeDeleteColumn() {
      this.dialogDelete = false
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
        console.log('1')
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
              true: { color: 'accent', text: 'Sí' },
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
            true: { color: 'accent', text: 'Sí' },
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

.classerror {
  color: #ffc7d0;
  margin-left: 30px;
}
</style>
