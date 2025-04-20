<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center full-pill-heading">Browse Categories</h1>

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
        v-for="cat in paginatedCategories"
        :key="cat.id"
        :category="cat"
      />
    </div>

    <nav class="mt-4" v-if="filteredCategories.length > perPage">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <button class="page-link" @click="page--">Previous</button>
        </li>
        <li class="page-item disabled">
          <span class="page-link">Page {{ page }}</span>
        </li>
        <li
          class="page-item"
          :class="{ disabled: end >= filteredCategories.length }"
        >
          <button class="page-link" @click="page++">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import CategoryCard from "../components/CategoryCard.vue";

const store = useStore();

const perPage = 8;
const page = ref(1);
const searchTerm = ref("");

const categories = computed(() => store.getters.categories);

const filteredCategories = computed(() =>
  categories.value.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

const start = computed(() => (page.value - 1) * perPage);
const end = computed(() => start.value + perPage);
const paginatedCategories = computed(() =>
  filteredCategories.value.slice(start.value, end.value)
);

const isLoading = computed(() => store.getters.categories.length === 0);

onMounted(() => {
  store.dispatch("fetchCategories");
});
</script>
