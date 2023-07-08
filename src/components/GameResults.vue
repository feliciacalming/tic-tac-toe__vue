<script setup lang="ts">
import { Player } from "../models/Player";

interface IGameResults {
  message: string;
  players: Player[];
}

const props = defineProps<IGameResults>();
</script>

<template>
  <span class="scoreboard__heading">{{ message }}</span>
  <div class="scoreboard">
    <div class="scoreboard__players">
      <h3>Poäng:</h3>
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
  flex-direction: column;
  padding: 10% 10% 20% 10%;
  border-radius: 5px;
  background-color: rgb(253, 253, 253);
  border: 3px dashed rgb(41, 75, 169);

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
