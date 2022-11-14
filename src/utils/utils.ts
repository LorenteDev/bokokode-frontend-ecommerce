import store from '../store'

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function addToCart(id: string) {
  console.log(id)
  if (![... store.getters.getCartProducts ].includes(id)) {
    store.commit('addCartProduct', id)
  }
  console.log(store.getters.getCartProducts)
}