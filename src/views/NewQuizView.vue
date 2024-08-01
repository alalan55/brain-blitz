<script setup>
// IMPORTS
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useQuizStore } from "@/stores/quiz";

// VARIABLES
const store = useQuizStore();
const router = useRouter();
const chosedTheme = ref(null);
const choosedLevel = ref(null);
const show_modal = ref(false);
const user_name = ref("");
const currentView = ref(1);
const levels = ref([
  {
    name: "Iniciante 👶",
    bg: "#628C8A",
    value: 0,
  },
  {
    name: "Intermediário 🙋",
    bg: "#628C8A",
    value: 1,
  },
  {
    name: "Experiente 👴",
    bg: "#628C8A",
    value: 2,
  },
  {
    name: "Alien 👽",
    bg: "#628C8A",
    value: 3,
  },
]);
const themes = ref([
  {
    name: "Animais",
    link: "/new-quiz",
    img_path: "/img/animals.png",
    value: 0,
    value_name: "animals",
  },
  {
    name: "Tecnologia",
    link: "/works",
    img_path: "/img/tech-2.png",
    value: 1,
    value_name: "tech",
  },

  {
    name: "Esportes",
    link: "/works",
    img_path: "/img/sports.png",
    value: 2,
  },

  {
    name: "Cinema",
    link: "/works",
    img_path: "/img/cinema.png",
    value: 3,
  },

  {
    name: "Culinária",
    link: "/works",
    img_path: "/img/food.png",
    value: 4,
  },

  {
    name: "Curiosidades",
    link: "/works",
    img_path: "/img/curious.png",
    value: 5,
  },

  {
    name: "Idiomas",
    link: "/my-quiz",
    img_path: "/img/language.png",
    value: 6,
  },
  {
    name: "Matemática",
    link: "/ranking",
    img_path: "/img/math.png",
    value: 7,
  },

  {
    name: "Geografia",
    link: "/ranking",
    img_path: "/img/geo.png",
    value: 8,
  },

  {
    name: "História",
    link: "/ranking",
    img_path: "/img/historie.png",
    value: 9,
  },

  {
    name: "Ciência",
    link: "/ranking",
    img_path: "/img/cience.png",
    value: 10,
  },
]);

// FUNCTIONS

const setTheme = (theme) => {
  store.SET_THEME(theme);
  chosedTheme.value = theme;
  window.scrollTo(0, document.body.scrollHeight);
};

const setDifficult = (level) => {
  store.SET_DIFFICULT(level);
  choosedLevel.value = level;
};

const verifyUser = () => {
  if (store.$userInfo) router.push("/quiz");
  else show_modal.value = true;
};

const saveUser = () => {
  store.SET_USER_INFO(user_name.value);
  show_modal.value = false;
  router.push("/quiz");
};

// COMPUTEDS
const userIcon = computed(() => {
  let name = "";

  if (store.$userInfo && store.$userInfo.name)
    name = store.$userInfo.name.split("")[0] + store.$userInfo.name.split("")[1];

  return name;
});
</script>

