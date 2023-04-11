<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import AddPlayer from "./AddPlayer.vue";
import { IGameState } from "../models/IGameState";
import { saveToLocalStorage } from "../helpers/localStorage";
import ShowGame from "./ShowGame.vue";

const gameState = ref<IGameState>({
  players: [],
  activePlayer: new Player(1, "", 0),
  isGameActive: true,
});

const addPlayer = (name: string) => {
  let id = 1;

  if (gameState.value.players.length > 0) {
    id++;
  }

  gameState.value.players.push(new Player(id, name, 0));
  saveToLocalStorage(gameState.value);
};

const togglePlayer = () => {
  console.log(gameState.value.activePlayer);
};
</script>

<template>
  <AddPlayer
    @add-player="addPlayer"
    v-if="gameState.players.length < 2"
  ></AddPlayer>
  <ShowGame @toggle-player="togglePlayer" v-else> ></ShowGame>
</template>
