import sysMsg from '@/helpers/sys.messages.js' 
import categoryServices from "@/services/category.services";
const state = {
  categories: null,
  category: {
    id: "" || 0,
    title: "" || "Sin categoría",
    icon: "" || "http://placehold.it/64x64",
    created_at: ""
  }
};
const getters = {
  CATEGORIES: state => {
    return state.categories;
  },
  CATEGORY: state => {
    return state.category;
  }
};
const mutations = {
  SET_CATEGORIES: (state, payload) => {
    state.categories = payload;
  },
  SET_CATEGORY: (state, payload) => {
    state.category = payload;
  },
  ADD_CATEGORY: (state, payload) => {
    state.categories.push(payload);
  },
  UPDATE_CATEGORY: (state, payload) => {
    let objIndex = state.categories.findIndex(find => find._id == payload._id);
    state.categories[objIndex] = payload;
  },
  REMOVE_CATEGORY: (state, payload) => {
    let objIndex = state.categories.findIndex(find => find._id == payload._id);
    state.categories.splice(objIndex, 1);
  }
};
const actions = {
  GET_CATEGORIES: async (context, payload) => {
    return await categoryServices.getAll().then(response => {
      context.commit("SET_CATEGORIES", response.data);
    });
    
  },
  GET_CATEGORY: async (context, payload) => {
    return await categoryServices.get(payload).then(response => {
      context.commit("SET_CATEGORY", response.data);
    })
  },
  SAVE_CATEGORY: async (context, payload) => {
    return await categoryServices.post(payload).then(response => {
        sysMsg.toastMsg('success', 'Categoría agregada');
        context.commit("ADD_CATEGORY", payload);
    });
  },
  PUT_CATEGORY: async (context, payload) => {
    return await categoryServices.put(payload).then(response => {
        context.commit("UPDATE_CATEGORY", payload);
        sysMsg.toastMsg('success', 'Categoría actualizada.');
    });
  },
  DELETE_CATEGORY: async (context, payload) => {
    return await categoryServices.delete(payload._id).then(response => {
        context.commit(
            "REMOVE_CATEGORY", payload
        );
    });
  }
};

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
};
