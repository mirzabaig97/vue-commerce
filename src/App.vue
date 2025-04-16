<template>
  <div>
    <TheHeader />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import TheHeader from "./components/TheHeader.vue";
</script>

<style>
body {
  margin-bottom: 50px !important;
}

.full-pill-heading {
  width: 100%;
  background-color: #f0f4ff;
  color: #2a4d9b;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  text-align: center;
  border-radius: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
}
</style>