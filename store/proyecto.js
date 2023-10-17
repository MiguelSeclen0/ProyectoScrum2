import {
    FETCH_PROYECTOS,
  } from '@/utils/types/proyectos/actions.types'
  
  import {
    SET_PROYECTOS,
  } from '@/utils/types/proyectos/mutations.types'
  
  
  export const state = () => ({
    proyecto: [],
    proyectoId:[],
  })
  
  export const getters = {
  }
  
  export const mutations = {
    [SET_PROYECTOS](state, { proyecto }) {
      state.proyecto = proyecto
    }
  }
  
  export const actions = {
     async [FETCH_PROYECTOS]({ commit }) {
      const proyecto =  await this.$proyecto.FindAll()
      console.log('proyectos', proyecto)
      commit(SET_PROYECTOS, { proyecto })
    },
      async [FETCH_PROYECTOS]({ commit }, payload) {
        const proyectoId = await this.$proyecto.findAllById(payload)
        commit(SET_PROYECTOS, { proyectoId })
      },
  }