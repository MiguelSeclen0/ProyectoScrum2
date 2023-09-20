import {
    FETCH_USUARIO,
  } from '@/utils/types/users/actions.types'
  
  import {
    SET_USUARIO,
  } from '@/utils/types/users/mutations.types'
  
  
  export const state = () => ({
    usuario: [],
  })
  
  export const getters = {
  }
  
  export const mutations = {
    [SET_USUARIO](state, { usuario }) {
      state.usuario = usuario
    }
  }
  
  export const actions = {
     async [FETCH_USUARIO]({ commit }) {
      const usuario =  await this.$usuario.FindAll()
      commit(SET_USUARIO, { usuario })
    },
  }