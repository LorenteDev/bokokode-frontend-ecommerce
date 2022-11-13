<template>
  <section>
    <section id="featured-top">
      <h1>{{ featured.name }}</h1>
      <button id="featured-add">ADD TO CART</button>
    </section>
    <img
      id="featured-image"
      :src="featured.image.src"
      :alt="featured.image.alt">
    <section id="featured-info-section">
      <section id="featured-info">
        <h2>About the {{ featured.name }}</h2>
        <h3>{{ capitalize(featured.category) }}</h3>
        <p>{{ featured.description }}</p>
      </section>
      <section id="featured-also-buy-section">
        <h2>People also buy</h2>
        <div id="featured-also-buy">
          <ProductCardAlsoBuy v-for="product in featured.people_also_buy" :key="product._id" :product="product" />
        </div>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ProductCardAlsoBuy from '../components/ProductCardAlsoBuy.vue'
import Product from '../types/Product'
import { capitalize } from '../utils/utils'

export default defineComponent({
  name: 'FeaturedProduct',
  components: {
    ProductCardAlsoBuy
  },
  props: {
    featured: {
      required: true,
      type: Object as PropType<Product>,
    },
  },
  methods: {
    capitalize
  }
  // setup() {
    
  // },
})
</script>

<style lang="scss">
#featured-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 27px;
}
#featured-top > h1 {
  margin: 0;
  font-size: 32px;
}
#featured-add {
  background: #000;
  color: #fff;
  border: none;
  padding: 13px 39px;
  width: 257px;
  height: 47px;
  font-size: 23px;
  display: inline-flex;
  justify-content: center;
  align-items: center; 
}
#featured-image {
  width: 100%;
  margin-bottom: 20px;
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
#featured-also-buy-section {
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
#featured-also-buy > article {
  display: flex;
  flex-direction: column;
}
</style>
