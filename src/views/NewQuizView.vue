<script setup>
// IMPORTS
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const themes = ref([
  {
    name: "Animais",
    link: "/new-quiz",
    img_path: "/img/animals.png",
  },
  {
    name: "Tecnologia",
    link: "/works",
    img_path: "/img/tech-2.png",
  },

  {
    name: "Esportes",
    link: "/works",
    img_path: "/img/sports.png",
  },

  {
    name: "Cinema",
    link: "/works",
    img_path: "/img/cinema.png",
  },

  {
    name: "Culinária",
    link: "/works",
    img_path: "/img/food.png",
  },

  {
    name: "Curiosidades",
    link: "/works",
    img_path: "/img/curious.png",
  },

  {
    name: "Idiomas",
    link: "/my-quiz",
    img_path: "/img/language.png",
  },
  {
    name: "Matemática",
    link: "/ranking",
    img_path: "/img/math.png",
  },

  {
    name: "Geografia",
    link: "/ranking",
    img_path: "/img/geo.png",
  },

  {
    name: "História",
    link: "/ranking",
    img_path: "/img/historie.png",
  },

  {
    name: "Ciência",
    link: "/ranking",
    img_path: "/img/cience.png",
  },
]);
const chosedTheme = ref(null);

// FUNCTIONS

const setTheme = (theme) => {
  chosedTheme.value = theme;
  window.scrollTo(0, document.body.scrollHeight);
};
</script>

<template>
  <main class="newQuiz min-h-[100dvh] w-full p-4 flex flex-col gap-10">
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

    <div class="newQuiz__content p-4 relative z-30 flex flex-col gap-8">
      <div class="texts">
        <h1 class="font-bold text-4xl text-bb-green-100">Temas</h1>
        <p class="text-bb-green-100 font-medium">
          Escolha um tema e teste seus conhecimentos! Qual área você domina? Clique em um
          dos temas abaixo e comece o desafio!
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
      <button class="bg-bb-green-100 px-6 py-3 rounded-xl" :disabled="!chosedTheme">
        <span class="text-white font-semibold">Avançar</span>
      </button>
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

  .dot {
    border-radius: 50%;
    background: #cde4df;
    position: absolute;
    width: 450px;
    height: 450px;
    z-index: 1;
    transition: 0.5s ease-in-out;
    .dot-outsite {
      position: relative;
      height: 100%;
      width: 100%;

      &::after {
        position: absolute;
        content: "";
        inset: -35%;
        border: 2px solid #cde4df;
        border-radius: 50%;
      }
    }
  }

  .dot-1 {
    top: -40%;
    right: -10%;
  }

  .dot-2 {
    bottom: -30%;
    left: -20%;
  }

  @media (max-width: 750px) {
    .dot {
      width: 200px;
      height: 200px;
      background: #dee7e5;

      .dot-outsite {
        &::after {
          border: 2px solid #dee7e5;
        }
      }
    }
    .dot-1 {
      top: 10%;
      right: -20%;
    }

    .dot-2 {
      bottom: 8%;
      left: -15%;
    }
  }
}
</style>
