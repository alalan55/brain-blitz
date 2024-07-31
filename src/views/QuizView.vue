<script setup>
//IMPORTS
import { ref } from "vue";
import { useQuizStore } from "@/stores/quiz";
import { animals } from "@/infos/questions";

// VARIABLES
const store = useQuizStore();
const questions_infos = ref({ animals });
const quiz_infos = ref(null);
const quiz_questions = ref(null);
const questions_quantity = ref({
  0: 10,
  1: 15,
  2: 15,
  3: 20,
});

// FUNCTION
const startQuiz = async () => {
  // GET QUIZ INFOS AND QUESTIONS
  const { infos, questions } = await getQuizInfo();
  quiz_infos.value = infos;

  // MOUNT QUESTIONS
  quiz_questions.value = await mountQuestions(questions);
};

const getQuizInfo = () => {
  const info = questions_infos.value[store.$quizInfo?.theme?.value_name];
  const questions =
    info.questions.filter((q) => q.level == store.$quizInfo.difficult.value) || [];

  return { infos: info, questions: questions };
};

const mountQuestions = async (questions) => {
  const qtd = questions_quantity.value[store.$quizInfo.difficult.value];
  const rdm = await getRandomElements(questions, qtd);
  return rdm;
};

const getRandomElements = (arr, qtd) => {
  const shuffled = arr.slice(0);
  let i = arr.length;
  const min = i - qtd;

  let temp, idx;

  while (i-- > min) {
    idx = Math.floor((i + 1) * Math.random());
    temp = shuffled[idx];
    shuffled[idx] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(min);
};

startQuiz();
</script>

<template>
  <main class="quiz min-h-[100dvh] w-full p-4 flex flex-col gap-10">
    <div
      class="newQuiz__header w-full h-[70px] rounded-xl flex items-center justify-between z-30 bg-bb-green-100 p-5"
    >
      <div class="left">
        <span
          class="font-extrabold text-2xl text-bb-white-100 cursor-pointer"
          @click="router.push('/')"
        >
          BrainBlitz.
        </span>
      </div>

      <div
        class="right w-[40px] h-[40px] bg-bb-green-200 p-2 flex items-center justify-center rounded-full"
      >
        <span class="font-extrabold text-1xl text-bb-white-100">AF</span>
      </div>
    </div>

    <div class="quiz__content px-4 border-2 border-black">
      <template v-if="quiz_questions?.length">
        <div v-for="(q, i) in quiz_questions" :key="i" class="relative z-30">
          <span>{{ q.question }}</span>
        </div>
      </template>
    </div>

    <div class="dot dot-1">
      <div class="dot-outsite"></div>
    </div>

    <div class="dot dot-2">
      <div class="dot-outsite"></div>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
.quiz {
  position: relative;
}
</style>
