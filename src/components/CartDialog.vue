<template>
  <section
    v-if="$store.getters.isCartDialogOpen"
    id="cart-dialog">
    <div id="cart-dialog-close">
      <button @click="closeDialog()">
        <img :src="closeIcon" alt="close">
      </button>
    </div>
    <section id="cart-dialog-products-container">
      <article
        v-for="product in $store.getters.getCartProducts"
        :key="product._id"
        class="cart-dialog-product">
        <div>
          <h2>
            {{ product.name }}
          </h2>
          <span>{{ product.currency }} {{ product.price }}</span>
        </div>
        <img :src="product.image.src" :alt="product.image.alt">
      </article>
    </section>
    <hr>
    <section id="cart-dialog-actions">
      <button @click="clearCart()">CLEAR</button>
    </section>
  </section>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue'
import closeIcon from "../assets/svg/close.svg";

export default defineComponent({
  name: 'CartDialog',
  data () {
    return { closeIcon }
  },
  methods: {
    closeDialog() {
      store.commit('setCartDialog', false)
    },
    clearCart() {
      store.commit('clearCartProducts')
      this.closeDialog()
    }
  }
})
</script>

<style lang="scss" scoped>
#cart-dialog {
  position: absolute;
  right: 20vw;
  top: 100px;
  background: #fff;
  padding: 20px 35px;
  width: 440px;
  border: 4px solid #e4e4e4;
  z-index: 1;
}
#cart-dialog-close {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
}
#cart-dialog-products-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
#cart-dialog-close > button {
  background: none;
  border: none;
  padding: 0;
}
.cart-dialog-product {
  display: flex;
  align-items: flex-start;
}
.cart-dialog-product > div > h2 {
  font-size: 20px;
  margin-bottom: 10px;
  width: 80%;
}
.cart-dialog-product > div > span {
  font-size: 29px;
  color: #656565;
}
.cart-dialog-product > img {
  width: 200px;
  height: 100px;
}
#cart-dialog > hr {
  color: #C2C2C2;
  margin: 25px 0;
}
#cart-dialog-actions > button {
  width: 100%;
  height: 55px;
  font-size: 23px;
  background-color: white;
  border: 3px solid #000000;
}
</style>