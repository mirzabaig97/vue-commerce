<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center full-pill-heading">Product Categories</h1>

    <div v-if="categories.length" class="row g-4 mb-5">
      <CategoryCard v-for="cat in categories" :key="cat.id" :category="cat" />
    </div>

    <div v-else class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h6>Loading...</h6>
    </div>

    <div v-if="lastVisited.length && categories.length" class="mb-5">
      <h2 class="text-center full-pill-heading">Last Visited</h2>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col" v-for="product in lastVisited" :key="product.id">
          <ProductCard :product="product" showCategory />
        </div>
      </div>
    </div>

    <div v-if="favorites.length" class="mb-5">
      <h2 class="text-center full-pill-heading">Favorites</h2>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col" v-for="product in favorites" :key="product.id">
          <ProductCard :product="product" showCategory />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CategoryCard from "../components/CategoryCard.vue";
import ProductCard from "../components/ProductCard.vue";

const store = useStore();

const categories = computed(() => store.getters.categories);
const favorites = computed(() => store.getters.favorites);
const lastVisited = computed(() => store.getters.lastVisited);
</script>
