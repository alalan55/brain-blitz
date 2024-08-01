<script setup>
//IMPORTS
import { ref, computed } from "vue";
import { useQuizStore } from "@/stores/quiz";
import { animals } from "@/infos/questions";
import { useRouter } from "vue-router";
import QuizQuestion from "@/components/quiz/TheQuestion.vue";
import TNavbar from "@/components/shared/TNavbar.vue";
import TheStatistics from "@/components/quiz/TheStatistics.vue";

// VARIABLES
const router = useRouter();
const store = useQuizStore();
const questions_infos = ref({ animals });
const current_question_index = ref(1);
const quiz_infos = ref(null);
const quiz_questions = ref(null);
const questions_quantity = ref({
  0: 10,
  1: 12,
  2: 15,
  3: 20,
});
const results_messages = ref({
  bad: "É, sempre há tempo para melhorar 😉",
  good: "Você está no caminho certo 😄",
  excellent: "Mandou muito bem! Continue assim",
  wow: "WOOOW 😮😮😱🎉🎇",
});

// FUNCTIONS
const startQuiz = async () => {
  if (!store.$quizInfo.theme) {
    router.push("/new-quiz");
    return;
  }

  // GET QUIZ INFOS AND QUESTIONS
  const { infos, questions } = await getQuizInfo();
  quiz_infos.value = infos;

  // MOUNT QUESTIONS
  const filterd_questions = await mountQuestions(questions);

  // MOUNT OBJECT QUESTIONS
  quiz_questions.value = await mountObjectQuestion(filterd_questions);
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

const mountObjectQuestion = (arr) => {
  let obj = {};
  arr.forEach((element, idx) => {
    element.response = "";
    element.responseAnswer = "";
    obj[idx + 1] = element;
  });

  return obj;
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

const setResponse = (response) => {
  quiz_questions.value[current_question_index.value];

  quiz_questions.value[current_question_index.value] = response;

  if (current_question_index.value == questionsQuanity.value) {
    console.log("RESPONDIDO", quiz_questions.value);
  } else {
    current_question_index.value++;
  }
};

const questionsQuanity = computed(
  () => questions_quantity.value[store.$quizInfo.difficult.value]
);

startQuiz();
</script>

<template>
  <main class="quiz min-h-[100dvh] w-full p-4 flex flex-col gap-10 relative">
    <!-- <TNavbar>
      <template #right>
        <div class="level">
          <small class="text-bb-white-100">
            Level: <strong>{{ store.$quizInfo.difficult.name }}</strong>
          </small>
        </div>
      </template>
    </TNavbar>

    <div v-if="quiz_questions" class="quiz__content px-4">
      <div class="question py-2">
        <QuizQuestion
          :current-question-prop="quiz_questions[current_question_index]"
          :current-question-idnex="current_question_index"
          :questions-quantity-prop="questionsQuanity"
          :key="current_question_index"
          @select-response="setResponse"
        />
      </div>
    </div> -->

    <div class="quiz__result flex-1 flex flex-col items-center justify-center gap-6">
      <div class="result-message text-center">
        <span class="text-2xl md:text-4xl font-semibold text-bb-green-100">
          {{ results_messages["good"] }}
        </span>
      </div>

      <div
        class="result-percentage w-[25dvh] h-[25dvh] md:w-[30dvh] md:h-[30dvh] border-solid border-[20px] border-bb-green-100 rounded-full flex items-center justify-center flex flex-col"
      >
        <span class="text-2xl font-bold text-bb-green-100">100%</span>
        <small>de acertos</small>
      </div>

      <div class="results-quantity flex gap-12">
        <span class="text-bb-green-100"> <strong>10</strong> acertos </span>

        <span class="text-bb-red-300"> <strong>3</strong> erros </span>
      </div>

      <div class="result-statitics gap-5 w-[90%] md:w-[55%] flex flex-col gap-5">
        <TheStatistics />
      </div>

      <div
        class="result-action flex flex-wrap items-center justify-center gap-5 w-[90%] md:w-[45%]"
      >
        <button class="bg-bb-green-100 px-6 py-3 rounded-xl flex-1">
          <span class="text-white font-semibold">Home 🏠</span>
        </button>
        <button class="bg-bb-green-100 px-6 py-3 rounded-xl flex-1">
          <span class="text-white font-semibold">Novo quiz 🎉</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style lang="postcss" scoped></style>
