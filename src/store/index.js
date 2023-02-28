import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navBarState: true,
  },
  getters: {
  },
  mutations: {
    hide(state) {
      state.navBarState = false
    },

    show(state) {
      state.navBarState = true
    }
  },
  actions: {
  },
  modules: {
  }
})
