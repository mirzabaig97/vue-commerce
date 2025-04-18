<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <router-link class="navbar-brand fw-bold" to="/">Vue Commerce</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navItems"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navItems">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/categories">Categories</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
  
  