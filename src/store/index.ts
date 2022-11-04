import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() :Promise<any> {
      const key :string = process.env.VUE_APP_FIXER
      
      const res :any= await fetch(`https://api.apilayer.com/fixer/latest?base=USD&symbols=EUR,RUB,USD`, {
        method: 'GET',
        headers: {
          'apikey': key
        }
      })
      return await res.json()
    }
  },
  modules: {
    auth,
    info 
  }
})
