<template>
    <v-row>
        <v-col>
            <!-- <v-row style="margin-top: 2%; padding-left: 2%;" class="justify-end">
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
            </v-row> -->
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
                                        600
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
                                        600
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
                                        600
                                    </v-list-item-title>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col>
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
                <v-card margin-top="4%">
                    <v-col>
                        <ChartPrueba></ChartPrueba>
                    </v-col>
                </v-card>
            </v-row>
        </v-col>
        <CalendarPrueba></CalendarPrueba>
    </v-row>
</template>
  
<script>
export default {
    name: 'dashboard',
    layout: 'default',
    data: () => ({

    }),
    computed: {

    },
    watch: {
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
} */</style>