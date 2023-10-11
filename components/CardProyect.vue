<template>
    <v-row>
        <div v-for="item in  cardsCustom" :key="item.proyectoId" style="margin-left: 2%;">
            <v-hover>
                <template v-slot:default="{ hover }">
                    <div :class="`elevation-${hover ? 24 : 6}`" class="mx-auto pa-6 transition-swing smaller-card"
                        style="position: relative; z-index: 1;">
                        {{ item.cliente }}
                    </div>
                </template>
            </v-hover>
            <v-card class="mt-n10 mx-auto big-card" elevation="0" height="250" width="500" color="secondary">
                <br>
                <br>
                <v-card-text class="d-flex align-center justify-center">{{ item.tipo }}</v-card-text>
                <span></span>
            </v-card>
        </div>
    </v-row>
</template>
<script>
export default {
    props: {
        cardsCustom: {
            type: Array,
            default: () => [],
        },
    },
}
</script>
