<!-- src/views/CategoriesPage.vue -->
<template>
  <div class="container py-4">
    <h1 class="mb-4">Browse Categories</h1>
    <input
      type="text"
      class="form-control mt-3"
      placeholder="Search categories..."
    />
    <div class="row row-cols-2 row-cols-md-4 g-4 mb-3 mt-4">
      <CategoryCard
        v-for="cat in categories"
        :key="cat.name"
        :category="cat"
      />
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import CategoryCard from "../components/CategoryCard.vue";

const categories = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
    categories.value = res.data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  } finally {
    console.log(categories.value);
  }
});
</script>
  