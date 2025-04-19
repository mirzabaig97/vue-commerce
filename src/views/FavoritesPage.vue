<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center full-pill-heading">Your Favorites</h1>

    <div class="text-end mb-3" v-if="favorites.length">
      <button @click="removeAllFavorites" class="btn btn-sm btn-danger">
        Remove All Favorites
      </button>
    </div>

    <div v-if="favorites.length" class="table-responsive">
      <table
        class="table align-middle"
        :class="darkModeEnabled ? 'table-light' : 'table-dark'"
      >
        <thead class="table-dark">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col" style="width: 150px">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in favorites" :key="product.id">
            <td style="width: 100px">
              <img
                :src="getProductImage(product)"
                :alt="product.title"
                class="img-fluid rounded"
                style="max-height: 60px; object-fit: cover"
                @load="() => (loaded[product.id] = true)"
                v-show="loaded[product.id]"
              />
              <div
                v-if="!loaded[product.id]"
                class="placeholder-wave bg-light"
                style="height: 60px; width: 100px"
              ></div>
            </td>
            <td>
              <router-link :to="`/product/${product.id}`">
                {{ product.title }}
              </router-link>
            </td>
            <td>{{ product.category?.name || "N/A" }}</td>
            <td>${{ product.price }}</td>
            <td>
              <div class="d-flex gap-2">
                <button
                  @click="removeFavorite(product)"
                  class="btn btn-sm btn-outline-secondary"
                >
                  Remove
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-5">
      <p class="lead">You haven't favorited anything yet.</p>
      <router-link to="/products" class="btn btn-outline-primary">
        Browse Products
      </router-link>
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

const removeAllFavorites = () => {
  store.dispatch("clearFavorites");
};

const darkModeEnabled = computed(() => !store.getters.darkMode);

const isValidImage = (url) => /\.(jpe?g|png|svg)$/i.test(url);
const getProductImage = (product) => {
  const img = product?.images?.[0];
  return img && isValidImage(img)
    ? img
    : "https://via.placeholder.com/80x60?text=No+Image";
};
</script>

<style scoped>
.full-pill-heading {
  font-weight: 600;
  display: inline-block;
  padding-bottom: 0.5rem;
}
</style>
