<template>
    <div>
        <v-hover>
            <template v-slot:default="{ hover }">
                <div :class="`elevation-${hover ? 24 : 6}`" class="mx-auto pa-6 transition-swing smaller-card"
                    style="position: relative; z-index: 1;">
                    MYPER SSOMA
                </div>
            </template>
        </v-hover>
        <v-card class="mt-n10 mx-auto big-card" elevation="0" height="250" width="500" color="secondary">
            <br>
            <br>
            <v-card-text class="d-flex align-center justify-center">Pagina Web</v-card-text>
            <span>{{ cardsCustom }}</span>
        </v-card>
    </div>
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
