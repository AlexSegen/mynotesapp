import sysMsg from '@/helpers/sys.messages.js' 
import noteServices from "@/services/note.services";
const state = {
    notes: null,
    note: {
        title:'',
        createdAt: ''
    }
};
const getters = {
    NOTES: state => {
        return state.notes;
    },
    NOTE: state => {
        return state.note;
    }
};
const mutations = {
    SET_NOTES: (state, payload) => {
        state.notes = payload;
    },
    SET_NOTE: (state, payload) => {
        state.note = payload;
    },
    ADD_NOTE: (state, payload) => {
        state.notes.push(payload);
    },
    UPDATE_NOTE: (state, payload) => {
        let objIndex = state.notes.findIndex(find => find._id == payload._id);
        state.notes[objIndex] = payload;
    },
    REMOVE_NOTE: (state, payload) => {
        let objIndex = state.notes.findIndex(find => find._id == payload._id);
        state.notes.splice(objIndex, 1);
    }
};
const actions = {
    GET_NOTES: async (context, payload) => {
      return await noteServices.getAll().then(response => {
        context.commit("SET_NOTES", response.data);
      })
    },
    GET_NOTE: async (context, payload) => {
       let { data } = await noteServices.get(payload)
       context.commit("SET_NOTE", data);
    },
    SAVE_NOTE: async (context, payload) => {
      return await noteServices.post(payload).then(response => {
          sysMsg.toastMsg('success', 'Nota agregada');
          context.commit("ADD_NOTE", payload);
      });
    },
    PUT_NOTE: async (context, payload) => {
      return await noteServices.put(payload).then(() => {
          context.commit("UPDATE_NOTE", payload);
          sysMsg.toastMsg('success', 'Nota actualizada.');
      });
    },
    DELETE_NOTE: async (context, payload) => {
      return await noteServices.delete(payload._id).then(() => {
          context.commit(
              "REMOVE_NOTE", payload
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