import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  state,
  mutations
})

export default store