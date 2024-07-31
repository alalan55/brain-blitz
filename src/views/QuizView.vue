<script setup>
//IMPORTS
import { useQuizStore } from "@/stores/quiz";

// VARIABLES
const store = useQuizStore();
</script>

<template>
  <div>
    <h1>Tela de quiz aqui</h1>
    <pre>
        {{ store.$quizInfo }}
    </pre>
  </div>
</template>

<style lang="scss" scoped></style>
