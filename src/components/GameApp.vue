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
  gameState.value.activePlayer = gameState.value.players[0];
  saveToLocalStorage(gameState.value);
};

const switchTurns = () => {
  if (gameState.value.activePlayer === gameState.value.players[0]) {
    gameState.value.activePlayer = gameState.value.players[1];
    return;
  } else if (gameState.value.activePlayer.playerId === 2) {
    gameState.value.activePlayer = gameState.value.players[0];
  }
};
</script>

<template>
  <AddPlayer
    @add-player="addPlayer"
    v-if="gameState.players.length < 2"
  ></AddPlayer>
  <ShowGame
    :player="gameState.activePlayer.username"
    @toggle-player="switchTurns"
    v-else
  >
    ></ShowGame
  >
</template>
