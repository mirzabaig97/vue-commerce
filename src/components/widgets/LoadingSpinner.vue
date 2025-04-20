<template>
    <div class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h3 v-if="message">{{ message }}</h3>
    </div>
  </template>
  
  <script setup>
  defineProps({
    message: {
      type: String,
      default: '',
    },
  });
  </script>
  
  <style scoped>
  /* You can add any custom styling here if needed */
  </style>