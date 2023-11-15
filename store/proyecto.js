import {
    FETCH_PROYECTOS,
    FETCH_PROYECTOSALL,
    DELETE_PROYECTOS,
    INSERT_PROYECTOS,
  } from '@/utils/types/proyectos/actions.types'
  
  import {
    SET_PROYECTOS,
  } from '@/utils/types/proyectos/mutations.types'
  
  
  export const state = () => ({
    // // // proyecto: [],
    proyectoId:[],
  })
  
  export const getters = {
  }
  
  export const mutations = {
    [SET_PROYECTOS](state, { proyectoId }) {
      state.proyectoId = proyectoId
    }
  }
  
  export const actions = {
     async [FETCH_PROYECTOSALL]({ commit }) {
      const proyectoId =  await this.$proyecto.FindAll()
      commit(SET_PROYECTOS, { proyectoId })
    },
      async [FETCH_PROYECTOS]({ commit }, params) {
        const proyectoId = await this.$proyecto.findById({params})
        commit(SET_PROYECTOS, { proyectoId })
      },
      async [DELETE_PROYECTOS]({ dispatch }, params) {
        await this.$proyecto.deletedById({params})
      },
      async [INSERT_PROYECTOS]({ dispatch }, proyecto) {
        await this.$proyecto.proyectoInsert(proyecto)
      },
  }