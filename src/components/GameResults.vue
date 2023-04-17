<script setup lang="ts">
import { Player } from "../models/Player";
import RestartButton from "./RestartButton.vue";

interface IGameResults {
  message: string;
  players: Player[];
}

const props = defineProps<IGameResults>();
</script>

<template>
  <div class="scoreboard">
    <span class="scoreboard__heading">{{ message }}</span>

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
</template>

<style scoped lang="scss">
.scoreboard {
  display: flex;
  flex-direction: column;

  &__heading {
    font-size: 2rem;
    margin-bottom: 3rem;
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
</style>
