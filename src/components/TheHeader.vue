<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <router-link class="navbar-brand fw-bold" to="/">Vue Commerce</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navItems"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navItems">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/categories"
            >Categories</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
        <li class="nav-item position-relative">
          <router-link class="nav-link" to="/favorites">
            Favorites
            <span
              v-if="favoritesCount > 0"
              class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger"
              style="font-size: 0.6rem"
            >
              {{ favoritesCount }}
              <span class="visually-hidden">items in favorites</span>
            </span>
          </router-link>
        </li>
      </ul>

      <button class="btn btn-outline-light" @click="$emit('toggle-dark-mode')">
        🌓
      </button>
    </div>
  </nav>
</template>
  
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const favoritesCount = computed(() => store.getters.favorites.length);
</script>