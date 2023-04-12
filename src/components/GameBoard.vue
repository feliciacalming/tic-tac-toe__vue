<script setup lang="ts">
interface IPlayerSymbolProps {
  playerSymbol: string;
  index: number;
}

const emit = defineEmits(["switchTurns", "markSquare"]);
defineProps<IPlayerSymbolProps>();
</script>

<template>
  <div @click="emit('switchTurns')" :key="$props.index"></div>
</template>
