<template>
    <v-row>
        <v-col>
            <v-row justify-center>
                <v-col md="3">
                    <v-card>
                        <v-list-item three-line>
                            <v-list-item-avatar tile size="50" style="background: #FFF176 !important;"
                                class="pa-4 text-center secondary text-no-wrap rounded-lg">
                                <v-icon color="black">mdi-format-list-bulleted</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <div class="text-overline mb-4">
                                    TOTAL ASIGNACIONES
                                    <v-list-item-title>
                                        {{tareaDatos.tareasTotales}}
                                    </v-list-item-title>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card>
                        <v-list-item three-line>
                            <v-list-item-avatar tile size="50" style="background: #FFB74D !important;"
                                class="pa-4 text-center secondary text-no-wrap rounded-lg">
                                <v-icon color="black">mdi-checkbox-multiple-outline</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <div class="text-overline mb-4">
                                    ASIGNACIONES COMPLETADAS
                                    <v-list-item-title>
                                        <!-- {{ tareasDatos.tareasCompletadas }} -->
                                    </v-list-item-title>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card>
                        <v-list-item three-line>
                            <v-list-item-avatar tile size="50" style="background: #F8BBD0 !important;"
                                class="pa-4 text-center secondary text-no-wrap rounded-lg">
                                <v-icon color="black">mdi-poll</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <div class="text-overline mb-4">
                                    ASIGNACIONES EN PROCESO
                                    <v-list-item-title>
                                        {{ tareasDatos.tareasFaltantes }}
                                    </v-list-item-title>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col>
                <span>{{ tareasDatos }}</span>
                <v-col md="1">
                    <UserMenu :name="usersName()">
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
                </v-col>
            </v-row>
            <v-row justify-left>
                <v-col>
                    <v-card margin-top="4%">
                        <v-col>
                            <ChartPrueba></ChartPrueba>
                        </v-col>
                    </v-card>
                </v-col>
                <v-col>
                    <TableUsers></TableUsers>
                </v-col>
            </v-row>
            <v-row justify-left>
                <v-col style="max-width: 700px; height: 400px;">
                    <CalendarTeams></CalendarTeams>
                </v-col>
                <!-- <v-col style="max-width: 700px; height: 400px;">
                    <ChartLine></ChartLine>
                </v-col> -->
            </v-row>
        </v-col>
    </v-row>
</template>
  
<script>
import { mapState } from 'vuex'
import { GlobalValues } from '~/utils/global'
import { FETCH_DATOS } from '@/utils/types/tareas/actions.types'
export default {
    name: 'dashboard',
    layout: 'default',
    data: () => ({

    }),
    computed: {
        ...mapState('tarea', ['tareaDatos']),
    },
    watch: {
    },
    async fetch() {
        await Promise.all([
            this.$store.dispatch(`tarea/${FETCH_DATOS}`, {
                id: GlobalValues.idProyect,
            }),
        ])
    },

    methods: {
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
    },
}

</script>
<style>
/* .container {
    margin-left: 0;
    margin-right: 0;
} */
</style>