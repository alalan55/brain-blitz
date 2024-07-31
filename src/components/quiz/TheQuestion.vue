<script setup>
import { ref } from "vue";

// PROPS
const props = defineProps({
  currentQuestionProp: { type: Object, required: true, defualt: null },
});

//VARIABLES
const the_qusetion = ref({ ...props.currentQuestionProp });

const selected_question = ref(null);
</script>

<template>
  <div class="question flex flex-col gap-10">
    <div class="question__title flex flex-col gap-1">
      <small class="text-bb-green-100"
        >pergunta <strong>1</strong> de <strong>10</strong></small
      >
      <span class="text-2xl text-bb-green-100">{{ the_qusetion.question }}</span>
    </div>

    <div class="question__options flex flex-col gap-8">
      <template v-for="(item, i) in the_qusetion.answers" :key="i">
        <div
          class="shadow-md hover:shadow-lg cursor-pointer p-6 bg-white rounded-2xl border-2 border-[transparent] text-center"
          :class="{ 'border-2 border-bb-green-100': selected_question === item }"
          @click="selected_question = item"
        >
          <span class="font-semibold text-bb-green-100">{{ item }}</span>
        </div>
      </template>
    </div>

    <div class="question--action flex justify-center">
      <button
        class="bg-bb-green-100 px-6 py-3 rounded-xl"
        :class="{ 'bg-bb-green-200': !selected_question }"
        :disabled="!selected_question"
      >
        <span class="text-white font-semibold">Responder</span>
      </button>
    </div>
    <!-- <pre>    {{ the_qusetion }}</pre> -->
  </div>
</template>

<style lang="scss" scoped></style>
