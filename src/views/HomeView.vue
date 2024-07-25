<script setup>
// IMPORTS
import { ref } from "vue";
import { RouterLink } from "vue-router";

const links = ref([
  {
    name: "Novo quiz 📖",
    link: "/quiz",
    img_path: "",
  },
  {
    name: "Meus quiz 💯",
    link: "/my-quiz",
    img_path: "",
  },
  {
    name: "Ranking 🏆",
    link: "/ranking",
    img_path: "",
  },
  {
    name: "Como funciona 🤔?",
    link: "/works",
    img_path: "",
  },
]);
</script>

<template>
  <main
    class="home min-h-[100dvh] w-full p-4 flex flex-col items-center justify-center gap-10"
  >
    <div class="home__logo relative z-30">
      <span class="font-extrabold text-5xl text-bb-green-100"> BrainBlitz. </span>
    </div>

    <div class="home__content w-full flex flex-col gap-8">
      <template v-for="item in links" :key="item.name">
        <RouterLink
          :to="item.link"
          class="btn block py-7 px-8 rounded-xl w-[90%] md:w-[40%] m-auto overflow-hidden"
        >
          <span class="font-semibold text-xl text-white z-30 relative">
            {{ item.name }}
          </span>
        </RouterLink>
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
.home {
  position: relative;

  .home__logo {
    span {
      background: linear-gradient(
        90deg,
        rgba(10, 74, 73, 1) 0%,
        rgba(98, 140, 138, 1) 100%
      );
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }
  }
  .home__content {
    .btn {
      position: relative;
      z-index: 10;
      background: rgb(10, 74, 73);
      background: linear-gradient(
        90deg,
        rgba(10, 74, 73, 1) 0%,
        rgba(98, 140, 138, 1) 100%
      );

      &::before {
        position: absolute;
        content: "";
        inset: 0;
        background: rgb(10, 74, 73);
        background: linear-gradient(
          90deg,
          rgba(10, 74, 73, 1) 50%,
          rgba(98, 140, 138, 1) 100%
        );
        transition: opacity 0.3s linear;
        opacity: 0;
      }

      &:hover::before {
        opacity: 1;
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
        border: 1px solid #cde4df;
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
