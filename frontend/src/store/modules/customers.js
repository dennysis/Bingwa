import { api } from '../../api'

export default {
  namespaced: true,
  state: {
    customers: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_CUSTOMERS(state, customers) {
      state.customers = customers
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchCustomers({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await api.getCustomers()
        commit('SET_CUSTOMERS', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async createCustomer({ commit }, customerData) {
      try {
        await api.createCustomer(customerData)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      }
    },
    async updateCustomer({ commit }, { id, data }) {
      try {
        await api.updateCustomer(id, data)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      }
    },
    async deleteCustomer({ commit }, id) {
      try {
        await api.deleteCustomer(id)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      }
    }
  }
}
