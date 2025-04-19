<template>
  <div class="card h-100 shadow-sm">
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

      <p v-if="showCategory && product?.category?.name" class="text-muted">
        Category: {{ product.category.name }}
      </p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <router-link
        :to="`/product/${product.id}`"
        class="btn btn-sm btn-outline-primary"
      >
        View
      </router-link>
      <button @click="toggleFavorite" class="btn btn-sm">
        <span :class="isFavorite ? 'text-warning' : 'text-secondary'">⭐</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  product: Object,
  showCategory: Boolean,
});

const store = useStore();

const isFavorite = computed(() =>
  store.getters.favorites.some((fav) => fav.id === props.product.id)
);

function toggleFavorite() {
  store.dispatch("toggleFavorite", props.product);
}
</script>
