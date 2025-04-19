<template>
  <div class="container py-4" v-if="product">
    <div class="row">
      <div class="col-md-5">
        <img
          :src="product.images[0]"
          alt="product.title"
          class="img-fluid shadow"
          @load="loaded = true"
          v-show="loaded"
        />
        <div
          v-if="!loaded"
          class="placeholder-wave"
          style="height: 300px; background: #f0f0f0"
        ></div>
      </div>
      <div class="col-md-7">
        <h2>{{ product.title }}</h2>
        <h4 class="text-muted mb-3">$ {{ product.price }}</h4>
        <p class="mb-3">{{ product.description }}</p>
        <span class="badge bg-secondary text-capitalize">{{
          product.category.name
        }}</span>
        <div class="mt-4" v-if="!isFavorited">
          <button class="btn btn-outline-warning" @click="toggleFavorite">
            <span class="text-secondary">⭐</span>
            Favorite
          </button>
        </div>
        <div class="mt-4" v-else>
          <button class="btn btn-outline-secondary" @click="toggleFavorite">
            <span class="text-secondary">Remove From Favorite</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
const loaded = ref(false);

const product = computed(() => store.getters.getProductById(route.params.id));

onMounted(() => {
  if (product.value) {
    store.dispatch("addToLastVisited", product.value);
  }
});

const isFavorited = computed(() =>
  store.getters.favorites.some((p) => p.id === product.value?.id)
);

function toggleFavorite() {
  store.dispatch("toggleFavorite", product.value);
}
</script>

