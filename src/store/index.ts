import { createStore } from 'vuex'
import Product from '@/types/Product'

export default createStore({
  state: {
    pageData: {},
    cartProducts: [] as Array<Product>
  },
  getters: {
    getPageData: ({pageData}) => pageData,
    getCartProducts: ({cartProducts}) => cartProducts
  },
  mutations: {
    setPageData (state, newPageData) {
      state.pageData = newPageData
    },
    addCartProduct (state, product: Product) {
      state.cartProducts.push(product)
    }
  },
  actions: {
  },
  modules: {
  }
})
