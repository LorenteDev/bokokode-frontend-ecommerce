<template>
  <section
    v-if="$store.getters.getFeatured"
    id="featured-product">
    <section id="featured-top">
      <h1>{{ $store.getters.getFeatured.name }}</h1>
      <button
        id="featured-add"
        @click="addToCart($store.getters.getFeatured)"
        :disabled="[... $store.getters.getCartProducts ].find(cart => cart._id === $store.getters.getFeatured._id)">
        {{ ![... $store.getters.getCartProducts ].find(cart => cart._id === $store.getters.getFeatured._id) ? 'ADD TO CART' : 'ADDED'}}
      </button>
    </section>
    <section id="featured-image-wrapper">
      <div id="featured-image-tag">
        <span>Photo of the day</span>
      </div>
      <img
        id="featured-image"
        :src="$store.getters.getFeatured.image.src"
        :alt="$store.getters.getFeatured.image.alt">
    </section>
    <button
      id="featured-add-below"
      @click="addToCart($store.getters.getFeatured)"
      :disabled="[... $store.getters.getCartProducts ].find(cart => cart._id === $store.getters.getFeatured._id)">
      {{ ![... $store.getters.getCartProducts ].find(cart => cart._id === $store.getters.getFeatured._id) ? 'ADD TO CART' : 'ADDED'}}
    </button>
    <section id="featured-info-section">
      <section id="featured-info">
        <h2>About the {{ $store.getters.getFeatured.name }}</h2>
        <h3>{{ capitalize($store.getters.getFeatured.category) }}</h3>
        <p>{{ $store.getters.getFeatured.description }}</p>
      </section>
      <section id="featured-also-buy-section">
        <h2>People also buy</h2>
        <div id="featured-also-buy">
          <ProductCardAlsoBuy v-for="product in $store.getters.getFeatured.people_also_buy" :key="product._id" :product="product" />
        </div>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCardAlsoBuy from '../components/ProductCardAlsoBuy.vue'
import { capitalize, addToCart } from '../utils/utils'

export default defineComponent({
  name: 'FeaturedProduct',
  components: {
    ProductCardAlsoBuy
  },
  methods: {
    capitalize,
    addToCart
  },
})
</script>

<style lang="scss">
#featured-product {
  margin-bottom: 100px;
}
#featured-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 27px;
}
#featured-top > h1 {
  margin: 0;
  font-size: 32px;
}
#featured-add-below,
#featured-add {
  background: #000;
  color: #fff;
  border: none;
  padding: 13px 39px;
  height: 47px;
  font-size: 23px;
  display: inline-flex;
  justify-content: center;
  align-items: center; 
}
#featured-add {
  width: 257px;
}
#featured-add-below {
  display: none;
  width: 100%;
}
#featured-add-below:disabled,
#featured-add:disabled {
  background: #9B9B9B;
}
#featured-image-wrapper {
  position: relative;
}
#featured-image {
  width: 100%;
  margin-bottom: 20px;
}
#featured-image-tag {
  user-select: none;
  position: absolute;
  bottom: 23px;
  width: 19%;
  height: 11%;
  background: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
#featured-info-section {
  display: flex;
  justify-content: space-between;
}
#featured-info-section > section > h2,
#featured-info-section > section > h3 {
  font-size: 22px;
}
#featured-info-section > section > p,
#featured-info-section > section > h3 {
  color: #656565;
}
#featured-info {
  width: 60%;
}
#featured-also-buy-section > h2 {
  text-align: end;
  margin-bottom: 27px;
}
#featured-also-buy {
  display: flex;
  flex-direction: row;
  // flex-shrink: 2;
  justify-content: center;
  gap: 30px;
}
@media only screen and (max-width: 956px) {
  #featured-image-tag {
    font-size: 15px;
  }
  #featured-add {
    display: none;
  }
  #featured-add-below {
    display: flex;
  }
}
@media only screen and (max-width: 768px) {
  #featured-image-tag {
    width: 60%;
    height: 20%;
  }
  #featured-info-section {
    flex-direction: column;
  }
  #featured-info {
    width: 100%;
  }
  #featured-also-buy-section > h2 {
    text-align: start;
  }
  #featured-also-buy {
    justify-content: space-around;
    // gap: 20%;
  }
  #featured-also-buy > article {
    display: flex;
    flex-direction: column;
  }
}
</style>
