import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import CategoriesPage from '../views/categories/CategoriesPage.vue';
import ProductListing from '../views/product/ProductListing.vue';
import ProductDetails from '../views/product/ProductDetails.vue';
import FavoritesPage from '../views/FavoritesPage.vue';
import NotFoundPage from '../views/NoRoute.vue';

const routes = [
    {
        path: '/', name: 'Home', component: HomePage, meta: {
            title: 'Home'
        }
    },
    {
        path: '/categories', name: 'Categories', component: CategoriesPage, meta: {
            title: 'Categories'
        }
    },
    {
        path: '/products', name: 'Products', component: ProductListing, meta: {
            title: 'Products '
        }
    },
    {
        path: '/product/:id', name: 'ProductDetails', component: ProductDetails, props: true, meta: {
            title: 'Product Detail'
        }
    },
    {
        path: '/favorites', name: 'Favorites', component: FavoritesPage, meta: {
            title: 'Favorites'
        }
    },

    {
        path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage, meta: {
            title: 'Not Found'
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, _from, next) => {
    const baseTitle = 'Vue Commerce';
    document.title = to.meta.title
        ? `${to.meta.title} | ${baseTitle}`
        : baseTitle;
    next();
});

router.afterEach(() => {
    const nav = document.querySelector('.navbar-collapse');
    if (nav && nav.classList.contains('show')) {
        nav.classList.remove('show');
        nav.style.height = null;
    }
});

export default router;
