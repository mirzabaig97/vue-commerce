<template>
  <div class="container py-4">
    <h1 class="mb-3">Products</h1>

    <div class="row row-cols-2 row-cols-md-4 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <img
          v-if="product?.images?.[0]"
          :src="product.images[0]"
          class="card-img-top"
          :alt="product.title"
          loading="lazy"
        />
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">${{ product.price }}</p>

          <p v-if="product?.category?.name" class="text-muted">
            Category: {{ product.category.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);

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

</script>
