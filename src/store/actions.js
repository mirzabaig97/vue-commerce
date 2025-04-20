import axios from 'axios';

export default {
    async initCategoriesAndProducts({ commit, state }) {
        try {
            const res = await axios.get("https://api.escuelajs.co/api/v1/categories?offset=0&limit=20");

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
                commit('setCategories', freshCategories);
                console.log("Categories updated from API.");
            } else {
                console.log("Categories up-to-date.");
            }
        } catch (error) {
            console.error("Failed to fetch categories with products", error);
        }
    },
    addToFavorites({ commit }, product) {
        commit('addToFavorites', product);
    },
    removeFromFavorites({ commit }, productId) {
        commit('removeFromFavorites', productId);
    },
    addToLastVisited({ commit }, product) {
        commit('addToLastVisited', product);
    },
    toggleFavorite({ state, dispatch }, product) {
        const isFav = state.favorites.some((p) => p.id === product.id);
        if (isFav) dispatch('removeFromFavorites', product.id);
        else dispatch('addToFavorites', product);
    },
    clearFavorites({ commit }) {
        commit('clearFavorites');
    },
    toggleDarkMode({ commit, state }) {
        commit('setDarkMode', !state.darkMode);
    },
    initializeDarkMode({ commit }) {
        const saved = JSON.parse(localStorage.getItem('darkMode'));
        if (saved) commit('setDarkMode', saved);
    },
};
