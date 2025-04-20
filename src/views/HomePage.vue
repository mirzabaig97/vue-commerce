<template>
  <div class="container py-4">
    <section class="mb-5">
      <h1 class="mb-4 text-center full-pill-heading">Product Categories</h1>
      <div v-if="categories.length" class="row g-4">
        <CategoryCard v-for="cat in categories" :key="cat.id" :category="cat" />
      </div>
      <div v-else class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h6>Loading...</h6>
      </div>
    </section>

    <section
      v-if="lastVisited.length && categories.length"
      class="mb-5 border-top pt-4"
    >
      <h2 class="text-center full-pill-heading mb-4">Last Visited</h2>
      <div class="row g-4">
        <div
          class="col-6 col-md-3 d-flex align-items-stretch"
          v-for="product in lastVisited"
          :key="product.id"
        >
          <ProductCard :product="product" showCategory />
        </div>
      </div>
    </section>

    <section v-if="favorites.length" class="mb-5 border-top pt-4">
      <h2 class="text-center full-pill-heading mb-4">Favorites</h2>
      <div class="row g-4">
        <div
          class="col-6 col-md-3 d-flex align-items-stretch"
          v-for="product in favorites"
          :key="product.id"
        >
          <ProductCard :product="product" showCategory />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CategoryCard from "../components/CategoryCard.vue";
import ProductCard from "../components/ProductCard.vue";

const store = useStore();

const categories = computed(() => store.getters.categories);
const favorites = computed(() => store.getters.favorites.slice(-5).reverse());
const lastVisited = computed(() => store.getters.lastVisited);
</script>
