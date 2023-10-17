import {
    FETCH_CLIENTS,
  } from '@/utils/types/clients/actions.types'
  
  import {
    SET_CLIENTS,
  } from '@/utils/types/clients/mutations.types'
  
  
  export const state = () => ({
    Client: [],
  })
  
  export const getters = {
  }
  
  export const mutations = {
    [SET_CLIENTS](state, { clients }) {
      state.Client = clients
    }
  }
  
  export const actions = {
     async [FETCH_CLIENTS]({ commit }) {
      const clients =  await this.$cliente.FindAll()
      commit(SET_CLIENTS, { clients })
    },
  }