<script setup lang="ts">
import { ref } from "vue";
import { IGameState } from "../models/IGameState";

interface IGameProps {
  index: number;
  game: IGameState;
}

const emit = defineEmits(["switchTurns"]);
const props = defineProps<IGameProps>();
const active = ref(false);
</script>

<template>
  <div @click.once="emit('switchTurns'), (active = true)">
    <span
      class="game-symbol"
      :class="{ x: props.game.gameboard[index] === 'X', bounce: active }"
    >
      {{ props.game.gameboard[index] }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.game-symbol {
  font-size: 4rem;
  font-family: "Geologica", sans-serif;
  text-shadow: 1px 3px black;
  -webkit-text-stroke: 1px black;
  color: rgb(255, 82, 154);
}

.x {
  color: rgb(144, 106, 251);
}

.bounce {
  animation: shine 0.5s ease-in-out;
}

@keyframes shine {
  0% {
    font-size: 4rem;
    opacity: 0.5;
  }

  50% {
    font-size: 5rem;
  }

  100% {
    font-size: 4rem;
    opacity: 1;
  }
}
</style>
