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
  <v-data-table :headers="headers" :items-per-page="5" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-select v-model="selectedTeam" :items="equipo" item-text="nombre" label="Equipo Usuarios"></v-select>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="accent" dark class="mb-2" v-bind="attrs" v-on="on">
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
                    <v-text-field v-model="editedItem.name" label="Nombre" :rules="usernameRules" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Contraseña"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="sueldo"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select label="Equipo" v-model="equipoSelect" item-value="equipoId" :items="equipo"
                                item-text="nombre" backgroundColor="secondary" color="textito" outlined
                                item-color="secondary">
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

import { mapState } from 'vuex'
import { FETCH_USUARIO, INSERT_USUARIO, DELETE_USUARIO } from '@/utils/types/users/actions.types'
import { FETCH_EQUIPOS } from '@/utils/types/equipos/actions.types'
import { FETCH_MIEMBROS } from '@/utils/types/miembros/actions.types'
import { ValidationProvider, ValidationObserver } from 'vee-validate'


export default {
  components: { ValidationProvider, ValidationObserver },
  name: 'usuarios',
  layout: 'empty',
  async fetch() {
    await Promise.all([
      this.$store.dispatch(`usuario/${FETCH_USUARIO}`),
      this.$store.dispatch(`equipo/${FETCH_EQUIPOS}`),
      this.$store.dispatch(`miembro/${FETCH_MIEMBROS}`)
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
    editedItem: {
      usuarioId: '',
      nombre: 0,

    },
    headers: [
      {
        text: 'Nombre',
        align: 'center',
        sortable: false,
        value: 'usuario.nombre',
      },
      { text: 'Email', align: 'center', value: 'usuario.email' },
      { text: 'Sueldo', align: 'center', value: 'usuario.sueldo' },
      { text: 'Rol', align: 'center', value: 'rol.nombre' },
      {text: 'Opciones', align: 'center', value: 'actions'},
    ],
    equipoSelect: {},
    defaultItem: {
      name: '',
    },
  }),
  computed: {
    ...mapState('usuario', ['usuario']),
    ...mapState('equipo', ['equipo']),
    ...mapState('miembro', ['miembro']),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    usernameRules() {
      return [(value) => !!value || 'Ingrese Nombre de Usuario' || '']
    },
  },
  created() {
    // Asignar la primera opción por defecto al modelo
    if (this.equipo.length > 0) {
      this.equipoSelect = this.equipo[0].equipoId;
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    selectedTeam() {
      // this.selectedTeam === 'Usuarios' ? this.desserts = this.usuario : this.desserts = this.miembro
      this.desserts = this.miembro.filter(
        (x) => x.equipo.nombre === this.selectedTeam
      )
      console.log('patta', this.desserts)
    }
  },

  methods: {

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
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
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
  
 