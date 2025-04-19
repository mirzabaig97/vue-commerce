import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        favorites: JSON.parse(localStorage.getItem("favorites")) || [],
        lastVisited: JSON.parse(localStorage.getItem("lastVisited")) || [],
        categories: [],
    },

    mutations: {
        addToFavorites(state, product) {
            if (!state.favorites.some(p => p.id === product.id)) {
                state.favorites.push(product);
                localStorage.setItem("favorites", JSON.stringify(state.favorites));
            }
        },

        removeFromFavorites(state, productId) {
            state.favorites = state.favorites.filter(p => p.id !== productId);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },

        addToLastVisited(state, product) {
            state.lastVisited = [
                product,
                ...state.lastVisited.filter(p => p.id !== product.id)
            ].slice(0, 5);
            localStorage.setItem("lastVisited", JSON.stringify(state.lastVisited));
        },

        setCategories(state, categories) {
            state.categories = categories;
        },
    },

    actions: {
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
            const isFav = state.favorites.some(p => p.id === product.id);
            if (isFav) {
                dispatch("removeFromFavorites", product.id);
            } else {
                dispatch("addToFavorites", product);
            }
        },
        
        async fetchCategories({ state, commit }) {
            if (state.categories.length === 0) {
                const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
                commit("setCategories", res.data);
            }
        },
    },

    getters: {
        favorites: state => state.favorites,
        lastVisited: state => state.lastVisited,
        categories: state => state.categories,
    },
});
