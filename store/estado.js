import {
    FETCH_ESTADOS,
    FETCH_ESTADOSPROYECTOS,
    INSERT_NOMCOLUM,
    DELETE_COLUM,
} from '@/utils/types/estados/actions.types'

import {
    SET_ESTADOS,
    SET_ESTADOSPROYECTOS
} from '@/utils/types/estados/mutations.types'


export const state = () => ({
    tareaEstado: [],
    proyectoEstado: [],
})

export const getters = {
}

export const mutations = {
    [SET_ESTADOS](state, { tareaEstado }) {
        state.tareaEstado = tareaEstado
    },
    [SET_ESTADOSPROYECTOS](state, { proyectoEstado }) {
        state.proyectoEstado = proyectoEstado
    }
}

export const actions = {
    async [FETCH_ESTADOS]({ commit },params) {
        const tareaEstado = await this.$estado.FindAll({params})
        commit(SET_ESTADOS, { tareaEstado })
    },
    async [FETCH_ESTADOSPROYECTOS]({ commit }) {
        const proyectoEstado = await this.$estado.FindAllEstadoProyecto({})
        commit(SET_ESTADOSPROYECTOS, { proyectoEstado })
    },
    async [INSERT_NOMCOLUM]({ dispatch }, tablero) {
        await this.$estado.NomColumn(tablero)
    },
    async [DELETE_COLUM]({ dispatch }, params) {
        console.log('params.estado.js', params)
        await this.$estado.DelColumn({params})
    },
}