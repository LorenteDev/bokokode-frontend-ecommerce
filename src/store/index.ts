import { createStore } from 'vuex'

export default createStore({
  state: {
    pageData: null
  },
  getters: {
    getPageData: ({pageData}) => pageData,
  },
  mutations: {
    setPageData (state, newPageData) {
      state.pageData = newPageData
    }
  },
  actions: {
  },
  modules: {
  }
})
