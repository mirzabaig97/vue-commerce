<template>
  <div class="card h-100 shadow-sm">
    <img
      v-if="product?.images?.[0]"
      :src="product.images[0]"
      class="card-img-top"
      :alt="product.title"
    />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">${{ product.price }}</p>

      <p v-if="product?.category?.name" class="text-muted">
        Category: {{ product.category.name }}
      </p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <router-link
        :to="'#'"
        class="btn btn-sm btn-outline-primary"
      >
        View
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
  showCategory: Boolean,
});
</script>
