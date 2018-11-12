import categoryServices from "@/services/category.services";
const state = {
    categories: null
};
const getters = {
 CATEGORIES: state => {
     return state.categories;
 }
};
const mutations = {
    SET_CATEGORIES: (state, payload) => {
        state.categories = payload;
    },
    ADD_CATEGORY: (state, payload) => {
        state.categories.push(payload);
    },
    REMOVE_CATEGORY: (state, payload) => {
        state.categories.splice(payload, 1);
    }
};
const actions = {
    GET_CATEGORIES: async (context, payload) => {
        let { data } = await categoryServices.getAll();
        context.commit("SET_CATEGORIES", data);
      },
      DELETE_CATEGORY: async (context, payload) => {
        let { data } = await categoryServices.delete(payload.id);
        context.commit(
          "REMOVE_CATEGORY",
          state.categories.findIndex(find => find.id == payload.id)
        );
      }
};

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions
  };