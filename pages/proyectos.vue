<template>
    <v-row>
        <v-col>
            <v-row style="margin-top: 0%; padding-left: 2%;">
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
                <!-- <v-text-field v-model="find" color="accent" append-icon="mdi-magnify" label="Buscar Proyecto" outlined
                    @input="onSearchProyectos" rounded></v-text-field> -->
                <v-btn style="margin-left: 2%;" color="accent mx-2" fab @click="showDialog">
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </v-row>
            <v-row style="margin: 2%; padding-left: 2%;">
                <v-row>
                    <div v-for="item in  proyectoId" :key="item.proyectoId" class="hand-cursor"
                        style="margin-left: 2%; margin-top: 1%">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <div :class="`elevation-${hover ? 24 : 6}`" :style="{ 'background-color': item.color }"
                                    class="mx-auto pa-6 transition-swing smaller-card"
                                    style="position: relative; z-index: 1">
                                    {{ item.cliente }}
                                    <v-icon style="margin-left: 3%;" color="accent" medium
                                        @click="editItem(item)">mdi-pencil</v-icon>
                                    <v-icon color="accent" medium @click="deleteItem(item)"> mdi-trash-can-outline
                                    </v-icon>
                                </div>
                            </template>
                        </v-hover>
                        <v-card class="mt-n10 mx-auto big-card" elevation="0" height="250" width="500" color="secondary">
                            <br>
                            <br>
                            <v-card-text class="d-flex align-center
                                justify-center">{{ item.tipo.nombre }}</v-card-text>
                            <span style="margin-left:8%"> <v-badge :value="hover" color="deep-purple accent-4"
                                    :content="item.participantes" left transition="slide-x-transition">
                                    <v-hover v-model="hover">
                                        <v-icon color="accent" large>
                                            mdi-account
                                        </v-icon>
                                    </v-hover>
                                </v-badge>Participantes</span>
                            <span style="margin-left: 40%;"><v-icon color="accent"
                                    large>mdi-calendar-month-outline</v-icon>{{
                                        item.duracion }}</span>
                            <span style="margin-left: 8%;"><v-icon color="accent" large>mdi-cash-multiple</v-icon>{{
                                item.duracion }}</span>
                            <span style="margin-left: 45.5%;"><v-icon color="accent" large>mdi-cash</v-icon>{{
                                item.duracion }}</span>
                            <v-divider style="margin: 5%;"></v-divider>
                            <span @click="getIdProj(item)">
                                <ProgressBar style="margin: 1% 5% 1% 5%;" :value="item.porcentaje">
                                    {{ item.porcentaje }}%
                                </ProgressBar>
                            </span>
                        </v-card>
                    </div>
                </v-row>
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
                            <v-text-field v-model="editedItem.nombre" backgroundColor="secondary" outlined label="Nombre"
                                ref="campo1Ref" color="textito" :rules="rules.nameRules" required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field v-model="editedItem.cliente" backgroundColor="secondary" outlined label="Cliente"
                                ref="campo2Ref" :rules="rules.clientRules" color="textito"></v-text-field>
                        </v-col>

                        <v-col>
                            <v-select label="Estado" v-model="estadoSelect" item-value="estadoId" :items="proyectoEstado"
                                item-text="nombre" backgroundColor="secondary" color="textito" item-color="secondary"
                                :rules="rules.selectRules" outlined>
                            </v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <DatePicker ref="campo4Ref" label="Fecha Inicio" v-model="editedItem.fechaInicio" outlined
                                type='date' :rules="rules.fechaInicioRules" color="textito" />
                        </v-col>
                        <v-col>
                            <DatePicker ref="campo5Ref" label="Fecha Fin" v-model="editedItem.fechaFinalizacion" outlined
                                :rules="rules.fechaFinalRules" type='date' color="textito" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <ColorPicker ref="campo6Ref" label="Color" v-model="editedItem.ColorPicker" outlined
                                :rules="rules.colorRules" color="textito" />
                        </v-col>
                        <v-col>
                            <v-select label="Tipo" v-model="tipoSelect" item-value="tipoId" :items="tipo" item-text="nombre"
                                :rules="rules.selectRules" backgroundColor="secondary" color="textito" outlined
                                item-color="secondary">
                            </v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field ref="campo8Ref" v-model="editedItem.presupuesto" backgroundColor="secondary"
                                :rules="rules.presupuestoRules" outlined label="Presupuesto" color="textito"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-select label="Equipo" v-model="equipoSelect" item-value="equipoId" :items="equipo"
                                item-text="nombre" backgroundColor="secondary" color="textito" outlined
                                :rules="rules.selectRules" item-color="secondary">
                            </v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-textarea v-model="editedItem.descripcion" backgroundColor="secondary" outlined
                                label="Detalle" color="textito"></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <span class="classerror" v-if="incompletefield === true">Por favor, completa todos los campos.</span>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeCancel()">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save()">
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
                    <v-btn color="blue darken-1" text @click="closeDelete()">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm()">Eliminar</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
  
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapState } from 'vuex'
import { FETCH_PROYECTOS, FETCH_PROYECTOSALL, INSERT_PROYECTOS, DELETE_PROYECTOS } from '@/utils/types/proyectos/actions.types'
import { FETCH_TIPOS } from '@/utils/types/tipos/actions.types'
import { FETCH_EQUIPOS } from '@/utils/types/equipos/actions.types'
import { FETCH_ESTADOSPROYECTOS } from '@/utils/types/estados/actions.types'
import { GlobalValues } from '~/utils/global'

