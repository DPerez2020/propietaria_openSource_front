import { createStore } from 'vuex'

export default createStore({
  state: {
    layout: 'LoginLayout'
  },
  getters: {
  },
  mutations: {
    SET_LAYOUT (state, newLayout) {
      console.log('SET_LAYOUT: ' + newLayout);
      
      state.layout = newLayout
    }
  },
  actions: {
  },
  modules: {
  }
})
