import {
    FETCH_ESTADOS
} from '@/utils/types/estados/actions.types'

import {
    SET_ESTADOS,
} from '@/utils/types/estados/mutations.types'


export const state = () => ({
    estado: [],
})

export const getters = {
}

export const mutations = {
    [SET_ESTADOS](state, { estado }) {
        state.estado = estado
    }
}

export const actions = {
    async [FETCH_ESTADOS]({ commit }) {
        const estado = await this.$estado.FindAll()
        commit(SET_ESTADOS, { estado })
    },
}