<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import { IGameState } from "../models/IGameState";
import { saveToLocalStorage } from "../helpers/localStorage";
import AddPlayer from "./AddPlayer.vue";
import GameBoard from "./GameBoard.vue";
import GameResults from "./GameResults.vue";
import { getFromLocalStorage } from "../helpers/localStorage";

// let gameState = ref<IGameState>({
//   players: [],
//   gameboard: ["", "", "", "", "", "", "", "", ""],
//   activePlayer: new Player("", "", [], 0),
//   isGameActive: true,
// });

let gameState = ref<IGameState>(getFromLocalStorage());

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
  let symbol = "X";

  if (gameState.value.players.length > 0) {
    symbol = "O";
  }

  gameState.value.players.push(new Player(name, symbol, [], 0));
  gameState.value.activePlayer = gameState.value.players[0];
  saveToLocalStorage(gameState.value);
};

const markSquare = (index: number) => {
  gameState.value.gameboard[index] = gameState.value.activePlayer.playerSymbol;
};

const switchTurns = (index: number) => {
  if (gameState.value.isGameActive) {
    if (gameState.value.activePlayer === gameState.value.players[0]) {
      gameState.value.activePlayer = gameState.value.players[1];
    } else {
      gameState.value.activePlayer = gameState.value.players[0];
    }
  }
};

const checkValues = () => {
  let chosenIndex = 0;

  gameState.value.gameboard.forEach((currentValue, index) => {
    if (currentValue === gameState.value.activePlayer.playerSymbol) {
      chosenIndex = index;

      if (!gameState.value.activePlayer.checkedSquares.includes(chosenIndex)) {
        gameState.value.activePlayer.checkedSquares.push(chosenIndex);
      }
    }
  });

  for (let i = 0; i < winningCombinations.length; i++) {
    let checkPlayer = winningCombinations[i].every((element) =>
      gameState.value.activePlayer.checkedSquares.includes(element)
    );

    if (checkPlayer) {
      gameState.value.isGameActive = false;
      gameState.value.activePlayer.score += 1;
    }
  }
};

const startNewGame = () => {
  window.location.reload();
  localStorage.clear();
};

const playAgain = () => {
  gameState.value.isGameActive = true;

  gameState.value.activePlayer.checkedSquares = [];

  for (let i = 0; i < gameState.value.gameboard.length; i++) {
    gameState.value.gameboard[i] = "";
  }

  for (let i = 0; i < gameState.value.players.length; i++) {
    gameState.value.players[i].checkedSquares = [];
  }

  saveToLocalStorage(gameState.value);
  console.log(gameState.value);
  window.location.reload();
};
</script>

<template>
  <AddPlayer
    @add-player="addPlayer"
    v-if="gameState.players.length < 2"
  ></AddPlayer>

  <div class="show-game" v-else v-if="gameState.isGameActive">
    <h3>Det är {{ gameState.activePlayer.username }}s tur</h3>
    <div class="game-container">
      <GameBoard
        :index="index"
        :game="gameState"
        v-for="(square, index) in gameState.gameboard"
        @switch-turns="switchTurns(index)"
        @mark-square="markSquare(index)"
        @check-values="checkValues"
        @save-to-l-s="saveToLocalStorage(gameState)"
      >
      </GameBoard>
    </div>
  </div>

  <GameResults
    :winning-player="gameState.activePlayer"
    v-if="!gameState.isGameActive"
    @start-new-game="startNewGame"
    @play-again="playAgain"
  ></GameResults>
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
