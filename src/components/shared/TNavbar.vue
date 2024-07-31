<script setup></script>

<template>
  <nav
    class="w-full h-[70px] rounded-xl flex items-center justify-between z-30 bg-bb-green-100 p-5"
  >
    <div class="left">
      <slot name="left">
        <span
          class="font-extrabold text-2xl text-bb-white-100 cursor-pointer"
          @click="router.push('/')"
        >
          BrainBlitz.
        </span>
      </slot>
    </div>

    <div class="right">
      <slot name="right"> </slot>
    </div>
  </nav>
</template>
