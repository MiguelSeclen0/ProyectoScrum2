import {
    FETCH_EQUIPOS
} from '@/utils/types/equipos/actions.types'

import {
    SET_EQUIPOS,
} from '@/utils/types/equipos/mutations.types'


export const state = () => ({
    equipo: [],
})

export const getters = {
}

export const mutations = {
    [SET_EQUIPOS](state, { equipo }) {
        state.equipo = equipo
    }
}

export const actions = {
    async [FETCH_EQUIPOS]({ commit }) {
        const equipo = await this.$equipo.FindAll()
        commit(SET_EQUIPOS, { equipo })
    },
}