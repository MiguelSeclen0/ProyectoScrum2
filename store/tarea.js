import {
    FETCH_TAREAS,
    INSERT_TAREAS,
    DELETE_TAREAS,
    FETCH_DATOS
} from '@/utils/types/tareas/actions.types'

import {
    SET_TAREAS,
} from '@/utils/types/tareas/mutations.types'


export const state = () => ({
    tarea: [],
    // tareaDatos: [],
})

export const getters = {
}

export const mutations = {
    [SET_TAREAS](state, { tarea }) {
        state.tarea = tarea
    },
    // [SET_TAREASDATOS](state, { tareaDatos }) {
    //     state.tareaDatos = tareaDatos
    // }
}

export const actions = {
    
    async [FETCH_TAREAS]({ commit }, params) {
        const tarea = await this.$tarea.findById({ params })
        commit(SET_TAREAS, { tarea })
    },
    async [FETCH_DATOS]({ commit }, params) {
       const tarea = await this.$tarea.findAllDatos({params})
       console.log('JSDATOS',tarea)
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