import {
    FETCH_TAREAS,
    INSERT_TAREAS,
    DELETE_TAREAS,
} from '@/utils/types/tareas/actions.types'

import {
    SET_TAREAS,
} from '@/utils/types/tareas/mutations.types'


export const state = () => ({
    tarea: [],
    // tareaEstado: [],
})

export const getters = {
}

export const mutations = {
    [SET_TAREAS](state, { tarea }) {
        state.tarea = tarea
    },
    // [SET_TAREASESTADO](state, { tareaEstado }) {
    //     state.tareaEstado = tareaEstado
    // }
}

export const actions = {
    // async [FETCH_TAREAS]({ commit }) {
    //    const tarea = await this.$tarea.FindAll()
    //    commit(SET_TAREAS, { tarea })
    // },

    async [FETCH_TAREAS]({ commit }, params) {
        const tarea = await this.$tarea.findById({ params })
        commit(SET_TAREAS, { tarea })
    },
    async [INSERT_TAREAS]({ dispatch }, tarea) {
        await this.$tarea.tareaInsert(tarea)
    },
    async [DELETE_TAREAS]({ dispatch }, params) {
        await this.$tarea.DelTarea({params})
    },

    // async [FETCH_TAREASESTADO]({ commit }, params) {
    //     const tareaEstado = await this.$tarea.listEstado({params})
    //     commit(SET_TAREASESTADO, { tareaEstado })
    //   },  
}