<template>
  <main v-auto-animate class="newQuiz min-h-[100dvh] w-full p-4 flex flex-col gap-10">
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
        <span class="font-extrabold text-1xl text-bb-white-100">{{ userIcon }}</span>
      </div>
    </div>

    <!-- ESCOLHA DE TEMAS -->
    <template v-if="currentView == 1">
      <div class="newQuiz__content p-4 relative z-30 flex flex-col gap-8">
        <div class="texts">
          <h1 class="font-bold text-4xl text-bb-green-100">Temas</h1>
          <p class="text-bb-green-100 font-medium">
            Escolha um tema e teste seus conhecimentos! Qual área você domina? Clique em
            um dos temas abaixo e comece o desafio!
          </p>
        </div>

        <div class="categories gap-8">
          <template v-for="category in themes" :key="category.name">
            <div
              class="category bg-white p-3 md:p-5 flex flex-col items-center gap-5 rounded-xl cursor-pointer border-solid border-2 border-[transparent]"
              :class="{ active: chosedTheme?.name == category?.name }"
              @click="setTheme(category)"
            >
              <figure class="w-[50px] h-[50px] md:w-[80px] md:h-[80px]">
                <img
                  :src="category.img_path"
                  :alt="category.name"
                  class="w-full h-full object-contain"
                />
              </figure>
              <div class="py-2 md:px-5 bg-bb-white-100 w-full rounded-xl text-center">
                <span class="font-semibold text-[.85rem] md:text-xl">
                  {{ category.name }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="newQuiz--action flex items-center justify-center relative z-30">
        <button
          class="bg-bb-green-100 px-6 py-3 rounded-xl"
          :disabled="!chosedTheme"
          @click="currentView++"
        >
          <span class="text-white font-semibold">Avançar</span>
        </button>
      </div>
    </template>

    <!-- ESCOLHA DE DIFICULTADE -->
    <template v-else>
      <div class="newQuiz__content p-4 relative z-30 flex flex-col gap-8">
        <div class="texts">
          <h1 class="font-bold text-4xl text-bb-green-100">Dificuldade</h1>
          <p class="text-bb-green-100 font-medium">
            Selecione o nível de dificuldade para o seu quiz! Desafie-se e veja até onde
            você pode chegar. Escolha entre Fácil, Médio ou Difícil e prove seu
            conhecimento!
          </p>
        </div>
      </div>

      <div class="levels flex items-center flex-wrap md:flex-nowrap gap-4 md:gap-6">
        <template v-for="level in levels" :key="level.name">
          <div
            class="level flex-[1_1_150px] md:flex-[1_1_300px] p-5 flex items-center justify-center rounded-3xl relative z-30 bg-white shadow-md hover:shadow-lg cursor-pointer"
            :class="{ '!bg-bb-green-300': level?.name == choosedLevel?.name }"
            @click="setDifficult(level)"
          >
            <span class="font-semibold text-xs md:text-lg text-bb-green-100">
              {{ level.name }}
            </span>
          </div>
        </template>
      </div>

      <div
        class="newQuiz--action flex items-center flex-wrap justify-center gap-4 relative z-30"
      >
        <button class="bg-bb-green-400 px-6 py-3 rounded-xl" @click="currentView--">
          <span class="text-white font-semibold">Trocar tema 🚶</span>
        </button>

        <button
          class="bg-bb-green-100 px-6 py-3 rounded-xl"
          :disabled="!choosedLevel"
          @click="verifyUser"
        >
          <span class="text-white font-semibold">Começar Quiz 🎉</span>
        </button>
      </div>
    </template>

    <div
      v-if="show_modal"
      class="flex items-center justify-center z-40 h-dvh w-dvw fixed inset-0 border-2"
    >
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="show_modal = !show_modal"
      ></div>

      <!-- Card -->
      <div class="relative max-w-[90%] p-6 bg-white rounded-lg shadow-lg z-10">
        <h1 class="text-2xl font-bold mb-4 text-bb-green-100">
          Insira seu nome ou apelido para começar o quiz ✍:
        </h1>
        <div class="w-full mt-10">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
            >Nome</label
          >
          <input
            v-model="user_name"
            id="name"
            type="text"
            placeholder="Ex: Fulano da Silva Sauro"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />

          <div class="action flex items-center justify-center pt-8">
            <button class="bg-bb-green-100 px-5 py-2 rounded-xl" @click="saveUser">
              <span class="text-white font-semibold">Começar 🎊</span>
            </button>
          </div>
        </div>
      </div>
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
.newQuiz {
  position: relative;

  .newQuiz__content {
    .categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

      .active {
        border: 2px solid #0a4a49;
      }

      @media (max-width: 650px) {
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      }
    }
  }
}
</style>
