import { createStore } from 'vuex'
import customers from './modules/customers'

export default createStore({
  modules: {
    customers
  }
})
