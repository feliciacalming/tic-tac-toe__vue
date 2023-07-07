<script setup lang="ts">
import { ref } from "vue";

let username = ref("");
let number = ref("ett");
const emit = defineEmits(["addPlayer"]);

const handleSubmit = (name: string) => {
  emit("addPlayer", name);
  number.value = "två";
  username.value = "";
};
</script>

<template>
  <form @submit.prevent="handleSubmit(username)">
    <input type="text" v-model="username" :placeholder="`spelare ${number}`" />
    <button type="submit">+ Lägg till spelare</button>
  </form>
</template>

<style scoped lang="scss">
input {
  text-align: center;
  background-color: white;
  border: 2px solid black;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
