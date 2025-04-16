import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/categories', name: 'Categories', component: null },
    { path: '/products', name: 'Products', component: null },
    { path: '/product/:id', name: 'ProductDetails', component: null },
    { path: '/:no-route(.*)', name: 'no-route', component: null }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
