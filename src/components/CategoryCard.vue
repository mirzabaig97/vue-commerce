<template>
  <div class="col-6 col-md-3">
    <router-link
      :to="`/products?categoryId=${category.id}&categoryName=${category.name}`"
      class="text-decoration-none text-dark"
    >
      <div class="card h-100 shadow-sm border-0">
        <img
          :src="category.image"
          :alt="category.name"
          class="card-img-top"
          @load="loaded = true"
          v-show="loaded"
        />
        <div
          v-if="!loaded"
          class="placeholder-wave card-img-top"
          style="height: 160px; background: #f0f0f0"
        ></div>
        <div class="card-body text-center">
          <h6 class="card-title text-capitalize">{{ category.name }}</h6>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
defineProps({ category: Object });
const loaded = ref(false);
</script>
