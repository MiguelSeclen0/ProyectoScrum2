<template>
    <v-row>
        <v-col>
            <v-row style="margin-top: 2%; padding-left: 2%;" class="justify-end">
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
            </v-row>
            <v-row>
                <v-col md="4">
                    <v-card>
                        Hola
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card>
                        Bye
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card>
                        Adios
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
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
        }
    },
}
</script>
<style>