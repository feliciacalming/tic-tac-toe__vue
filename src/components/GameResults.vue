<script setup lang="ts">
import { Player } from "../models/Player";

defineProps<{ winningPlayer: Player }>();
const emit = defineEmits(["startNewGame"]);
</script>

<template>
  <div>
    <span>Grattis {{ winningPlayer.username }}!</span>
  </div>
  <button @click="emit('startNewGame')">Starta ett nytt spel!</button>
  <button>Spela en omgång till!</button>
</template>

<style scoped lang="scss">
span {
  font-size: 3rem;
}
</style>
