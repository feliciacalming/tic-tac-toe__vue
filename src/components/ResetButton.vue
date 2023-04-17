<script setup lang="ts">
const emit = defineEmits(["startNewGame"]);
</script>

<template>
  <button @click="emit('startNewGame')">Starta ett nytt spel!</button>
</template>
