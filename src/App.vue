<template>
  <div :class="{ dark: isDarkMode }">
    <TheHeader @toggle-dark-mode="toggleDarkMode" />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import TheHeader from "./components/TheHeader.vue";

const isDarkMode = ref(false);
const toggleDarkMode = () => (isDarkMode.value = !isDarkMode.value);

const store = useStore();

onMounted(() => {
  store.dispatch("initCategoriesAndProducts");
  store.dispatch("initializeDarkMode");
});
</script>

<style>
.pill-heading {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background-color: #f0f4ff;
  color: #2a4d9b;
  font-weight: 600;
  border-radius: 50rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
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

body.dark-mode {
  background-color: #121212;
  color: #eee;
}

body.dark-mode .table {
  background-color: #212529;
  color: #fff;
}

body.dark-mode .table th,
body.dark-mode .table td {
  border-color: #444;
}
</style>
