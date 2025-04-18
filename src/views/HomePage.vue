<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center full-pill-heading">Product Categories</h1>
    <div class="row g-4 mb-5">
      <CategoryCard v-for="cat in categories" :key="cat" :category="cat" />
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
    categories.value = res.data.map((c) => ({
      id: c.id,
      name: c.name,
      image: c.image,
    }));
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  } finally {
    console.log(categories);
  }
});
</script>