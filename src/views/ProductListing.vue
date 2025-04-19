<template>
  <div class="container py-4">
    <h1 class="mb-3">
      Products <span v-if="categoryName">in "{{ categoryName }}"</span>
    </h1>

    <div class="row mb-3" v-if="!isLoading && allProducts.length">
      <div class="col-md-6">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search products..."
        />
      </div>
      <div class="col-md-6 text-md-end mt-2 mt-md-0">
        <select class="form-select w-auto d-inline" v-model="sortBy">
          <option value="">Sort</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>
      </div>
    </div>

    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h3>Loading...</h3>
    </div>

    <div v-else-if="!allProducts.length" class="text-center py-5">
      <p class="lead">There are no products in this category.</p>
      <router-link to="/categories" class="btn btn-outline-primary">
        Back to Categories
      </router-link>
    </div>

    <div
      v-else-if="filteredProducts.length === 0 && searchQuery"
      class="text-center py-5"
    >
      <p class="lead">No results found for "{{ searchQuery }}".</p>
    </div>

    <div v-else>
      <div class="table-responsive">
        <table class="table table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in paginatedProducts" :key="product.id">
              <td style="width: 100px">
                <img
                  :src="getProductImage(product)"
                  :alt="product.title"
                  class="img-fluid rounded"
                  style="max-height: 60px; object-fit: cover"
                />
              </td>
              <td>
                <router-link :to="`/product/${product.id}`" class="me-2">
                  {{ product.title }}
                </router-link>
              </td>
              <td>{{ product.category?.name || "N/A" }}</td>
              <td>${{ product.price }}</td>
              <td>
                <button
                  class="btn btn-sm"
                  :class="
                    isFavorite(product.id)
                      ? 'btn-outline-secondary'
                      : 'btn-outline-warning'
                  "
                  @click="toggleFavorite(product)"
                >
                  {{ isFavorite(product.id) ? "Remove favorite" : "⭐" }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav class="mt-4" v-if="filteredProducts.length > perPage">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: page === 1 }">
            <button class="page-link" @click="page--">Previous</button>
          </li>
          <li class="page-item disabled">
            <span class="page-link">Page {{ page }}</span>
          </li>
          <li
            class="page-item"
            :class="{ disabled: end >= filteredProducts.length }"
          >
            <button class="page-link" @click="page++">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const searchQuery = ref("");
const sortBy = ref("");
const page = ref(1);
const perPage = 8;

const categoryId = ref(route.query.categoryId || "");
const categoryName = ref(route.query.categoryName || "");

const allProducts = computed(() => {
  if (categoryId.value) {
    const category = store.getters.categories.find(
      (c) => c.id == categoryId.value
    );
    return category?.products || [];
  }
  return store.getters.allProducts;
});

const filteredProducts = computed(() => {
  let result = allProducts.value.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  switch (sortBy.value) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  return result;
});

watch(
  () => route.query.categoryId,
  (newId) => {
    categoryId.value = newId;
    categoryName.value = route.query.categoryName || "";
    page.value = 1;
  }
);

const start = computed(() => (page.value - 1) * perPage);
const end = computed(() => start.value + perPage);
const paginatedProducts = computed(() =>
  filteredProducts.value.slice(start.value, end.value)
);

const isLoading = computed(() => !store.getters.categories.length);

const isFavorite = (id) => store.getters.favorites.some((p) => p.id === id);
const toggleFavorite = (product) => {
  store.dispatch("toggleFavorite", product);
};

const isValidImage = (url) => {
  return /\.(jpg|jpeg|png|svg)$/i.test(url);
};

const getProductImage = (product) => {
  const img = product?.images?.[0];
  if (img && isValidImage(img)) {
    return img;
  } else {
    return "https://via.placeholder.com/80x60?text=No+Image";
  }
};
</script>
