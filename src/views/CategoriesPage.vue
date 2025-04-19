<template>
  <div class="container py-4">
    <h1 class="mb-4">Browse Categories</h1>

    <input
      v-model="searchTerm"
      type="text"
      class="form-control mt-3"
      placeholder="Search categories..."
    />

    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h3>Loading...</h3>
    </div>

    <div v-else class="row row-cols-2 row-cols-md-4 g-4 mb-3 mt-4">
      <CategoryCard
        v-for="cat in filteredCategories"
        :key="cat.name"
        :category="cat"
      />
    </div>
  </div>
</template>
  
  <script setup>
const isLoading = ref(true);
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import CategoryCard from "../components/CategoryCard.vue";

const categories = ref([]);
const searchTerm = ref("");

const filteredCategories = computed(() =>
  categories.value.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

onMounted(async () => {
  try {
    const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
    categories.value = res.data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>
  