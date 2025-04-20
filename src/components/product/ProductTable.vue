<template>
  <div class="table-responsive">
    <table
      class="table align-middle table-hover"
      :class="darkModeEnabled ? 'table-light' : 'table-dark'"
    >
      <thead class="table-dark">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Price</th>
          <th scope="col" class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
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
          <td class="text-center">
            <slot name="actions" :product="product">
              <button class="btn btn-sm btn-outline-primary">View</button>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script setup>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

defineProps({
  products: Array,
});

const store = useStore();
const darkModeEnabled = computed(() => !store.getters.darkMode);
const loaded = reactive({});

const isValidImage = (url) => /\.(jpe?g|png|svg)$/i.test(url);
const getProductImage = (product) => {
  const img = product?.images?.[0];
  return img && isValidImage(img)
    ? img
    : "https://via.placeholder.com/80x60?text=No+Image";
};
</script>
  