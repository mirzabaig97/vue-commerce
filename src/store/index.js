import { createStore } from 'vuex';

export default createStore({
    state: {
        favorites: JSON.parse(localStorage.getItem("favorites")) || []
    },

    mutations: {
        addToFavorites(state, product) {
            if (!state.favorites.some(p => p.id === product.id)) {
                state.favorites.push(product);
                localStorage.setItem("favorites", JSON.stringify(state.favorites));
            }
        },

        removeFromFavorites(state, productId) {
            const index = state.favorites.findIndex(p => p.id === productId);
            if (index !== -1) {
                state.favorites.splice(index, 1);
                localStorage.setItem("favorites", JSON.stringify(state.favorites));
            }
        }
    },

    actions: {
        addToFavorites({ commit }, product) {
            commit("addToFavorites", product);
        },
        removeFromFavorites({ commit }, productId) {
            commit("removeFromFavorites", productId);
        },
        toggleFavorite({ state, dispatch }, product) {
            const isFav = state.favorites.some((p) => p.id === product.id);
            if (isFav) {
                dispatch("removeFromFavorites", product.id);
            } else {
                dispatch("addToFavorites", product);
            }
        }
    },

    getters: {
        favorites: (state) => state.favorites
    }
});
