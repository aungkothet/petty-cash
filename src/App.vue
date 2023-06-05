<script setup>
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="wallpaper-register">
    <NavBar></NavBar>
    <main class="scroll">
      <RouterView />
    </main>
  </div>
</template>
