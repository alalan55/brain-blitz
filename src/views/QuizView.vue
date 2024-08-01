<script setup>
//IMPORTS
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuizStore } from "@/stores/quiz";
import { animals } from "@/infos/questions";
import QuizQuestion from "@/components/quiz/TheQuestion.vue";
import TNavbar from "@/components/shared/TNavbar.vue";
import TheStatistics from "@/components/quiz/TheStatistics.vue";

// VARIABLES
const router = useRouter();
const store = useQuizStore();
const circumference = 2 * Math.PI * 45;
const questions_infos = ref({ animals });
const current_question_index = ref(1);
const finished = ref(false);
const quiz_infos = ref(null);
const quiz_questions = ref(null);
const finalResult = ref(null);
const hint_percent = ref(0);
const result_status_message = ref("");
const questions_quantity = ref({
  0: 10,
  1: 12,
  2: 15,
  3: 20,
});
const results_messages = ref({
  bad: "É, sempre há tempo para melhorar 😉",
  good: "Você está no caminho certo 😄",
  excellent: "Mandou muito bem! Continue assim! 👏",
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

const mountQuestions = async (questions) => {
  const qtd = questions_quantity.value[store.$quizInfo.difficult.value];
  const rdm = await getRandomElements(questions, qtd);
  return rdm;
};

const setResponse = async (response) => {
  // update quiz with new responses
  delete quiz_questions.value[current_question_index.value];
  quiz_questions.value[current_question_index.value] = response;

  // go to next question if not last
  if (current_question_index.value != questionsQuanity.value) {
    current_question_index.value++;
    return;
  }

  // save informations to quiz
  finalResult.value = await calculatePoints(quiz_questions.value);
  hint_percent.value = await calculatePercentHint(finalResult.value).toFixed(0);
  await setFinishMessage(hint_percent.value);
  saveQuiz();
  finished.value = true;
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

const getQuizInfo = () => {
  const infos = questions_infos.value[store.$quizInfo?.theme?.value_name];
  const questions =
    infos.questions.filter((q) => q.level == store.$quizInfo.difficult.value) || [];

  return { infos, questions: questions };
};

const calculatePoints = (form) => {
  const hints = {};
  const errors = {};
  let finalResult = {};

  for (let [key, value] of Object.entries(form)) {
    value.correct_answer == value.response ? (hints[key] = value) : (errors[key] = value);
  }

  finalResult = { errors, hints, full: { ...errors, ...hints } };

  return finalResult;
};

const calculatePercentHint = (form) => {
  const hints_qtd = Object.keys(form.hints).length;
  const erros_qtd = Object.keys(form.errors).length;
  const total = hints_qtd + erros_qtd;

  return (hints_qtd * 100) / total;
};

const setFinishMessage = (value) => {
  if (value > 0 && value < 10) result_status_message.value = "bad";
  if (value > 10 && value < 40) result_status_message.value = "good";
  if (value > 40 && value < 80) result_status_message.value = "excellent";
  if (value > 80) result_status_message.value = "wow";
  return;
};

const saveQuiz = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hh = today.getHours();
  let min = today.getMinutes();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = `${dd}/${mm}/${yyyy} ${hh}:${min}`;

  const obj = {
    date: formattedToday,
    hints: Object.keys(finalResult.value["hints"]).length,
    errors: Object.keys(finalResult.value["errors"]).length,
    hint_percent: hint_percent.value,
    theme: quiz_infos.value.name,
  };

  store.SET_USER_QUIZ(obj);
};

// COMPUTEDS
const questionsQuanity = computed(
  () => questions_quantity.value[store.$quizInfo.difficult.value]
);

const progressStyle = computed(() => {
  const offset = circumference - (circumference * hint_percent.value) / 100;
  return { strokeDashoffset: offset };
});

startQuiz();
</script>

<template>
  <main class="quiz min-h-[100dvh] w-full p-4 flex flex-col gap-10 relative">
    <template v-if="!finished">
      <TNavbar>
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
      </div>
    </template>

    <div
      v-if="finished"
      class="quiz__result flex-1 flex flex-col items-center justify-center gap-6"
    >
      <div class="result-message text-center">
        <span class="text-2xl md:text-4xl font-semibold text-bb-green-100">
          {{ results_messages[result_status_message] }}
        </span>
      </div>

      <div
        class="result-percentage w-[25dvh] h-[25dvh] md:w-[30dvh] md:h-[30dvh] rounded-full flex items-center justify-center flex-col"
      >
        <svg class="progress-circle" width="100%" height="100%" viewBox="0 0 100 100">
          <circle class="bg" cx="50" cy="50" r="45"></circle>
          <circle class="progress" :style="progressStyle" cx="50" cy="50" r="45"></circle>
        </svg>
        <span class="text-2xl font-bold text-bb-green-100">{{ hint_percent }}%</span>
        <small>de acertos</small>
      </div>

      <div class="results-quantity flex gap-12">
        <span class="text-bb-green-100">
          <strong>{{ Object.keys(finalResult["hints"]).length }}</strong> acertos
        </span>

        <span class="text-bb-red-300">
          <strong>{{ Object.keys(finalResult["errors"]).length }}</strong> erros
        </span>
      </div>

      <div class="result-statitics gap-5 w-[90%] md:w-[55%] flex flex-col gap-5">
        <TheStatistics :result-prop="finalResult" />
      </div>

      <div
        class="result-action flex flex-wrap items-center justify-center gap-5 w-[90%] md:w-[45%]"
      >
        <button
          class="bg-bb-green-100 px-6 py-3 rounded-xl flex-1"
          @click="router.push('/new-quiz')"
        >
          <span class="text-xs md:text-base text-white font-semibold">Home 🏠</span>
        </button>

        <button class="bg-bb-green-100 px-6 py-3 rounded-xl flex-1">
          <span class="text-xs md:text-base text-white font-semibold">Novo quiz 🎉</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
.result-percentage {
  position: relative;
}

.progress-circle {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
}

.progress-circle .bg {
  fill: none;
  stroke: #e6e6e6;
  stroke-width: 10;
}

.progress-circle .progress {
  fill: none;
  stroke: #00b894;
  stroke-width: 10;
  stroke-dasharray: 282.743; /* Circunferência do círculo: 2 * π * r (2 * π * 45) */
  stroke-dashoffset: 282.743; /* Para iniciar a animação */
  transition: stroke-dashoffset 1s;
}
</style>
