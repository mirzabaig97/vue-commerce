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
    </div>

    <div v-else class="row row-cols-2 row-cols-md-4 g-4 mb-3 mt-4">
      <CategoryCard
        v-for="cat in filteredCategories"
        :key="cat.id"
        :category="cat"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import CategoryCard from "../components/CategoryCard.vue";

const searchTerm = ref("");
const store = useStore();

const categories = computed(() => store.getters.categories);

const filteredCategories = computed(() =>
  categories.value.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

const isLoading = computed(() => store.getters.categories.length === 0);

onMounted(() => {
  store.dispatch("fetchCategories");
});
</script>
