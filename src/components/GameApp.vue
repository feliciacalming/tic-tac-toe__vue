<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import AddPlayer from "./AddPlayer.vue";
import { IGameState } from "../models/IGameState";
import { saveToLocalStorage } from "../helpers/localStorage";

const gameState = ref<IGameState>({
  players: [],
  activePlayer: 0,
  isGameActive: true,
});

const addPlayer = (name: string) => {
  let id = 1;

  if (gameState.value.players.length > 0) {
    id++;
  }

  gameState.value.players.push(new Player(id, name, 0));
  saveToLocalStorage(gameState.value);
  console.log(JSON.stringify(gameState.value.players));
};
</script>

<template>
  <AddPlayer @add-player="addPlayer"></AddPlayer>
</template>
