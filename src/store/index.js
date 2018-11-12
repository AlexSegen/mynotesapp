import Vue from 'vue'
import Vuex from 'vuex'
import notes from "./modules/notes";

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    notes
  }
});