<template>
  <article class="product-card">
    <div class="product-card-image-wrapper">
      <div
        v-if="product.bestseller"
        class="product-card-best-seller">
        <span>Best Seller</span>
      </div>
      <img :src="product.image.src" :alt="product.image.alt">
      <button
        class="product-card-button"
        @click="addToCart(product)"
        :disabled="[... $store.getters.getCartProducts ].find(cart => cart._id === product._id)">
        {{ ![... $store.getters.getCartProducts ].find(cart => cart._id === product._id) ? 'ADD TO CART' : 'ADDED'}}
      </button>
    </div>
    <span class="product-card-category">{{ capitalize(product.category) }}</span>
    <span class="product-card-name">{{ product.name }}</span>
    <span class="product-card-currency">{{ product.currency }} {{ product.price }}</span>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { capitalize, addToCart } from '../utils/utils'
import Product from '../types/Product'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      required: true,
      type: Object as PropType<Product>
    }
  },
  methods: {
    capitalize,
    addToCart
  }
})
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  max-width: 282px;
}
.product-card-image-wrapper {
  position: relative;
  height: 399px;
  overflow: hidden;
}
.product-card > div > img {
  width: 282px;
  height: 399px;
}
.product-card-image-wrapper:hover > .product-card-button {
  animation-name: show-button;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}
.product-card-best-seller {
  position: absolute;
  top: 0;
  width: 40%;
  height: 8%;
  background: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none
}
.product-card-button {
  position: relative;
  top: 0;
  background: #000;
  color: #fff;
  border: none;
  padding: 13px 39px;
  width: 100%;
  height: 47px;
  font-size: 23px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.product-card-button:disabled {
  background: #9B9B9B;
}
.product-card > span {
  max-width: 282px;
}
.product-card-category {
  font-size: 22px;
  font-weight: bold;
  color: #656565;
  margin-top: 8px;
}
.product-card-name {
  font-size: 34px;
  font-weight: bold;
  margin-top: 8px;
}
.product-card-currency {
  font-size: 29px;
  color: #656565;
  margin-top: 9px;
}
@keyframes show-button {
  0%   {left:0px; top:0px;}
  100% {left:0px; top:-50px;}
}
@media only screen and (max-width: 768px) {
  .product-card {
    max-width: 100%;
    height: 100%;
  }
  .product-card-image-wrapper {
    position: relative;
    height: 399px;
    overflow: hidden;
    height: 100%;
  }
  .product-card > div > img {
    height: 100%;
    width: 100%;
    user-select: none;
  }
  .product-card-category {
    margin-top: 19px;
  }
  .product-card-name {
    margin-top: 13px;
  }
  .product-card-currency {
    margin-top: 13px;
  }
  .product-card-image-wrapper:hover > .product-card-button {
    animation-name: none;
  }
  .product-card-button {
    top: -50px;
    width: 100%;
  }
}
</style>