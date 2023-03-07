import { createStore } from 'vuex'

export default createStore({
  state: {
    layout: 'PrincipalLayout'
  },
  getters: {
  },
  mutations: {
    SET_LAYOUT (state, newLayout) {
      state.layout = newLayout
    }
  },
  actions: {
  },
  modules: {
  }
})
