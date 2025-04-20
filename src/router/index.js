import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import CategoriesPage from '../views/CategoriesPage.vue';
import ProductListing from '../views/ProductListing.vue';
import ProductDetails from '../views/ProductDetails.vue';
import FavoritesPage from '../views/FavoritesPage.vue';
import NotFoundPage from '../views/NoRoute.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/categories', name: 'Categories', component: CategoriesPage },
    { path: '/products', name: 'Products', component: ProductListing },
    { path: '/product/:id', name: 'ProductDetails', component: ProductDetails, props: true },
    { path: '/favorites', name: 'Favorites', component: FavoritesPage },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.afterEach(() => {
    const nav = document.querySelector('.navbar-collapse');
    if (nav && nav.classList.contains('show')) {
        nav.classList.remove('show');
        nav.style.height = null;
    }
});

export default router;
