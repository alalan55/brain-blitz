<script setup>
// IMPORTS
import { ref } from "vue";
const show = ref(true);
</script>
<template>
  <div v-auto-animate class="p-5 w-full bg-white shadow-md rounded-xl">
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
      <div v-for="t in 10" :key="t">
        <span
          class="font-semibold"
          :class="{ 'text-bb-green-100': t % 2 == 0, 'text-bb-red-300': t % 2 != 0 }"
        >
          {{ t }} - Quem foi que descobriu o brasil?
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
            <span>Foi o mano Pedro Alvares Cabral</span>
          </div>

          <div class="flex items-center gap-1">
            <figure class="h-[25px] w-[25px]">
              <img
                class="w-full h-full object contain"
                src="/icons/close-icon.svg"
                alt="Certas"
              />
            </figure>
            <span>Foi o mano Jimi Marsharl Hendrix</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
