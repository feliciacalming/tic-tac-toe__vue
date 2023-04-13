<script setup lang="ts">
import { ref } from "vue";
import { IGameState } from "../models/IGameState";

interface IGameProps {
  index: number;
  game: IGameState;
}

const emit = defineEmits(["switchTurns", "markSquare", "checkValues"]);
const props = defineProps<IGameProps>();
</script>

<template>
  <div
    @click.once="emit('switchTurns'), emit('markSquare'), emit('checkValues')"
  >
    <span class="game-symbol"> {{ props.game.gameboard[index] }} </span>
  </div>
</template>

<style scoped lang="scss">
.game-symbol {
  font-size: 3rem;
}
</style>
