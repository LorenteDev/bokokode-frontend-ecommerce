<template>
  <header>
    <section id="header-items">
      <span id="header-logo"> BEJAMAS_ </span>
      <button id="header-cart">
        <img :src="cartIcon" alt="cart">
      </button>
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
#header-cart {
  height: 60px;
  width: 60px;
  background: none;
  border: none;
}
</style>
