<script setup lang="ts">
import { ref } from "vue";

let username = ref("");
const emit = defineEmits(["addPlayer"]);

const handleSubmit = (name: string) => {
  emit("addPlayer", name);
  username.value = "";
};
</script>

<template>
  <form @submit.prevent="handleSubmit(username)">
    <input type="text" v-model="username" placeholder="användarnamn" />
    <button type="button">+ Lägg till spelare</button>
  </form>
</template>

<style scoped lang="scss">
input {
  text-align: center;
  background-color: white;
  border: 1px solid black;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
