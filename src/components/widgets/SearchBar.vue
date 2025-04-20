<template>
  <div>
    <input
      v-model="modelValueProxy"
      type="text"
      class="form-control"
      :placeholder="placeholder"
    />
  </div>
</template>
  
  <script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: "Search...",
  },
});

const emit = defineEmits(["update:modelValue"]);

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
  