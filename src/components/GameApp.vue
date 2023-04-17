<script setup lang="ts">
import AddPlayer from "./AddPlayer.vue";
import GameBoard from "./GameBoard.vue";
import GameResults from "./GameResults.vue";
import RestartButton from "./RestartButton.vue";
import ResetButton from "./ResetButton.vue";
import { ref } from "vue";
import { Player } from "../models/Player";
import { IGameState } from "../models/IGameState";
import { saveToLocalStorage } from "../helpers/saveToLocalStorage";
import { createGameState } from "../helpers/createGameState";
import { winningCombinations } from "../models/winningCombinations";
import { getRandomNumber } from "../helpers/getRandomNumber";

let gameState = ref<IGameState>(createGameState());
let message = ref("");

const addPlayer = (name: string) => {
  let symbol = "X";
  let i = getRandomNumber();

  if (gameState.value.players.length > 0) {
    symbol = "O";
  }

  gameState.value.players.push(new Player(name, symbol, [], 0));
  gameState.value.activePlayer = gameState.value.players[i];
  saveToLocalStorage(gameState.value);
};

const markSquare = (index: number) => {
  gameState.value.gameboard[index] = gameState.value.activePlayer.playerSymbol;
  gameState.value.markedSquares += 1;
};

const switchTurns = () => {
  if (gameState.value.activePlayer == gameState.value.players[0]) {
    gameState.value.activePlayer = gameState.value.players[1];
  } else {
    gameState.value.activePlayer = gameState.value.players[0];
  }
};

const checkValues = () => {
  let chosenIndex = 0;

  if (gameState.value.markedSquares > 8) {
    gameState.value.isGameActive = false;
    message.value = "Det blev oavgjort!";
  }

  gameState.value.gameboard.forEach((currentValue: string, index: number) => {
    if (currentValue === gameState.value.activePlayer.playerSymbol) {
      chosenIndex = index;

      if (!gameState.value.activePlayer.checkedSquares.includes(chosenIndex)) {
        gameState.value.activePlayer.checkedSquares.push(chosenIndex);
      }
    }
  });

  for (let i = 0; i < winningCombinations.length; i++) {
    let checkPlayer = winningCombinations[i].every((value) =>
      gameState.value.activePlayer.checkedSquares.includes(value)
    );

    if (checkPlayer) {
      gameState.value.isGameActive = false;
      gameState.value.activePlayer.score += 1;
      message.value = `Grattis ${gameState.value.activePlayer.username}! 🎉`;
    }
  }
};

const startNewGame = () => {
  localStorage.clear();
  window.location.reload();
};

const playAgain = () => {
  gameState.value.isGameActive = true;
  gameState.value.markedSquares = 0;

  for (let i = 0; i < gameState.value.gameboard.length; i++) {
    gameState.value.gameboard[i] = "";
  }

  for (let i = 0; i < gameState.value.players.length; i++) {
    gameState.value.players[i].checkedSquares = [];
  }

  let i = getRandomNumber();
  gameState.value.activePlayer = gameState.value.players[i];
  saveToLocalStorage(gameState.value);
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
        @switch-turns="switchTurns()"
        @mark-square="markSquare(index)"
        @check-values="checkValues"
        @save-to-l-s="saveToLocalStorage(gameState)"
      >
      </GameBoard>
    </div>

    <div class="button-container">
      <RestartButton @play-again="playAgain"></RestartButton>
      <ResetButton @start-new-game="startNewGame"></ResetButton>
    </div>
  </div>

  <div v-if="!gameState.isGameActive">
    <GameResults
      :message="message"
      :players="gameState.players"
      @start-new-game="startNewGame"
      @play-again="playAgain"
    ></GameResults>

    <div class="button-container">
      <RestartButton @play-again="playAgain"></RestartButton>
      <ResetButton @start-new-game="startNewGame"></ResetButton>
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

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 2rem;
}
</style>
