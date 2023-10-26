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
                <CardProyect :cardsCustom="proyectoId" @click:update="editItem(proyectoId)"
                    @click:delete="deleteItem(proyectoId)" />
            </v-row>
        </v-col>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>


                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="editedItem.nombre" backgroundColor="secondary" outlined label="Nombre" color="textito"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field v-model="editedItem.cliente" backgroundColor="secondary" outlined label="Cliente" color="textito"></v-text-field>
                        </v-col>

                        <v-col>
                            <v-select
                            label="Estado"
                            v-model="estadoSelect"
                            item-value="estadoId"
                            :items="proyectoEstado"                           
                            item-text="nombre"
                            backgroundColor="secondary"
                            color="textito"
                            outlined>                            
                            </v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                        <DatePicker
                          label="Fecha Inicio"
                          v-model="editedItem.fechaInicio"
                          outlined
                          type='date'
                        />
                      </v-col>
                      <v-col>
                        <DatePicker
                          label="Fecha Fin"
                          v-model="editedItem.fechaFinalizacion"
                          outlined
                          type='date'
                        />
                      </v-col>
                        <!-- <v-col>
                            <v-text-field type="date" v-model="editedItem.name" backgroundColor="secondary" outlined label="Categoría" color="textito"></v-text-field>
                        </v-col>
                        <v-col>
                            <label>Fecha fin</label>
                            <v-text-field type="date" backgroundColor="grey" rounded></v-text-field>
                        </v-col> -->
                    </v-row>
                    <v-row>
                        <v-col>
                            <ColorPicker
                            label="Color"
                            v-model="editedItem.ColorPicker"
                            outlined
                            type="String"
                            />
                        </v-col>
                        <v-col>
                            <v-select
                            label="Tipo"
                            v-model="tipoSelect"
                            item-value="tipoId"
                            :items="tipo"                           
                            item-text="nombre"
                            backgroundColor="secondary"
                            color="textito"
                            outlined>                            
                            </v-select>
                        </v-col>                        
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field v-model="editedItem.presupuesto" backgroundColor="secondary" outlined label="Presupuesto" color="textito"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-select
                            label = "Equipo"
                            v-model="equipoSelect"
                            item-value="equipoId"
                            :items="equipo"                            
                            item-text="nombre"
                            backgroundColor="secondary"
                            color="textito"
                            outlined>                            
                            </v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-textarea v-model="editedItem.descripcion" backgroundColor="secondary" outlined label="Detalle"></v-textarea>
                        </v-col>
                    </v-row>
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
import { FETCH_PROYECTOS, INSERT_PROYECTOS } from '@/utils/types/proyectos/actions.types'
import { FETCH_TIPOS } from '@/utils/types/tipos/actions.types'
import { FETCH_EQUIPOS } from '@/utils/types/equipos/actions.types'
import { FETCH_ESTADOSPROYECTOS } from '@/utils/types/estados/actions.types'

export default {
    name: 'proyectos',
    layout: 'default',
    async fetch() {
        await Promise.all([
            this.$store.dispatch(`proyecto/${FETCH_PROYECTOS}`, {
                id: this.$auth.user.email,}),
            this.$store.dispatch(`tipo/${FETCH_TIPOS}`),
            this.$store.dispatch(`equipo/${FETCH_EQUIPOS}`),
            this.$store.dispatch(`estado/${FETCH_ESTADOSPROYECTOS}`)            
        ])
    },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        Prueba: true,
        Proyectos: [],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            nombre: '',
            cliente: '',
            descripcion: '',
            tipo: {},
            fechaInicio: '',
            fechaFinalizacion: '',
            presupuesto: '',
            estado: '',
            duracion: '',
            participantes: '',
            equipo: {
                equipoId: '',
            },
        },
        estadoSelect: {},
        tipoSelect: {},
        equipoSelect: {},
        defaultItem: {
            name: '',
            clave1: '',
            tipo1: '',
            oportunidad1: '',
        },
    }),

    computed: {
        ...mapState('proyecto', ['proyectoId']),
        ...mapState('tipo', ['tipo']),
        ...mapState('equipo', ['equipo']),
        ...mapState('estado', ['proyectoEstado']),
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
            this.editedIndex = this.proyectoId.proyectoId
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.proyectoId.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.proyectoId.splice(this.editedIndex, 1)
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
            // if (this.editedIndex > -1) {
            //     Object.assign(this.proyectoId[this.editedIndex], this.editedItem)
            // } else {
            //     this.proyectoId.push(this.editedItem)
            // }
            console.log('editItem',this.editedItem)
            console.log('Select',this.select)            
            
            const newProyecto = {
                nombre: this.editedItem.nombre,
                cliente: this.editedItem.cliente,
                descripcion: this.editedItem.descripcion,
                color: this.editedItem.ColorPicker,
                fechaInicio: this.editedItem.fechaInicio,
                fechaFinalizacion: this.editedItem.fechaFinalizacion,
                presupuesto: this.editedItem.presupuesto,
                estado: {
                    estadoId: this.estadoSelect,                    
                },   
                tipo: {
                    tipoId: this.tipoSelect,                    
                },  
                equipo: {
                    equipoId: this.equipoSelect,                    
                },                
            }
            console.log('NewProyect',newProyecto)
            const res = await this.$dialog.confirm({
                text: `¿Realmente desea agregar el proyecto?`,
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
                        `proyecto/${INSERT_PROYECTOS}`,
                        newProyecto
                    )
                    // Ya se puede ejecutar la modificación

                    this.$dialog.message.success(
                        'El proyecto se agrego correctamente',
                        {
                            position: 'top-right',
                        }
                    )
                    await this.$store.dispatch(`proyecto/${FETCH_PROYECTOS}`, {
                        id: this.$auth.user.email,
                    })
                } catch (err) { }
            }
            this.close()
        },
        usersName() {
            return this.$auth.user.nombre
        },
        proyectos() {

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