<template>
  <div>
    <TheHeader />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
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

.pill-heading {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background-color: #f0f4ff;
  color: #2a4d9b;
  font-weight: 600;
  border-radius: 50rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
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

.dark {
  background-color: #121212;
  color: #f5f5f5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
