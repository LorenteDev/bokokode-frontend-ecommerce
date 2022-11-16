<template>
  <hr />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentSeparator',
})
</script>

<style lang="scss" scoped>
hr {
  height: 4px;
  border: none;
  background-color: #e4e4e4;
  margin-top: 30px;
  margin-bottom: 30px;
}
@media only screen and (max-width: 768px) {
  hr {
    width: 100vw;
    margin-left: -5vw;
  }
}
</style>