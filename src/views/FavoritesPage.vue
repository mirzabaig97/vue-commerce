<template>
  <div class="container py-4">
    <h1 class="mb-4">Your Favorites</h1>

    <div v-if="favorites.length" class="row row-cols-2 row-cols-md-4 g-4">
      <div class="col" v-for="product in favorites" :key="product.id">
        <div class="card h-100 shadow-sm">
          <img
            :src="product.images[0]"
            class="card-img-top"
            :alt="product.title"
            @load="() => (loaded[product.id] = true)"
            v-show="loaded[product.id]"
          />
          <div
            v-if="!loaded[product.id]"
            class="placeholder-wave"
            style="height: 200px; background: #eee"
          ></div>

          <div class="card-body">
            <h6 class="card-title">{{ product.title }}</h6>
            <p class="card-text">$ {{ product.price }}</p>
            <span class="badge bg-secondary text-capitalize">{{
              product.category.name
            }}</span>
          </div>

          <div
            class="card-footer d-flex justify-content-between align-items-center"
          >
            <router-link
              :to="`/product/${product.id}`"
              class="btn btn-sm btn-outline-primary"
              >View</router-link
            >
            <button
              @click="removeFavorite(product)"
              class="btn btn-sm text-warning"
            >
              ⭐
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <p class="lead">You haven't favorited anything yet.</p>
      <router-link to="/products" class="btn btn-outline-primary"
        >Browse Products</router-link
      >
    </div>
  </div>
</template>
  
  <script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();
const favorites = computed(() => store.getters.favorites);
const loaded = reactive({});

const removeFavorite = (product) => {
  store.dispatch("toggleFavorite", product);
};
</script>
  