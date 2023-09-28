<template>
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
        <!-- eslint-disable -->
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Proyectos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            Crear Nuevo Proyecto
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
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn color="primary" rounded small class="black--text" to="/inspire">Ir</v-btn>
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>
</template>
  
<script>
export default {
    name: 'tablero',
    layout: 'sidebar',
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Nombre',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Clave', value: 'clave1' },
            { text: 'Tipo', value: 'tipo1' },
            { text: 'Oportunidad', value: 'oportunidad1' },
            { text: 'Acciones', value: 'actions', sortable: false },
        ],
        desserts: [],
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
        formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Proyecto' : 'Editar Proyecto'
        },
    },

    watch: {
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
        initialize() {
            this.desserts = [
                {
                    name: 'Implementación de un sistema de gestión de pedidos',
                    clave1: 'ISG',
                    tipo1: 'Software gestionado por el equipo',
                    oportunidad1: 'Erick Irwin Pajuelo Ojeda',
                },
                {
                    name: 'Optimización de un blog corporativo',
                    clave1: 'OBC',
                    tipo1: 'Software gestionado por el equipo',
                    oportunidad1: 'Culqui Sanchez Axel Adrian',
                },
                {
                    name: 'Desarrollo de una aplicación móvil de delivery',
                    clave1: 'DAM',
                    tipo1: 'Software gestionado por el equipo',
                    oportunidad1: 'Mucching Sanchez Grace Victoria',
                },
                {
                    name: 'Implementación de un sistema de reservas de hoteles',
                    clave1: 'ISR',
                    tipo1: 'Software gestionado por el equipo',
                    oportunidad1: 'Orihuela Vera Fernando Alan Jesus',
                },
                {
                    name: 'Implementación de un sistema de gestión de proyectos',
                    clave1: 'ISP',
                    tipo1: 'Software gestionado por el equipo',
                    oportunidad1: 'Erick Irwin Pajuelo Ojeda',
                },
                {
                    name: 'Implementación de un sistema de reservas online',
                    clave1: 'ISO',
                    tipo1: 'Software gestionado por el equipo',
                    oportunidad1: 'Mucching Sanchez Grace Victoria',
                },
                {
                    name: 'Desarrollo de una aplicación de realidad aumentada',
                    clave1: 'DAR',
                    tipo1: 'Software gestionado por el equipo',
                    oportunidad1: 'Limas Meza Patrick Sebastian',
                },
                {
                    name: 'Diseño de una aplicación de medición de servicios',
                    clave1: 'DAS',
                    tipo1: 'Software gestionado por el equipo',
                    oportunidad1: 'Seclen Chavez Miguel Andres',
                },
                {
                    name: 'Elaboración de una plataforma de mentorías online',
                    clave1: 'EPM',
                    tipo1: 'Software gestionado por el equipo',
                    oportunidad1: 'Orihuela Vera Fernando Alan Jesus',
                },
                {
                    name: 'Construcción de una aplicación colaborativa de empresa familiar',
                    clave1: 'CAC',
                    tipo1: 'Software gestionado por el equipo',
                    oportunidad1: 'Erick Irwin Pajuelo Ojeda',
                },
            ]
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
    },
}
</script>
<style>
.container-flex {
    display: flex;
    flex-direction: column;
    /* Cambiar la dirección a columna para apilar elementos verticalmente */
}

.v-data-table {
    flex-grow: 1;
    /* Hace que el v-data-table ocupe todo el espacio disponible en el contenedor flex */
}
</style>