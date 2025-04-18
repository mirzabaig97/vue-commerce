<template>
  <div class="container py-4" v-if="product">
    <div class="row">
      <div class="col-md-5">
        <img
          :src="product.images[0]"
          alt="product.title"
          class="img-fluid shadow"
        />
      </div>
      <div class="col-md-7">
        <h2>{{ product.title }}</h2>
        <h4 class="text-muted mb-3">$ {{ product.price }}</h4>
        <p class="mb-3">{{ product.description }}</p>
        <span class="text-capitalize">{{
          product.category.name
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const res = await axios.get(
    `https://api.escuelajs.co/api/v1/products/${route.params.id}`
  );
  product.value = res.data;
});

</script>
