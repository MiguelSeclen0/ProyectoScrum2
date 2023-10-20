import {
    FETCH_TIPOS
} from '@/utils/types/tipos/actions.types'

import {
    SET_TIPOS,
} from '@/utils/types/tipos/mutations.types'


export const state = () => ({
    tipo: [],
})

export const getters = {
}

export const mutations = {
    [SET_TIPOS](state, { tipo }) {
        state.tipo = tipo
    }
}

export const actions = {
    async [FETCH_TIPOS]({ commit }) {
        const tipo = await this.$tipo.FindAll()
        commit(SET_TIPOS, { tipo })
    },
}