<template>
  <div class="container py-4">
    <h1 class="mb-3">
      Products <span v-if="categoryName">in "{{ categoryName }}"</span>
    </h1>

    <div class="row mb-3">
      <div class="col-md-6">
        <input
          type="text"
          class="form-control"
          placeholder="Search products..."
        />
      </div>
    </div>

    <div class="row row-cols-2 row-cols-md-4 g-4">
      <div class="col" v-for="product in paginatedProducts" :key="product.id">
        <ProductCard :product="product" showCategory />
      </div>
    </div>

    <nav class="mt-4" v-if="products.length > perPage">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <button class="page-link" @click="page--">Previous</button>
        </li>
        <li class="page-item disabled">
          <span class="page-link">Page {{ page }}</span>
        </li>
        <li
          class="page-item"
          :class="{ disabled: end >= products.length }"
        >
          <button class="page-link" @click="page++">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
  
<script setup>
const isLoading = ref(true);

import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

const route = useRoute();
const products = ref([]);
const page = ref(1);
const perPage = 8;

const categoryId = ref(route.query.categoryId || "");
const categoryName = ref(route.query.categoryName || "");

const fetchProducts = async () => {
  try {
    isLoading.value = true;
    let res;
    if (categoryId.value) {
      res = await axios.get(
        `https://api.escuelajs.co/api/v1/categories/${categoryId.value}/products`
      );
    } else {
      res = await axios.get("https://api.escuelajs.co/api/v1/products");
    }
    products.value = res.data;
    page.value = 1;
  } catch (err) {
    console.error("Failed to fetch products:", err);
  } finally {
    console.log(products.value);
  }
};

onMounted(fetchProducts);

watch(
  () => route.query.categoryId,
  (newId) => {
    categoryId.value = newId;
    categoryName.value = route.query.categoryName || "";
    fetchProducts();
  }
);

const start = computed(() => (page.value - 1) * perPage);
const end = computed(() => start.value + perPage);
const paginatedProducts = computed(() =>
products.value.slice(start.value, end.value)
);
</script>
