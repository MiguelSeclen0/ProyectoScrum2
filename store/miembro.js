import {
    FETCH_MIEMBROS
} from '@/utils/types/miembros/actions.types'

import {
    SET_MIEMBROS,
} from '@/utils/types/miembros/mutations.types'


export const state = () => ({
    miembro: [],
})

export const getters = {
}

export const mutations = {
    [SET_MIEMBROS](state, { miembro }) {
        state.miembro = miembro
    }
}

export const actions = {
    async [FETCH_MIEMBROS]({ commit }) {
        const miembro = await this.$miembro.FindAll()
        commit(SET_MIEMBROS, { miembro })
    },
}