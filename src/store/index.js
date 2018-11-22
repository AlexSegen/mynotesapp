import Vue from 'vue'
import Vuex from 'vuex'
import authState from "./modules/auth";
import notes from "./modules/notes";
import categories from "./modules/categories";

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    notes,
    categories,
    authState
  }
});