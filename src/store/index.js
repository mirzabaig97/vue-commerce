import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state = {
    categories: JSON.parse(localStorage.getItem('categoriesWithProducts')) || [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    lastVisited: JSON.parse(localStorage.getItem('lastVisited')) || [],
    darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
};

export default createStore({
    state,
    mutations,
    actions,
    getters,
});