export default {
    components: { ValidationProvider, ValidationObserver },
    name: 'proyectos',
    layout: 'empty',
    async fetch() {
        await Promise.all([
            this.$auth.user.authorities[0].authority === "ADMINISTRADOR" ? this.$store.dispatch(`proyecto/${FETCH_PROYECTOSALL}`)
                : this.$store.dispatch(`proyecto/${FETCH_PROYECTOS}`, {
                    id: this.$auth.user.email,
                }),
            this.$store.dispatch(`tipo/${FETCH_TIPOS}`),
            this.$store.dispatch(`equipo/${FETCH_EQUIPOS}`),
            this.$store.dispatch(`estado/${FETCH_ESTADOSPROYECTOS}`)
        ])
    },
    data: () => ({
        dialog: false,
        incompletefield: false,
        hover: true,
        dialogDelete: false,
        Prueba: true,
        find: '',
        bar: 30,
        Proyectos: [],
        desserts: [],
        editedIndex: false,
        proyectoDelete: '',
        editedItem: {
            proyectoId: '',
            ColorPicker: '',
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
        estadoSelect: {estadoId: "6530997b91bbab402bbfdb5c",
        nombre: "En progreso"},
        tipoSelect: {"tipoId": "653099b891bbab402bbfdb5f",
        "nombre": "Página Web"},
        equipoSelect: {"equipoId": "6525ea0674a3e40d011d2834",
        "nombre": "Equipo 01"},
        defaultItem: {
            name: '',
            clave1: '',
            tipo1: '',
            oportunidad1: '',
        },
        // nameRules: [v => !!v || 'Nombre es requerido'],
        // clientRules: [v => !!v || 'Cliente es requerido'],
        // selectRules: [v => !!v || 'El valor es requerido'],
        // fechaInicioRules: [v => !!v || 'Fecha de inicio es requerido'],
        // fechaFinalRules: [v => !!v || 'Fecha final es requerido'],
        // colorRules: [v => !!v || 'Seleccionar un color es requerido'],
        // presupuestoRules: [v => !!v || 'Presupuesto es requerido'],
    }),

    computed: {
        ...mapState('proyecto', ['proyectoId'],),
        ...mapState('tipo', ['tipo']),
        ...mapState('equipo', ['equipo']),
        ...mapState('estado', ['proyectoEstado']),
        formTitle() {
            return this.editedIndex === true ? 'Editar Proyecto' : 'Nuevo Proyecto'
        },
        rules() {
            return {
                nameRules: [v => !!v || 'Nombre es requerido'],
                clientRules: [v => !!v || 'Cliente es requerido'],
                selectRules: [v => !!v || 'El valor es requerido'],
                fechaInicioRules: [v => !!v || 'Fecha de inicio es requerido'],
                fechaFinalRules: [(d) => !!d || 'Fecha de Final es requerido',
                (v) => {
                    const end = this.$moment(this.editedItem.fechaFinalizacion).format(
                        'yyyy-MM-DD'
                    )
                    const start = this.$moment(
                        this.editedItem.fechaInicio
                    ).format('yyyy-MM-DD')

                    return end >= start || 'La fecha final no puede ser menor a la inicial'
                },],
                colorRules: [v => !!v || 'Seleccionar un color es requerido'],
                presupuestoRules: [v => !!v || 'Presupuesto es requerido'],
            }
        }
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
        onSearchProyectos() {
            _.debounce(this.fetchSurveys, 1000).apply(this)
        },

        editItem(item) {
            this.editedIndex = true
            this.dialog = true
            this.callFields(item)
        },
        callFields(item) {
            this.editedItem.proyectoId = item.proyectoId;
            this.editedItem.nombre = item.nombre;
            this.editedItem.cliente = item.cliente;
            this.editedItem.fechaInicio = item.fechaInicio;
            this.editedItem.fechaFinalizacion = item.fechaFinalizacion;
            this.editedItem.ColorPicker = item.color;
            this.editedItem.presupuesto = item.presupuesto;
            this.editedItem.descripcion = item.descripcion;
            this.estadoSelect = item.estado;
            this.tipoSelect = item.tipo;
            this.equipoSelect = item.equipo;
        },
        deleteItem(item) {
            this.proyectoDelete = item.proyectoId
            this.dialogDelete = true
        },

        async deleteItemConfirm() {
            // this.proyectoId.splice(this.editedIndex, 1)            

            const idProyecto = this.proyectoDelete
            console.log('idProyecto', idProyecto)

            try {
                await this.$store.dispatch(
                    `proyecto/${DELETE_PROYECTOS}`, {
                    id: idProyecto,
                })

            } catch (err) { }
            this.$dialog.message.success(
                'El proyecto se elimino correctamente',
                {
                    position: 'top-right',
                }
            )

            await this.$store.dispatch(`proyecto/${FETCH_PROYECTOS}`, {
                id: this.$auth.user.email,
            })
            this.closeDelete()
        },

        clearFields() {
            this.editedItem.nombre = '';
            this.editedItem.cliente = '';
            this.editedItem.fechaInicio = '';
            this.editedItem.fechaFinalizacion = '';
            this.editedItem.ColorPicker = '';
            this.editedItem.presupuesto = '';
            this.editedItem.descripcion = '';
            this.estadoSelect = null;
            this.tipoSelect = null;
            this.equipoSelect = null;
        },
        close() {
            this.clearFields()
            this.dialog = false
        },
        closeCancel() {
            this.dialog = false
        },
        closeDelete() {
            this.dialogDelete = false
        },

        async save() {
            const valorCampo1 = this.$refs.campo1Ref ? this.$refs.campo1Ref.value.trim() : ''
            const valorCampo2 = this.$refs.campo2Ref ? this.$refs.campo2Ref.value.trim() : ''
            const valorCampo4 = this.$refs.campo4Ref ? this.$refs.campo4Ref.value.trim() : ''
            const valorCampo5 = this.$refs.campo5Ref ? this.$refs.campo5Ref.value.trim() : ''
            const valorCampo6 = this.$refs.campo6Ref ? this.$refs.campo6Ref.value.trim() : ''
            const valorCampo8 = this.$refs.campo8Ref ? this.$refs.campo8Ref.value.trim() : ''

            if (!valorCampo1 || valorCampo1 === undefined
                 || !valorCampo2 || valorCampo2 === undefined
                 || !valorCampo4 || valorCampo4 === undefined
                 || !valorCampo5 || valorCampo5 === undefined
                 || !valorCampo6 || valorCampo6 === undefined
                 || !valorCampo8 || valorCampo8 === undefined                  
            ) {
                this.incompletefield = true
            } else {
                this.incompletefield = false
                console.log('editItem', this.editedItem)
                console.log('Select', this.select)

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

                const editProyecto = {
                    proyectoId: this.editedItem.proyectoId,
                    nombre: this.editedItem.nombre,
                    cliente: this.editedItem.cliente,
                    descripcion: this.editedItem.descripcion,
                    color: this.editedItem.ColorPicker,
                    fechaInicio: this.editedItem.fechaInicio,
                    fechaFinalizacion: this.editedItem.fechaFinalizacion,
                    presupuesto: this.editedItem.presupuesto,
                    estado: this.estadoSelect,
                    tipo: this.tipoSelect,
                    equipo: this.equipoSelect,
                }

                console.log('NewProyect', newProyecto)

                const res = await this.$dialog.confirm({
                    text: this.editedIndex === true ? `¿Realmente desea modificar el proyecto?` : `¿Realmente desea agregar el proyecto?`,
                    title: 'ADVERTENCIA',
                    titleColor: 'red',
                    actions: {
                        false: 'No',
                        true: { color: 'primary', text: 'Sí' },                        
                    },
                    persistent: true,
                })


                if (res) {
                    try {
                        await this.$store.dispatch(
                            `proyecto/${INSERT_PROYECTOS}`,
                            this.editedIndex === true ? editProyecto : newProyecto
                        )

                        this.$dialog.message.success(
                            this.editedIndex === true ? `El proyecto se modifico correctamente` : `El proyecto se agrego correctamente`,
                            {
                                position: 'top-right',
                            }
                        )
                        await this.$store.dispatch(`proyecto/${FETCH_PROYECTOS}`, {
                            id: this.$auth.user.email,
                        })
                    } catch (err) { }
                }
                this.editedIndex = false
                this.incompletefield = false
                this.close()
            }
        },
        usersName() {
            return this.$auth.user.nombre
        },
        proyectos() {

        },
        getIdProj(item) {
            const relation = this.proyectoId.filter(
                (x) => x.proyectoId === item.proyectoId
            )
            GlobalValues.idProyect = relation[0].proyectoId
            console.log('GlobalValues.idProyect', GlobalValues.idProyect)
            const URL = `/tablero`
            this.$router.push(URL)

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

.hand-cursor {
    cursor: pointer;
}

.p-progressbar-determinate .p-progressbar-value-animate {
    background: green !important;
    border-radius: 0 20px 20px 0px;
}

.classerror {
    color: #ffc7d0;
    margin-left: 30px;
}
</style>