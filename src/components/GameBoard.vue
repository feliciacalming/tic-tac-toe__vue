<script setup lang="ts">
import { IGameState } from "../models/IGameState";

interface IGameProps {
  index: number;
  game: IGameState;
}

const emit = defineEmits([
  "switchTurns",
  "markSquare",
  "checkValues",
  "saveToLS",
]);

const props = defineProps<IGameProps>();
</script>

<template>
  <div
    @click.once="
      emit('markSquare'),
        emit('checkValues'),
        emit('switchTurns'),
        emit('saveToLS')
    "
  >
    <span class="game-symbol"> {{ props.game.gameboard[index] }} </span>
  </div>
</template>

<style scoped lang="scss">
.game-symbol {
  font-size: 3rem;
}
</style>
