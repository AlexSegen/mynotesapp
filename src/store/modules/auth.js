import Vue from "vue";
import sysMsgs from '@/helpers/sys.messages.js'
import Auth from '@/middleware/auth';
import router from '@/router'

const state = {
  user: '',
  loggedIn: false,
  token: ''
};
const getters = {
  USER: state => {
    return state.user
  },
  LOGGEDIN: state => {
    return state.loggedIn
  },
  TOKEN: state => {
    return state.token
  }
};
const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  },
  SET_AUTH: (state, payload) => {
    state.loggedIn = payload;
  },
  SET_TOKEN: (state, payload) => {
    state.token = 'bearer ' + payload;
  },
  LOGOUT: (state) => {
    state.loggedIn = false;
    localStorage.removeItem('login')
    router.push({
      name: 'login'
    });
  }
};
const actions = {
  LOGIN: (context, payload) => {
    Auth.login(payload).then(response => {
      localStorage.setItem('login', JSON.stringify(response.data));
      context.commit("SET_USER", response.data.user);
      context.commit("SET_TOKEN", response.data.token);
      context.commit("SET_AUTH", true);
      router.push('/');
    }).catch(error => {
      context.commit("SET_AUTH", false);
      switch (error.response.statu) {
        case 401:
          sysMsgs.toastMsg('error', 'Datos incorrectos');  
          break;

        case 404:
          sysMsgs.toastMsg('error', 'Usuario no encontrado');
          break;

        case 500:
          sysMsgs.toastMsg('error', 'Error al conectar con el servidor.');
          break;
    
        default:
        sysMsgs.toastMsg('error', 'Ocurrió un error. Reintenta mas tarde.');
          break;
      }
    });

  },
  CHECK_AUTH: (context, payload) => {
    let session = localStorage.getItem("login");
    if (session == null) {
      context.commit("SET_AUTH", false);
    } else {
      let auth = JSON.parse(localStorage.getItem('login'));
      if (auth.auth) {
        context.commit("SET_TOKEN", auth.token);
        context.commit("SET_AUTH", true);
        context.commit("SET_USER", auth.user);
      } else {
        context.commit("SET_AUTH", false);
      }
    }
  }
};

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
};