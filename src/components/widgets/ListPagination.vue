<template>
  <nav class="mt-4" v-if="total > perPage">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: page === 1 }">
        <button class="page-link" @click="emit('update:page', page - 1)">
          Previous
        </button>
      </li>

      <li class="page-item disabled">
        <span class="page-link">Page {{ page }}</span>
      </li>

      <li class="page-item" :class="{ disabled: end >= total }">
        <button class="page-link" @click="emit('update:page', page + 1)">
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>
  
  <script setup>
import { computed } from "vue";
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:page"]);

const end = computed(() => props.page * props.perPage);
</script>
  