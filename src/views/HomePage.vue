<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center full-pill-heading">Product Categories</h1>

    <div class="row g-4 mb-5">
      <CategoryCard v-for="cat in categories" :key="cat" :category="cat" />
    </div>

    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h6>Loading...</h6>
    </div>

    <div v-if="favorites.length" class="mb-5">
      <h2 class="text-center full-pill-heading">Favorites</h2>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col" v-for="product in favorites" :key="product.id">
          <ProductCard :product="product" showCategory />
        </div>
      </div>
    </div>

    <div v-if="lastVisited.length && !isLoading" class="mb-5">
      <h2 class="text-center full-pill-heading">Last Visited</h2>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col" v-for="product in lastVisited" :key="product.id">
          <ProductCard :product="product" showCategory />
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";

import CategoryCard from "../components/CategoryCard.vue";
import ProductCard from "../components/ProductCard.vue";

const isLoading = ref(true);
const categories = ref([]);
const store = useStore();
const favorites = store.getters.favorites;
const lastVisited = store.getters.lastVisited;

onMounted(async () => {
  try {
    const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
    categories.value = res.data.map((c) => ({
      id: c.id,
      name: c.name,
      image: c.image,
    }));
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>