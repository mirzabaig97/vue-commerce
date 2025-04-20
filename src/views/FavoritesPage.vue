<script setup>
import ProductTable from "../components/ProductTable.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const favorites = computed(() => store.getters.favorites.reverse());

const removeFavorite = (product) => {
  store.dispatch("toggleFavorite", product);
};
const removeAllFavorites = () => {
  store.dispatch("clearFavorites");
};
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center full-pill-heading">Your Favorites</h1>

    <div class="text-end mb-3" v-if="favorites.length">
      <button @click="removeAllFavorites" class="btn btn-sm btn-danger">
        Remove All Favorites
      </button>
    </div>

    <ProductTable :products="favorites" v-if="favorites.length">
      <template #actions="{ product }">
        <button
          @click="removeFavorite(product)"
          class="btn btn-sm btn-outline-secondary"
        >
          Remove
        </button>
      </template>
    </ProductTable>

    <div v-else class="text-center py-5">
      <p class="lead">You haven't favorited anything yet.</p>
      <router-link to="/products" class="btn btn-outline-primary">
        Browse Products
      </router-link>
    </div>
  </div>
</template>
