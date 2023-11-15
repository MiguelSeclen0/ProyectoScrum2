import {
    FETCH_ROLS
} from '@/utils/types/rols/actions.types'

import {
    SET_ROLS,
} from '@/utils/types/rols/mutations.types'


export const state = () => ({
    rol: [],
})

export const getters = {
}

export const mutations = {
    [SET_ROLS](state, { rol }) {
        state.rol = rol
    }
}

export const actions = {
    async [FETCH_ROLS]({ commit }) {
        const rol = await this.$rol.FindAll()
        commit(SET_ROLS, { rol })
    },
}