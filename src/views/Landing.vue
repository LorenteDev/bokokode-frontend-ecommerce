<template>
  <div v-if="!$store.getters.loading">
    <Header />
    <Separator />
    <FeaturedProduct />
    <Separator />
    <ProductsList :products="$store.getters.products" :paginationData="$store.getters.paginationData" />
  </div>
  <div v-else>
    <span>Loading...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '../store'
import axios, { AxiosError, AxiosResponse } from 'axios'

// Types
import PaginationData from '../types/PaginationData'
import Product from '../types/Product'

// Components
import Header from '../components/Header.vue'
import FeaturedProduct from '../components/FeaturedProduct.vue'
import ProductsList from '../components/ProductsList.vue'
import Separator from '../components/Separator.vue'

export default defineComponent({
  name: 'LandingCommerce',
  components: {
    Header,
    Separator,
    FeaturedProduct,
    ProductsList
  },
  // Initial load
  setup() {
    // Get all products
    axios.post('https://technical-frontend-api.bokokode.com/api/products')
      .then((res: AxiosResponse) => {
        const pagination = res.data.data
        const pageProducts: Array<Product> = res.data.data.data

        // Move featured one to featured ref
        const featured = pageProducts.find((product: Product, index: number) => {
          return product.featured ? pageProducts.splice(index, 1) : false
        }) as Product
        store.commit('setFeatured', featured)

        // Delete 'data' key for paginationData since it's not needed
        delete pagination['data']

        store.commit('setPaginationData', pagination as PaginationData)
        store.commit('setProducts', pageProducts as Array<Product>)
        store.commit('setLoading', false)
      })
      .catch((err: AxiosError) => {
        console.error(err)
        store.commit('setLoading', false)
      })
  },
  mounted() {
    document.title = 'BEJAMAS_'
  },
})
</script>

<style lang="scss" scoped>

</style>