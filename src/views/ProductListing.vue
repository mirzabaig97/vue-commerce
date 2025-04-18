<template>
  <div class="container py-4">
    <h1 class="mb-3">
      Products <span v-if="categoryName">in "{{ categoryName }}"</span>
    </h1>

    <div class="row mb-3">
      <div class="col-md-6">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search products..."
        />
      </div>
    </div>

    <div class="row row-cols-2 row-cols-md-4 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <ProductCard :product="product" showCategory />
      </div>
    </div>
  </div>
</template>
  
<script setup>

import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

const route = useRoute();
const products = ref([]);

const categoryId = ref(route.query.categoryId || "");
const categoryName = ref(route.query.categoryName || "");

const fetchProducts = async () => {
  try {
    let res;
    res = await axios.get("https://api.escuelajs.co/api/v1/products");
    products.value = res.data;
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
</script>
