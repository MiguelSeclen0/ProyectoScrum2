import {
    FETCH_TAREAS
} from '@/utils/types/tareas/actions.types'

import {
    SET_TAREAS,
} from '@/utils/types/tareas/mutations.types'


export const state = () => ({
    tarea: [],
})

export const getters = {
}

export const mutations = {
    [SET_TAREAS](state, { tarea }) {
        state.tarea = tarea
    }
}

export const actions = {
    async [FETCH_TAREAS]({ commit }) {
        const tarea = await this.$tarea.FindAll()
        commit(SET_TAREAS, { tarea })
    },
}