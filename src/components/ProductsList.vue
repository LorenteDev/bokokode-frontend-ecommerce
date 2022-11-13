<template>
  <section id="products-list">
    <section id="products-list-top">
      <h1>
        Photography / <span id="products-list-top-subcategory">Premium Photos</span>
      </h1>
      <section id="products-list-top-sort">
        <button
          id="products-list-direction-button"
          @click="changeDirection()">
          <img :src="sortArrows" alt="switch sort direction">
        </button>
        <label>
          <span id="products-list-sort-label">
            Sort by
          </span>
          <select
            @change="loadPageInfo()"
            id="products-list-sort-select">
            <option
              v-for="option in orderOptions"
              :key="option"
              :value="option">{{ capitalize(option) }}</option>
          </select>
        </label>
      </section>
    </section>
    <section id="products-list-content">
      <aside id="products-list-categories">
        <h2>Category</h2>
        <section>
          <label
            v-for="category in categoryOptions"
            :key="category"
            @change="loadPageInfo()"
            class="products-list-categories-checkbox">
            <input
              type="checkbox"
              :value="category"
              v-model="categories">
            {{ capitalize(category) }}
          </label>
        </section>
      </aside>
      <section id="products-list-found-wrapper">
        <section id="products-list-found">
          <ProductCard
            v-for="product in products"
            :key="product._id"
            :product="product" />
        </section>
        <section id="products-list-pagination">
          <button 
            v-for="link in paginationData.links"
            :key="link"
            @click="loadPageInfo(link.url)"
            :class="link.active ? 'page-active' : 'page-button'">
            {{ link.label }}
          </button>
        </section>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import axios, { AxiosError, AxiosResponse } from 'axios'

// Icons
import sortArrows from "../assets/svg/sort-arrows.svg";

// Components
import ProductCard from '../components/ProductCard.vue'

// Types
import Product from '../types/Product'
import PaginationData from '@/types/PaginationData'
import OrderTerm from '../types/OrderTerm'
import DirectionTerm from '../types/DirectionTerm'
import CategoryTerm from '../types/CategoryTerm'

// Utils
import { capitalize } from '../utils/utils'

export default defineComponent({
  name: 'ProductsList',
  components: {
    ProductCard
  },
  props: {
    products: {
      required: true,
      type: Array as PropType<Product[]>
    },
    paginationData: {
      required: true,
      type: Object as PropType<PaginationData>
    }
  },
  data() {
    return {
      order: 'name' as OrderTerm,
      orderOptions: ['name', 'price'] as Array<OrderTerm>,
      direction: 'ASC' as DirectionTerm,
      categories: ['people', 'premium', 'pets', 'food', 'landmarks', 'cities', 'nature'] as Array<CategoryTerm>,
      categoryOptions: ['people', 'premium', 'pets', 'food', 'landmarks', 'cities', 'nature'] as Array<CategoryTerm>,
      sortArrows
    }
  },
  methods: {
    capitalize,
    loadPageInfo(link?: string | null) {
      // if there's no link it will use the default one
      console.log('loadPageInfo')
      console.log(this.categories)
      console.log(this.order)
      console.log(this.direction)
      link = link ? link : 'https://technical-frontend-api.bokokode.com/api/products'

      const bodyParameters = {
        sort: {
          key: this.order,
          type: this.direction
        },
        categories: this.categories
      }

      axios.post(link, bodyParameters)
        .then((res: AxiosResponse) => {
          this.$store.commit('setPageData', res.data.data)
        })
        .catch((err: AxiosError) => {
          console.error(err)
        })
    },
    changeDirection() {
      this.direction = this.direction === 'ASC' ? 'DESC' : 'ASC'
      this.loadPageInfo()
    }
  }
})
</script>

<style lang="scss" scoped>
#products-list-content {
  display: flex;
  justify-content: space-between;
}
#products-list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#products-list-top > h1 {
  font-size: 30px;
}
#products-list-top-subcategory {
  color: #9B9B9B;
  font-weight: normal;
}
#products-list-top-sort {
  display: flex;
  align-items: center;
}
#products-list-direction-button {
  background: none;
  border: none;
  height: 22px;
  width: 22px;
  margin-right: 7px;
}
#products-list-direction-button > img {
  height: 22px;
  width: 22px;
}
#products-list-sort-label {
  font-size: 24px;
  color: #9B9B9B;
}
#products-list-sort-select {
  background: none;
  border: none;
  font-size: 24px;

}
#products-list-categories {
  width: 15%;
}
#products-list-categories > h2 {
  margin-top: 0;
}
#products-list-categories > section {
  display: flex;
  flex-direction: column;
}
input[type="checkbox"] {
  width: 23px;
  height: 23px;
  accent-color: #000;
  background: red;
  margin-right: 23px;
}
.products-list-categories-checkbox {
  padding: 10px 0 10px 0;
  margin: 10px 0 10px 0;
  font-size: 22px;
  user-select: none;
}
#products-list-found-wrapper {
  // margin-left: 200px;
}
#products-list-found {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#products-list-found > article {
  margin: 0 0 50px 8%;
  width: calc(100% * (1/4));
}
#products-list-pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
}
#products-list-pagination > button {
  background: none;
  border: none;
}
.page-button {
  color: #B4B4B4;
  font-weight: bold;
  font-size: 29px;
}
.page-active {
  color: #000000;
  font-weight: bold;
  font-size: 29px;
}
</style>