<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center full-pill-heading">Browse Categories</h1>

    <SearchBar v-model="searchTerm" placeholder="Search products..." />

    <LoadingSpinner v-if="isLoading" />

    <div v-else class="row row-cols-2 row-cols-md-4 g-4 mb-3 mt-4">
      <CategoryCard
        v-for="cat in paginatedCategories"
        :key="cat.id"
        :category="cat"
      />
    </div>

    <ListPagination
      v-model:page="page"
      :perPage="perPage"
      :total="filteredCategories.length"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import CategoryCard from "../../components/category/CategoryCard.vue";
import SearchBar from "../../components/widgets/SearchBar.vue";
import ListPagination from "../../components/widgets/ListPagination.vue";
import LoadingSpinner from "../../components/widgets/LoadingSpinner.vue";

const store = useStore();

const perPage = 4;
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
