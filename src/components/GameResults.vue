<script setup lang="ts">
import { Player } from "../models/Player";

interface IGameResults {
  winningPlayer: string;
  players: Player[];
}

const props = defineProps<IGameResults>();
const emit = defineEmits(["startNewGame", "playAgain"]);
</script>

<template>
  <div class="scoreboard">
    <span class="scoreboard__heading">Grattis {{ winningPlayer }}! 🎉</span>
    <h2 class="scoreboard__points">Poäng:</h2>
    <div class="scoreboard__players">
      <div class="scoreboard__player">
        <h4>{{ players[0].username }}</h4>
        {{ players[0].score }} poäng
      </div>
      <div class="scoreboard__player">
        <h4>{{ players[1].username }}</h4>
        {{ players[1].score }} poäng
      </div>
    </div>
  </div>
  <div class="button-container">
    <button @click="emit('playAgain')">Spela en omgång till!</button>
    <button @click="emit('startNewGame')">Starta ett nytt spel!</button>
  </div>
</template>

<style scoped lang="scss">
.scoreboard {
  display: flex;
  flex-direction: column;

  &__heading {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  &__points {
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
  }

  &__players {
    display: flex;
    flex-direction: column;
  }

  &__player {
    margin: 0;
    display: flex;
    justify-content: space-between;
  }
}

h4 {
  margin: 0;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 2rem;
}
</style>
