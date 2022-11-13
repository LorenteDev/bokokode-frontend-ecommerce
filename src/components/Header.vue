<template>
  <header>
    <section id="header-items">
      <span id="header-logo"> BEJAMAS_ </span>
      <span id="header-cart">
        <img :src="cartIcon" alt="cart">
      </span>
    </section>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import cartIcon from "../assets/svg/cart.svg";

export default defineComponent({
  name: 'HeaderCart',
  setup() {
    return {
      cartIcon
    }
  },
})
</script>

<style lang="scss" scoped>
header {
  padding-top: 30px;
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
#header-cart {
  height: 54px;
  width: 54px;
}
</style>
