export default {
    setCategories(state, categories) {
        state.categories = categories;
        localStorage.setItem('categoriesWithProducts', JSON.stringify(categories));
    },
    addToFavorites(state, product) {
        if (!state.favorites.some((p) => p.id === product.id)) {
            state.favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        }
    },
    removeFromFavorites(state, productId) {
        state.favorites = state.favorites.filter((p) => p.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    addToLastVisited(state, product) {
        state.lastVisited = [
            product,
            ...state.lastVisited.filter((p) => p.id !== product.id),
        ].slice(0, 5);
        localStorage.setItem('lastVisited', JSON.stringify(state.lastVisited));
    },
    clearFavorites(state) {
        state.favorites = [];
        localStorage.setItem('favorites', JSON.stringify([]));
    },
    setDarkMode(state, isDark) {
        state.darkMode = isDark;
        localStorage.setItem('darkMode', JSON.stringify(isDark));
        document.body.classList.toggle('dark-mode', isDark); 
    },
};
