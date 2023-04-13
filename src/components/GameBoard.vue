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
