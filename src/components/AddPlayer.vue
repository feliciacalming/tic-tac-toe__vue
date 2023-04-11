<script setup lang="ts">
import { ref } from "vue";
let username = ref("");
const emit = defineEmits(["addPlayer"]);
</script>

<template>
  <form @submit.prevent="emit('addPlayer', username)">
    <input
      type="text"
      v-model="username"
      placeholder="skriv ditt användarnamn"
    />
    <button type="button"></button>
  </form>
</template>

<style scoped lang="scss">
input {
  width: 30vw;
  text-align: center;
}
</style>
