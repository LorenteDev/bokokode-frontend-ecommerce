import store from '../store'
import Product from '@/types/Product'

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function addToCart(product: Product) {
  if (![... store.getters.getCartProducts ].find(cart => cart._id === product._id)) {
    store.commit('addCartProduct', product)
    store.commit('setCartDialog', true)
  }
}