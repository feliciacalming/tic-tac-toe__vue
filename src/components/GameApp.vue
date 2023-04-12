<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import AddPlayer from "./AddPlayer.vue";
import { IGameState } from "../models/IGameState";
import { saveToLocalStorage } from "../helpers/localStorage";
import GameBoard from "./GameBoard.vue";

const gameState = ref<IGameState>({
  players: [],
  gameboard: [0, 0, 7, 5, 0, 0, 0, 0, 0],
  activePlayer: new Player(1, "", 0),
  isGameActive: true,
});

let playerSymbol = ref("");

const addPlayer = (name: string) => {
  let id = 1;

  if (gameState.value.players.length > 0) {
    id++;
  }

  gameState.value.players.push(new Player(id, name, 0));
  gameState.value.activePlayer = gameState.value.players[0];
  saveToLocalStorage(gameState.value);
};

const switchTurns = (index: number) => {
  gameState.value.gameboard[index] = 2;
  console.log(JSON.parse(JSON.stringify(gameState.value.gameboard)));

  console.log(index);
  if (gameState.value.activePlayer === gameState.value.players[0]) {
    playerSymbol.value = "X";
    gameState.value.activePlayer = gameState.value.players[1];
  } else if (gameState.value.activePlayer.playerId === 2) {
    playerSymbol.value = "O";
    gameState.value.activePlayer = gameState.value.players[0];
  }

  console.log(gameState.value.activePlayer);
};
</script>

<template>
  <AddPlayer
    @add-player="addPlayer"
    v-if="gameState.players.length < 2"
  ></AddPlayer>

  <div class="show-game" v-else>
    <h3>Det är {{ gameState.activePlayer.username }}s tur</h3>
    <div class="game-container">
      <GameBoard
        :index="index"
        :player-symbol="playerSymbol"
        :game="gameState"
        v-for="(square, index) in gameState.gameboard"
        @switch-turns="switchTurns(index)"
      >
      </GameBoard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-container {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;

  gap: 10px;
  width: max-content;
  margin: 0;
  padding: 0;

  div {
    border: 1px solid black;
    width: 80px;
    height: 80px;
  }
}
</style>
