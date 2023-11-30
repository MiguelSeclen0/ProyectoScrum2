<!-- <template>
  <DataTable :value="sales" :paginator="true" responsiveLayout="scroll">
    <ColumnGroup type="header">
      <Row>
        <Column header="Product" :rowspan="3" />
        <Column header="Sale Rate" :colspan="4" />
      </Row>
      <Row>
        <Column header="Sales" :colspan="2" />
        <Column header="Profits" :colspan="2" />
      </Row>
      <Row>
        <Column header="Last Year" :sortable="true" field="lastYearSale" />
        <Column header="This Year" :sortable="true" field="thisYearSale" />
        <Column header="Last Year" :sortable="true" field="lastYearProfit" />
        <Column header="This Year" :sortable="true" field="thisYearProfit" />
      </Row>
    </ColumnGroup>
    <Column field="product" />
    <Column field="lastYearSale">
      <template #body="slotProps">
        {{ slotProps.sales.lastYearSale }}%
      </template>
    </Column>
    <Column field="thisYearSale">
      <template #body="slotProps">
        {{ slotProps.sales.thisYearSale }}%
      </template>
    </Column>
    <Column field="lastYearProfit">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.sales.lastYearProfit) }}
      </template>
    </Column>
    <Column field="thisYearProfit">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.sales.thisYearProfit) }}
      </template>
    </Column>
    <ColumnGroup type="footer">
      <Row>
        <Column footer="Totals:" :colspan="3" :footerStyle="{ 'text-align': 'right' }" />
        <Column :footer="lastYearTotal" />
        <Column :footer="thisYearTotal" />
      </Row>
    </ColumnGroup>
  </DataTable>
</template> -->
<template>
  <v-data-table :headers="tableHeaders" :items-per-page="10" :items="desserts" sort-by="Nombre" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-select v-model="selectedTeam" :items="equipoWithAll" item-text="nombre" label="Equipo Usuarios"></v-select>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="accent" dark class="mb-2" v-bind="attrs" v-on="on" @click="toggleForm">
              Nuevo Usuario
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      :value="selectedTeam === 'Usuarios' ? editedItem.nombre : (editedItem.usuario ? editedItem.usuario.nombre : '')"
                      @input="updateNombre" label="Nombre" :rules="rules.nameRules"></v-text-field>

                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      :value="selectedTeam === 'Usuarios' ? editedItem.email : (editedItem.usuario ? editedItem.usuario.email : '')"
                      @input="updateEmail" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      :value="selectedTeam === 'Usuarios' ? editedItem.contra : (editedItem.usuario ? editedItem.usuario.contra : '')"
                      @input="updateContra" label="Contraseña"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      :value="selectedTeam === 'Usuarios' ? editedItem.sueldo : (editedItem.usuario ? editedItem.usuario.sueldo : '')"
                      @input="updateSueldo" label="Sueldo" type="number" :rules="rules.sueldoRules"></v-text-field>
                  </v-col>
                  <v-col v-if="showForm" cols="12" sm="6" md="4">
                    <v-select v-model="equipoSelect" item-value="equipoId" :items="equipo" item-text="nombre"
                      backgroundColor="secondary" color="textito" outlined item-color="secondary">
                    </v-select>
                  </v-col>
                  <v-col v-if="showForm" cols="12" sm="6" md="4">
                    <v-select v-model="rolSelect" item-value="rolId" :items="rol" item-text="nombre"
                      backgroundColor="secondary" color="textito" outlined item-color="secondary">
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon color='accent' small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon color='accent' small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>

import { ValidationProvider, ValidationObserver} from 'vee-validate'
import { mapState } from 'vuex'
import { FETCH_USUARIO, INSERT_USUARIO, DELETE_USUARIO } from '@/utils/types/users/actions.types'
import { FETCH_EQUIPOS } from '@/utils/types/equipos/actions.types'
import { FETCH_ROLS } from '@/utils/types/rols/actions.types'
import { FETCH_MIEMBROS, INSERT_MIEMBROS, DELETE_MIEMBROS } from '@/utils/types/miembros/actions.types'


