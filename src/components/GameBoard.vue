<script setup lang="ts">
import { ref } from "vue";
import { IGameState } from "../models/IGameState";

interface IGameProps {
  index: number;
  game: IGameState;
}

const emit = defineEmits(["switchTurns", "markSquare"]);
const props = defineProps<IGameProps>();

let symbol = ref("X");
</script>

<template>
  <div @click="emit('switchTurns'), emit('markSquare')">{{ symbol }}</div>
</template>
