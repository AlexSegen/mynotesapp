import noteServices from "@/services/note.services";
const state = {
    notes: null
};
const getters = {
 NOTES: state => {
     return state.notes;
 }
};
const mutations = {
    SET_NOTES: (state, payload) => {
        state.notes = payload;
    },
    ADD_NOTE: (state, payload) => {
        state.notes.push(payload);
    },
    REMOVE_NOTE: (state, payload) => {
        state.notes.splice(payload, 1);
    }
};
const actions = {
    GET_NOTES: async (context, payload) => {
        let { data } = await noteServices.getAll();
        context.commit("SET_NOTES", data);
      }
};

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions
  };