<script setup lang="ts">
let id: number = 0;
</script>

<template>
  <h3>Det är x tur</h3>
  <div class="game-container">
    <div v-for="index in 9" :key="index">{{ index }}</div>
  </div>
</template>

<style scoped lang="scss">
.game-container {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;

  gap: 10px;
  width: max-content;
  margin: 0;
  padding: 0;

  div {
    border: 1px solid black;
    width: 80px;
    height: 80px;
  }
}
</style>
