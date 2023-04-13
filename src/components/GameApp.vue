<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import AddPlayer from "./AddPlayer.vue";
import { IGameState } from "../models/IGameState";
import { saveToLocalStorage } from "../helpers/localStorage";
import GameBoard from "./GameBoard.vue";

const gameState = ref<IGameState>({
  players: [],
  gameboard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  activePlayer: new Player(1, "", 0),
  isGameActive: true,
});

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

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
  if (gameState.value.activePlayer === gameState.value.players[0]) {
    gameState.value.activePlayer = gameState.value.players[1];
  } else if (gameState.value.activePlayer.playerId === 2) {
    gameState.value.activePlayer = gameState.value.players[0];
  }
};

const markSquare = (index: number) => {
  gameState.value.gameboard[index] = gameState.value.activePlayer.playerId;
};

const checkValues = () => {
  let player1Results: number[] = [];
  let player2Results: number[] = [];

  gameState.value.gameboard.forEach((currentValue, index) => {
    currentValue === 1
      ? player1Results.push(index)
      : currentValue === 2
      ? player2Results.push(index)
      : null;
  });

  for (let i = 0; i < winningCombinations.length; i++) {
    let checkPlayer1 = winningCombinations[i].every((element) =>
      player1Results.includes(element)
    );

    let checkPlayer2 = winningCombinations[i].every((element) =>
      player2Results.includes(element)
    );

    if (checkPlayer1) {
      console.log("Grattis spelare 1!");
    }

    if (checkPlayer2) {
      console.log("Grattis spelare 2!");
    }
  }
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
        :game="gameState"
        v-for="(square, index) in gameState.gameboard"
        @switch-turns="switchTurns(index)"
        @mark-square="markSquare(index)"
        @check-values="checkValues"
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
