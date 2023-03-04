import Vue from 'vue'
import Vuex from 'vuex'
import { cityLocationAPI, positioningAPI } from "@/apis/index";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navBarState: true,
    cityLocation: {},
  },
  getters: {
  },
  mutations: {
    hide(state) {
      state.navBarState = false
    },

    show(state) {
      state.navBarState = true
    },

    position(state, city) {
      state.cityLocation = city
    }

  },
  actions: {
    getPosition(context) {
      positioningAPI().then((data) => {
        cityLocationAPI(data.data.gcj.lat, data.data.gcj.lng).then((data) => {
          console.log(123, data);
          context.commit('position', data.data)
        })
      })
    }

  },
  modules: {
  }
})
