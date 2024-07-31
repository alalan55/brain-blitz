<script setup>
// IMPORTS
import { RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper h-auto w-full bg-bb-white-100 overflow-hidden">
    <div class="wrapper__content max-w-[1400px] m-auto relative z-30">
      <RouterView />
    </div>

    <div class="dot dot-1">
      <div class="dot-outsite"></div>
    </div>

    <div class="dot dot-2">
      <div class="dot-outsite"></div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.wrapper {
  position: relative;
  .dot {
    border-radius: 50%;
    background: #cde4df;
    position: fixed;
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
    top: -30%;
    right: -10%;
  }

  .dot-2 {
    bottom: -20%;
    left: -15%;
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