export default {
  components: { ValidationProvider, ValidationObserver },
  name: 'usuarios',
  layout: 'empty',
  async fetch() {
    await Promise.all([
      this.$store.dispatch(`usuario/${FETCH_USUARIO}`),
      this.$store.dispatch(`equipo/${FETCH_EQUIPOS}`),
      this.$store.dispatch(`miembro/${FETCH_MIEMBROS}`),
      this.$store.dispatch(`rol/${FETCH_ROLS}`)
    ])
  },
  data: () => ({
    selectedTeam: null,
    selectOption: '',
    dialog: false,
    dialogDelete: false,
    Usuarios: [],
    desserts: [],
    editedIndex: -1,
    usuarioDelete: '',
    editedItem: {
      nombre: '',
      email: '',
      contra: '',
      sueldo: '',
      miembroId: '',
      usuarioId: '',
      usuario: {},
      equipo: {
        equipoId: '',
        nombre: ''
      },
      rol: {
        rolId: '',
        nombre: ''
      }
    },
    headers: [],
    equipoSelect: {},
    rolSelect: {},
    defaultItem: {
      name: '',
    },
    showForm: true,
    formValid: false,
    isEditing: false,
  }),
  computed: {
    ...mapState('usuario', ['usuario']),
    ...mapState('equipo', ['equipo']),
    ...mapState('miembro', ['miembro']),
    ...mapState('rol', ['rol']),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    rules() {
            return {
                nameRules: [v => !!v || 'Nombre es requerido'],
                emailRules: [v => !!v || 'Email es requerido'],
                usuariosRules: [v => !!v || 'Contraseña es requerido'],
                sueldoRules: [v => !!v || 'Sueldo es requerido'],
                sueldoRules: [v => !!v || 'Sueldo es requerido'],
            }
        },
    equipoWithAll() {
      // Crea una copia del array 'equipo' y agrega una opción para mostrar todos los usuarios
      const equipoCopy = [...this.equipo];
      equipoCopy.unshift({ equipoId: 'all', nombre: 'Usuarios' });
      return equipoCopy;
    },

    tableHeaders() {
      if (this.selectedTeam === 'Usuarios') {
        // Si se selecciona 'Todos los Usuarios', muestra estas columnas
        return [
          { text: 'Nombre', align: 'center', sortable: false, value: 'nombre' },
          { text: 'Email', align: 'center', value: 'email' },
          { text: 'Sueldo', align: 'center', value: 'sueldo' },
          { text: 'Opciones', align: 'center', value: 'actions' },
        ];
      } else {
        // Si se selecciona un equipo específico, muestra las columnas originales
        return [
          { text: 'Nombre', align: 'center', sortable: false, value: 'usuario.nombre' },
          { text: 'Email', align: 'center', value: 'usuario.email' },
          { text: 'Sueldo', align: 'center', value: 'usuario.sueldo' },
          { text: 'Rol', align: 'center', value: 'rol.nombre' },
          { text: 'Opciones', align: 'center', value: 'actions' },
        ];
      }
    },
    areTextFieldsFilled() {
      const filled = (this.editedItem.nombre &&
        this.editedItem.email &&
        this.editedItem.contra &&
        this.editedItem.sueldo) ||
        this.isEditing;
      this.formValid = filled; // Actualiza this.formValid
      return filled;
    },
  },
  created() {
    // Asignar la primera opción por defecto al modelo
    const defaultTeam = 'Usuarios'; // o el valor que desees establecer por defecto
    this.selectedTeam = defaultTeam;
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    // selectedTeam() {
    //   // this.selectedTeam === 'Usuarios' ? this.desserts = this.usuario : this.desserts = this.miembro
    //   this.desserts = this.miembro.filter(
    //     (x) => x.equipo.nombre === this.selectedTeam
    //   )
    // },
    // selectedTeam() {
    //   if (this.selectedTeam === 'Usuarios') {
    //     // Si se selecciona 'Todos los Usuarios', muestra todos los usuarios
    //     this.desserts = this.usuario.map((usuario) => ({
    //       usuarioId: usuario.usuarioId,
    //       nombre: usuario.nombre,
    //       email: usuario.email,
    //       sueldo: usuario.sueldo,
    //     }));
    //   } else {
    //     // Si se selecciona un equipo específico, filtra los usuarios por ese equipo
    //     this.desserts = this.miembro.filter((x) => x.equipo.nombre === this.selectedTeam);
    //   }
    // },
    'editedItem.nombre': 'updateFormValid',
    'editedItem.email': 'updateFormValid',
    'editedItem.contra': 'updateFormValid',
    'editedItem.sueldo': 'updateFormValid',
    isEditing: 'updateFormValid',
  },

  methods: {
    updateFormValid() {
      this.formValid = this.areTextFieldsFilled;
    },
    toggleForm() {
      this.showForm = false;
    },

    editItem(item) {
      if (this.selectedTeam === 'Usuarios') {
        if (this.equipo.length > 0) {
          this.equipoSelect = null;
        }
        if (this.rol.length > 0) {
          this.rolSelect = null;
        }
      } else {
        this.rolSelect = item.rol;
        this.equipoSelect = item.equipo;
      }
      this.showForm = true;
      // if(!this.selectedTeam === 'Usuarios){
      //   this.editedItem.nombre
      // }
      this.editedIndex = true
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log("patatat", item)
      this.dialog = true
    },

    callFields(item) {
      this.editedItem.miembroId = item.miembroId;
      this.editedItem.usuario.usuarioId = item.usuarioId;
      this.editedItem.usuario.nombre = item.usuario.nombre;
      this.editedItem.usuario.email = item.usuario.email;
      this.editedItem.usuario.contra = item.usuario.contrasena;
      this.editedItem.usuario.sueldo = item.usuario.sueldo;
      this.equipoSelect = item.equipo;
      this.rolSelect = item.rol;
    },

    clearFields() {
      if (this.selectedTeam === 'Usuarios') {
        this.editedItem.nombre = '';
        this.editedItem.email = '';
        this.editedItem.contra = '';
        this.editedItem.sueldo = '';
      } else {
        this.editedItem.usuario.nombre = '';
        this.editedItem.usuario.email = '';
        this.editedItem.usuario.contra = '';
        this.editedItem.usuario.sueldo = '';
      }

    },



    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.showForm === false) {
        const newUsuario = {
          nombre: this.editedItem.nombre,
          email: this.editedItem.email,
          contrasena: this.editedItem.contra, 
          sueldo: this.editedItem.sueldo,
        }
        const res = await this.$dialog.confirm({
          text: `¿Realmente desea agregar el usuario?`,
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
              `usuario/${INSERT_USUARIO}`, newUsuario
            )

            this.$dialog.message.success(`El usuario se agrego correctamente`,
              {
                position: 'top-right',
              }
            )
            await this.$store.dispatch(`usuario/${FETCH_USUARIO}`)
          } catch (err) { }
        }
        this.editedIndex = false
        this.close()

      } else {

        if (this.selectedTeam === 'Usuarios') {

          const editUsuario = {
            usuarioId: this.editedItem.usuarioId,
            nombre: this.editedItem.nombre,
            email: this.editedItem.email, // Ajusta según tus necesidades
            contrasena: this.editedItem.contra, // Ajusta según tus necesidades
            sueldo: this.editedItem.sueldo,

          }

          const res = await this.$dialog.confirm({
            text: `¿Realmente desea modificar el usuario?`,
            title: 'ADVERTENCIA',
            actions: {
              false: 'No',
              true: { color: 'accent', text: 'Sí' },
            },
            persistent: true,
          })

          if (res) {
            if (this.equipoSelect === null || this.rolSelect === null) {
              try {
                await this.$store.dispatch(
                  `usuario/${INSERT_USUARIO}`, editUsuario
                )

                this.$dialog.message.success(`El usuario se modifico correctamente`,
                  {
                    position: 'top-right',
                  }
                )
                await this.$store.dispatch(`usuario/${FETCH_USUARIO}`)
              } catch (err) { }

            } else {
              const newMiembro = {
                usuario: {
                  usuarioId: this.editedItem.usuarioId,
                  nombre: "",
                },
                rol: {
                  rolId: this.rolSelect,
                },
                equipo: {
                  equipoId: this.equipoSelect,
                },
              };

              console.log("sdfahfksfj", newMiembro)

              try {
                await this.$store.dispatch(
                  `usuario/${INSERT_USUARIO}`, editUsuario
                )
                await this.$store.dispatch(
                  `miembro/${INSERT_MIEMBROS}`, newMiembro)
                this.$dialog.message.success(`El usuario se modifico correctamente`,
                  {
                    position: 'top-right',
                  }
                )
                await this.$store.dispatch(`usuario/${FETCH_USUARIO}`)
                await this.$store.dispatch(`miembro/${FETCH_MIEMBROS}`)
              } catch (err) { }
            }

          }



        } else {
          console.log("EDITAR MIEMBRO")

          const editMiembro = {
            miembroId: this.editedItem.miembroId,
            usuario: {
              usuarioId: this.editedItem.usuario.usuarioId,
              nombre:'',
            },
            rol: {
              rolId: this.rolSelect,
            },
            equipo: {
              equipoId: this.equipoSelect,
            },
          };
          const res = await this.$dialog.confirm({
            text: `¿Realmente desea modificar el usuario?`,
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
                `miembro/${INSERT_MIEMBROS}`, editMiembro
              )

              this.$dialog.message.success(`El Miembro se modifico correctamente`,
                {
                  position: 'top-right',
                }
              )
              await this.$store.dispatch(`miembro/${FETCH_MIEMBROS}`)
            } catch (err) { }

          }
        }

      }
      this.editedIndex = false
      this.close()

    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    deleteItem(item) {
      if (this.selectedTeam === 'Usuarios') this.usuarioDelete = item.usuarioId
      else this.usuarioDelete = item.miembroId
      this.dialogDelete = true
    },

    async deleteItemConfirm() {

      const id = this.usuarioDelete

      console.log("sada", id)
      if (this.selectedTeam === 'Usuarios') {
        try {
          await this.$store.dispatch(
            `usuario/${DELETE_USUARIO}`, {
            id: id,
          })

          this.$dialog.message.success(
            'El Usuario se elimino correctamente',
            {
              position: 'top-right',
            }
          )
          await this.$store.dispatch(`usuario/${FETCH_USUARIO}`)

        } catch (err) { }

      } else {
        try {
          await this.$store.dispatch(
            `miembro/${DELETE_MIEMBROS}`, {
            id: id,
          })

          this.$dialog.message.success(
            'El miembro se elimino correctamente',
            {
              position: 'top-right',
            }
          )
          await this.$store.dispatch(`miembro/${FETCH_MIEMBROS}`)

        } catch (err) { }

      }
      this.editedIndex = false
      this.closeDelete()
    },


    updateNombre(value) {
      if (this.selectedTeam === 'Usuarios') {
        this.editedItem.nombre = value;
      } else {
        if (!this.editedItem.usuario) {
          this.editedItem.usuario = {};
        }
        this.editedItem.usuario.nombre = value;
      }
    },
    updateEmail(value) {
      if (this.selectedTeam === 'Usuarios') {
        this.editedItem.email = value;
      } else {
        if (!this.editedItem.usuario) {
          this.editedItem.usuario = {};
        }
        this.editedItem.usuario.email = value;
      }
    },
    updateContra(value) {
      if (this.selectedTeam === 'Usuarios') {
        this.editedItem.contra = value;
      } else {
        if (!this.editedItem.usuario) {
          this.editedItem.usuario = {};
        }
        this.editedItem.usuario.contra = value;
      }
    },
    updateSueldo(value) {
      if (this.selectedTeam === 'Usuarios') {
        this.editedItem.sueldo = value;
      } else {
        if (!this.editedItem.usuario) {
          this.editedItem.usuario = {};
        }
        this.editedItem.usuario.sueldo = value;
      }
    },


  },
}
</script>
  
 