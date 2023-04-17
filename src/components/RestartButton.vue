<script setup lang="ts">
const emit = defineEmits(["playAgain"]);
</script>

<template>
  <button @click="emit('playAgain')">Spela en omgång till!</button>
</template>
