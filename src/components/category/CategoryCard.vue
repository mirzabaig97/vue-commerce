<template>
  <div class="col-6 col-md-3 d-flex align-items-stretch">
    <router-link
      :to="`/products?categoryId=${category.id}&categoryName=${category.name}`"
      class="text-decoration-none text-dark w-100"
    >
      <div class="card shadow-sm border-0 h-100 d-flex flex-column">
        <div class="ratio ratio-4x3 bg-light">
          <img
            :src="category.image"
            :alt="category.name"
            class="card-img-top object-fit-cover"
            @load="loaded = true"
            v-show="loaded"
          />
          <div
            v-if="!loaded"
            class="placeholder-wave"
            style="height: 100%; width: 100%; background-color: #f0f0f0"
          ></div>
        </div>
        <div class="card-body text-center mt-auto">
          <h6 class="card-title text-capitalize mb-0">{{ category.name }}</h6>
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

<style scoped>
.object-fit-cover {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
