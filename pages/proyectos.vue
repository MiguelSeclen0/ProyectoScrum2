<template>
    <v-row>
        <v-col>
            <v-row style="margin-top: 2%; padding-left: 2%;">
                <v-toolbar-title class="text-medium"
                    style="margin-top: 2%; align-items: center;">Proyectos</v-toolbar-title>
                <v-spacer></v-spacer>
                <UserMenu style="margin-right: 2%;" :name="usersName()">
                    <v-list subheader>
                        <v-subheader>Opciones</v-subheader>
                        <v-list-item @click.stop="onLogout">
                            <v-list-item-icon>
                                <v-icon>mdi-logout-variant</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Cerrar Sesion</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </UserMenu>
            </v-row>
            <v-row style="margin: 2%;">
                <v-text-field color="accent" append-icon="mdi-magnify" label="Buscar Proyecto" outlined
                    rounded></v-text-field>
                <v-btn style="margin-left: 2%;" color="accent mx-2" fab @click="showDialog">
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </v-row>
            <v-row style="margin: 2%; padding-left: 2%;">
                <CardProyect :cardsCustom="proyecto" />
            </v-row>
        </v-col>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.clave1" label="Clave"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.tipo1" label="Tipo"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.oportunidad1" label="Oportunidad"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5">¿Estás seguro de eliminar este proyecto?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
  
<script>

import { mapState } from 'vuex'
import { FETCH_PROYECTOS } from '@/utils/types/proyectos/actions.types'

export default {
    name: 'tablero',
    layout: 'default',
    async fetch() {
      debugger
      await Promise.all([this.$store.dispatch(`proyecto/${FETCH_PROYECTOS}`)])
    },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        Prueba: true,
        desserts: [],
        proyectoId: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            clave1: '',
            tipo1: '',
            oportunidad1: '',
        },
        defaultItem: {
            name: '',
            clave1: '',
            tipo1: '',
            oportunidad1: '',
        },
    }),

    computed: {
        ...mapState('proyecto', ['proyecto'],['proyectoId']),
        formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Proyecto' : 'Editar Proyecto'
        },
    },

    watch: {
        async handler() {
            this.dimensions = await this.$dimensions.findBy({
            IdUser: this.$auth.user.nombre,
        })
        },
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        showDialog() {
            this.dialog = true
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
        initialize() {
        },

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

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
        usersName(){
            return this.$auth.user.nombre
        },
        proyectos(){
            
        }
    },
}
</script>
<style>
.container-flex {
    display: flex;
    flex-direction: column;
    /* Cambiar la dirección a columna para apilar elementos verticalmente */
}

.smaller-card {
    width: 440px;
    height: 60px;
    border-radius: 15px;
}

.big-card {
    border-radius: 15px !important;
    border-bottom: solid 1px black !important;
}

.v-data-table {
    flex-grow: 1;
    /* Hace que el v-data-table ocupe todo el espacio disponible en el contenedor flex */
}

/* Clase para el contenedor de los tabs y el botón */
.tabs-button-container {
    display: grid;
    grid-template-columns: 1fr auto;
    /*Divide en dos columnas, la primera se ajusta automáticamente y la segunda tiene el ancho del contenido */
    align-items: center;
    /*Centra verticalmente los elementos */
}

/* Clase para el contenedor de los tabs */
.tabs-container {
    width: auto;
    /* Ajusta automáticamente el ancho según el contenido */
    max-width: 366px;
    /* Ancho máximo para los tabs */
}

/* Clase para los tabs */
.tab {
    padding: 6px 12px;
    /* Ajusta el espaciado interno de los tabs */
}

/* Clase para el botón */
.button {
    width: 140px;
    /* Ancho personalizado para el botón */
}
</style>