export default {
    categories: (state) => state.categories,
    allProducts: (state) =>
        state.categories.flatMap((cat) => cat.products || []),
    getProductById: (state) => (id) =>
        state.categories
            .flatMap((c) => c.products || [])
            .find((p) => p.id === Number(id)),
    favorites: (state) => state.favorites,
    lastVisited: (state) => state.lastVisited,
    darkMode: (state) => state.darkMode,
};
