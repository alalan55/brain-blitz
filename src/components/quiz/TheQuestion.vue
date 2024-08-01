<script setup>
// IMPORTS
import { ref } from "vue";

// PROPS
const props = defineProps({
  currentQuestionProp: { type: Object, required: true, defualt: null },
  currentQuestionIdnex: { type: [Number, String], required: true, defualt: null },
  questionsQuantityProp: { type: [Number, String], required: true, defualt: null },
});

// EMITS
const emit = defineEmits(["selectResponse"]);

//VARIABLES
const the_qusetion = ref({ ...props.currentQuestionProp });

// FUNCTIONS
const setResponse = (resp) => {
  // usar essa função no futuro caso seja necessário
  for (const [key, value] of Object.entries(the_qusetion.value.answers)) {
    if (resp === value) {
      the_qusetion.value.response = key;
      the_qusetion.value.responseAnswer = value;
    }
  }
};
</script>

<template>
  <div class="question flex flex-col gap-8">
    <div class="question__title flex flex-col gap-1">
      <small class="text-bb-green-100">
        pergunta <strong>{{ props.currentQuestionIdnex }}</strong> de
        <strong>{{ props.questionsQuantityProp }}</strong>
      </small>
      <span class="text-lg md:text-2xl text-bb-green-100">
        {{ the_qusetion.question }}
      </span>
    </div>

    <div class="question__options flex flex-col gap-8">
      <template v-for="(item, i) in the_qusetion.answers" :key="i">
        <div
          class="shadow-md hover:shadow-lg cursor-pointer p-6 bg-white rounded-2xl border-2 border-[transparent] text-center"
          :class="{
            'border-2 border-bb-green-100': the_qusetion.responseAnswer === item,
          }"
          @click="setResponse(item)"
        >
          <span class="font-semibold text-bb-green-100">{{ item }}</span>
        </div>
      </template>
    </div>

    <div class="question--action flex justify-center">
      <button
        class="bg-bb-green-100 px-6 py-3 rounded-xl"
        :class="{ 'bg-bb-green-200': !the_qusetion.responseAnswer }"
        :disabled="!the_qusetion.responseAnswer"
        @click="emit('selectResponse', the_qusetion)"
      >
        <span class="text-white font-semibold">Responder</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
