<template>
    <v-row>
        <div v-for="item in  cardsCustom" :key="item.proyectoId" class="hand-cursor" style="margin-left: 2%;"
            @click="funcRedirect">
            <v-hover>
                <template v-slot:default="{ hover }">
                    <div :class="`elevation-${hover ? 24 : 6}`" :style="{ 'background-color': item.color }"
                        class="mx-auto pa-6 transition-swing smaller-card" style="position: relative; z-index: 1;">
                        {{ item.cliente }}

                    </div>
                </template>
            </v-hover>
            <v-card class="mt-n10 mx-auto big-card" elevation="0" height="250" width="500" color="secondary">
                <br>
                <br>
                <v-card-text class="d-flex align-center justify-center">{{ item.tipo }}</v-card-text>
                <span style="margin-left:8%"> <v-badge :value="hover" color="deep-purple accent-4" :content="item.participantes" left
                        transition="slide-x-transition">
                        <v-hover v-model="hover">
                            <v-icon color="accent" large>
                                mdi-account
                            </v-icon>
                        </v-hover>
                    </v-badge>Participantes</span>
                <span style="margin-left: 40%;"><v-icon color="accent" large>mdi-calendar-month-outline</v-icon>{{item.duracion}}</span>
                <v-divider style="margin: 5%;"></v-divider>
            </v-card>
        </div>
    </v-row>
</template>
<script>
export default {
    data: () => ({
        hover: false,
    }),
    props: {
        cardsCustom: {
            type: Array,
            default: () => [],
        },  
    },
    methods: {
        funcRedirect() {
            const URL = '/tablero'
            this.$router.push(URL)
        }

    },
}
</script>
<style>
.hand-cursor {
    cursor: pointer;
}
</style>