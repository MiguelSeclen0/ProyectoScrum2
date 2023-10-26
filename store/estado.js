import {
    FETCH_ESTADOS
} from '@/utils/types/estados/actions.types'

import {
    SET_ESTADOS,
} from '@/utils/types/estados/mutations.types'


export const state = () => ({
    tareaEstado: [],
})

export const getters = {
}

export const mutations = {
    [SET_ESTADOS](state, { tareaEstado }) {
        state.tareaEstado = tareaEstado
    }
}

export const actions = {
    async [FETCH_ESTADOS]({ commit },params) {
        const tareaEstado = await this.$estado.FindAll({params})
        commit(SET_ESTADOS, { tareaEstado })
    },
}