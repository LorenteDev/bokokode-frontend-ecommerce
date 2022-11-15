<template>
  <header>
    <section id="header-items">
      <span id="header-logo"> BEJAMAS_ </span>
      <div id="header-cart-container">
        <button
          v-if="$store.getters.getCartProducts.length"
          id="header-badge-total"
          @click="openDialog()">
          {{ $store.getters.getCartProducts.length }}
        </button>
        <button
          id="header-cart"
          @click="openDialog()">
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
    openDialog() {
      store.commit('setCartDialog', true)
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  padding-top: 30px;
  user-select: none
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
  justify-content: space-between;
  align-items: center;
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
}
</style>
