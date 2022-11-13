<template>
  <div v-if="!loading">
    <Header />
    <Separator />
    <FeaturedProduct :featured="featured" />
    <Separator />
    <ProductsList :products="products" />
  </div>
  <div v-else>
    <span>Loading...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
  setup() {
    let loading = ref<boolean>(true)
    let paginationData = ref<PaginationData>({} as PaginationData)
    let featured = ref<Product>({} as Product)
    let products = ref<Product[]>([])

    // Get all products
    axios.post('https://technical-frontend-api.bokokode.com/api/products')
      .then((res: AxiosResponse) => {
        const pagination = res.data.data
        const pageProducts: Array<Product> = res.data.data.data

        // Move featured one to featured ref
        const featuredProduct = pageProducts.find((product: Product, index: number) => {
          return product.featured ? pageProducts.splice(index, 1) : false
        })

        // Delete 'data' key for paginationData since it's not needed
        delete pagination['data']
        paginationData.value = pagination as PaginationData
        featured.value = featuredProduct as Product
        products.value = pageProducts as Array<Product>
        loading.value = false
      })
      .catch((err: AxiosError) => {
        console.error(err)
        loading.value = false
      })

    return { loading, paginationData, featured, products }
  },
  mounted() {
    document.title = 'BAJAMAS'
  },
})
</script>

<style lang="scss" scoped>

</style>