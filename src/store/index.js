import { createStore } from "vuex";
import axios from "axios";

const LOCAL_STORAGE_KEY = "categoriesWithProducts";
const DARK_MODE_KEY = 'darkMode';

export default createStore({
    state: {
        categories: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
        favorites: JSON.parse(localStorage.getItem("favorites")) || [],
        lastVisited: JSON.parse(localStorage.getItem("lastVisited")) || [],
        lastVisited: JSON.parse(localStorage.getItem("lastVisited")) || [],
        darkMode: JSON.parse(localStorage.getItem(DARK_MODE_KEY)) || false,
    },

    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
        },
        addToFavorites(state, product) {
            if (!state.favorites.some((p) => p.id === product.id)) {
                state.favorites.push(product);
                localStorage.setItem("favorites", JSON.stringify(state.favorites));
            }
        },
        removeFromFavorites(state, productId) {
            state.favorites = state.favorites.filter((p) => p.id !== productId);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        addToLastVisited(state, product) {
            state.lastVisited = [
                product,
                ...state.lastVisited.filter((p) => p.id !== product.id),
            ].slice(0, 5);
            localStorage.setItem("lastVisited", JSON.stringify(state.lastVisited));
        },
        clearFavorites(state) {
            state.favorites = [];
            localStorage.setItem("favorites", JSON.stringify([]));
        },
        setDarkMode(state, isDark) {
            state.darkMode = isDark;
            localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
            document.body.classList.toggle('dark-mode', isDark); 
        },
    },

    actions: {
        fetchCategories({ dispatch }) {
            return dispatch("initCategoriesAndProducts");
        },

        async initCategoriesAndProducts({ commit, state }) {
            try {
                const res = await axios.get(
                    "https://api.escuelajs.co/api/v1/categories?offset=0&limit=20"
                );

                const freshCategories = await Promise.all(
                    res.data.map(async (category) => {
                        const productsRes = await axios.get(
                            `https://api.escuelajs.co/api/v1/categories/${category.id}/products`
                        );
                        return {
                            ...category,
                            products: productsRes.data,
                        };
                    })
                );

                const existing = JSON.stringify(state.categories);
                const incoming = JSON.stringify(freshCategories);

                if (existing !== incoming) {
                    commit("setCategories", freshCategories);
                    console.log("Categories updated from API.");
                } else {
                    console.log("categories up-to-date.");
                }
            } catch (error) {
                console.error("Failed to fetch categories with products", error);
            }
        },

        addToFavorites({ commit }, product) {
            commit("addToFavorites", product);
        },
        removeFromFavorites({ commit }, productId) {
            commit("removeFromFavorites", productId);
        },
        addToLastVisited({ commit }, product) {
            commit("addToLastVisited", product);
        },
        toggleFavorite({ state, dispatch }, product) {
            const isFav = state.favorites.some((p) => p.id === product.id);
            if (isFav) dispatch("removeFromFavorites", product.id);
            else dispatch("addToFavorites", product);
        },
        clearFavorites({ commit }) {
            commit("clearFavorites");
        },

        toggleDarkMode({ commit, state }) {
            commit('setDarkMode', !state.darkMode);
        },

        initializeDarkMode({ commit }) {
            const saved = JSON.parse(localStorage.getItem(DARK_MODE_KEY));
            if (saved) commit('setDarkMode', saved);
        },
    },

    getters: {
        categories: (state) => state.categories,
        allProducts: (state) =>
            state.categories.flatMap((cat) => cat.products || []),
        getProductById: (state) => (id) =>
            state.categories
                .flatMap((c) => c.products || [])
                .find((p) => p.id === Number(id)),
        favorites: (state) => state.favorites,
        lastVisited: (state) => state.lastVisited,
        darkMode: (state) => state.darkMode
    },
});
