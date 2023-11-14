import {
    FETCH_USUARIO,
    DELETE_USUARIO,
    INSERT_USUARIO,
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
    async [DELETE_USUARIO]({ dispatch }, params) {
      await this.$usuario.deletedById({params})     
    },
    async [INSERT_USUARIO]({ dispatch }, usuario) {
      await this.$usuario.usuarioInsert(usuario)
    },
  }