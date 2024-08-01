<script setup>
// IMPORTS
import { ref } from "vue";

// PROPS
const props = defineProps({
  resultProp: { type: Object, default: null, required: true },
});

// VARIABLES
const show = ref(false);
const full_result = ref(props.resultProp.full);
</script>
<template>
  <div
    v-if="props.resultProp"
    v-auto-animate
    class="p-5 w-full bg-white shadow-md rounded-xl"
  >
    <div class="header flex items-center justify-between">
      <span class="text-xl font-semibold text-bb-green-100">Visão Geral</span>

      <figure class="h-[35px] w-[35px] cursor-pointer" @click="show = !show">
        <img
          :src="!show ? '/icons/chevron-down-icon.svg' : '/icons/chevron-up-icon.svg'"
          alt="Colapsar"
          class="w-full h-full object contain"
        />
      </figure>
    </div>

    <div v-if="show" class="body flex flex-col gap-7 mt-5">
      <div v-for="(t, idx) in full_result" :key="t.question">
        <span
          class="font-semibold"
          :class="{
            'text-bb-green-100': t.correct_answer == t.response,
            'text-bb-red-300': t.correct_answer != t.response,
          }"
        >
          {{ idx }} - {{ t.question }}
        </span>

        <div class="mt-1">
          <div class="flex items-center gap-1">
            <figure class="h-[25px] w-[25px]">
              <img
                class="w-full h-full object contain"
                src="/icons/check-icon.svg"
                alt="Certas"
              />
            </figure>
            <span>
              <strong>({{ t.correct_answer }})</strong> -
              {{ t.answers[t.correct_answer] }}
            </span>
          </div>

          <div v-if="t.correct_answer != t.response" class="flex items-center gap-1">
            <figure class="h-[25px] w-[25px]">
              <img
                class="w-full h-full object contain"
                src="/icons/close-icon.svg"
                alt="Certas"
              />
            </figure>
            <span>
              <strong>({{ t.response }})</strong> -
              {{ t.responseAnswer }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
