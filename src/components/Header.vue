<template>
  <header>
    <section id="header-items">
      <span id="header-logo"> BEJAMAS_ </span>
      <div id="header-cart-container">
        <button
          v-if="$store.getters.getCartProducts.length"
          id="header-badge-total">
          {{ $store.getters.getCartProducts.length }}
        </button>
        <button
          id="header-cart"
          @click="toggleCart()">
          <img :src="cartIcon" alt="cart">
        </button>
      </div>
      <CartDialog />
    </section>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store';
import CartDialog from '../components/CartDialog.vue'
import cartIcon from "../assets/svg/cart.svg";

export default defineComponent({
  name: 'HeaderCart',
  components: {
    CartDialog
  },
  data() {
    return {
      cartIcon
    }
  },
  methods: {
    toggleCart() {
      if (store.getters.getCartProducts.length) {
        store.commit('setCartDialog', !store.getters.isCartDialogOpen)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  padding-top: 30px;
  user-select: none;
}
#header-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#header-logo {
  font-size: 26px;
  font-weight: bold;
}
#header-cart-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 150px;
}
#header-badge-total {
  background: #000;
  color: #fff;
  border: none;
  font-size: 21px;
  padding: 0 6px;
}
#header-cart {
  height: 60px;
  width: 60px;
  background: none;
  border: none;
  margin-left: 66px;
}
@media only screen and (max-width: 768px) {
  #header-cart {
    margin-left: 20px;
  }
}
</style>
