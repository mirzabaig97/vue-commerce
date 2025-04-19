import { createStore } from 'vuex';

export default createStore({
    state: {
        favorites: JSON.parse(localStorage.getItem("favorites")) || [],
        lastVisited: JSON.parse(localStorage.getItem("lastVisited")) || [],
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
        },

        addToLastVisited(state, product) {
            state.lastVisited = [
                product,
                ...state.lastVisited.filter(p => p.id !== product.id)
            ].slice(0, 5);
            localStorage.setItem("lastVisited", JSON.stringify(state.lastVisited));
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
        },
        addToLastVisited({ commit }, product) {
            commit("addToLastVisited", product);
        }
    },

    getters: {
        favorites: (state) => state.favorites,
        lastVisited: (state) => state.lastVisited
    }
});
