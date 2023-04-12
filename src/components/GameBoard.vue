<script setup lang="ts">
import { ref } from "vue";
import { IGameState } from "../models/IGameState";

interface IGameProps {
  index: number;
  game: IGameState;
}

const emit = defineEmits(["switchTurns", "markSquare"]);
const props = defineProps<IGameProps>();
</script>

<template>
  <div @click="emit('switchTurns'), emit('markSquare')">
    {{ props.game.gameboard[index] }}
  </div>
</template>

<style scoped lang="scss">
.x {
  background-color: pink;
}

.o {
  background-color: purple;
}
</style>
