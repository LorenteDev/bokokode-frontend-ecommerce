import { createStore } from 'vuex'

// Types
import Product from '@/types/Product'
import PaginationData from '@/types/PaginationData'

export default createStore({
  state: {
    isCartDialogOpen: false,
    cartProducts: [] as Array<Product>,
    loading: true,
    paginationData: null as null | PaginationData,
    featured: null as null | Product,
    products: null as null | Array<Product>
  },
  getters: {
    isCartDialogOpen: ({isCartDialogOpen}) => isCartDialogOpen,
    getCartProducts: ({cartProducts}) => cartProducts,
    isLoading: ({loading}) => loading,
    getPaginationData: ({paginationData}) => paginationData,
    getFeatured: ({featured}) => featured,
    getProducts: ({products}) => products
  },
  mutations: {
    setCartDialog (state, isOpen: boolean) {
      state.isCartDialogOpen = isOpen
    },
    addCartProduct (state, product: Product) {
      state.cartProducts.push(product)
    },
    clearCartProducts (state) {
      state.cartProducts = []
    },
    setLoading (state, value: boolean) {
      state.loading = value
    },
    setPaginationData (state, newPaginationData: PaginationData) {
      state.paginationData = newPaginationData
    },
    setFeatured (state, newFeatured: Product) {
      state.featured = newFeatured
    },
    setProducts (state, newProducts: Array<Product>) {
      state.products = newProducts
    }
  },
  actions: {
  },
  modules: {
  }
})
