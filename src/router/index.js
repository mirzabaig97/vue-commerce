import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import CategoriesPage from '../views/CategoriesPage.vue';
import ProductListing from '../views/ProductListing.vue';
import ProductDetails from '../views/ProductDetails.vue';
import FavoritesPage from '../views/FavoritesPage.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/categories', name: 'Categories', component: CategoriesPage },
    { path: '/products', name: 'Products', component: ProductListing },
    { path: '/product/:id', name: 'ProductDetails', component: ProductDetails, props: true },
    { path: '/favorites', name: 'Favorites', component: FavoritesPage }
    // { path: '/:no-route(.*)', name: 'no-route', component: null }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
