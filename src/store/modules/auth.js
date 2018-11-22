import Vue from "vue";
import sysMsgs from '@/helpers/sys.messages.js' 
import Auth from '@/middleware/auth';
import router from '@/router'

const state = {
    user: '',
    loggedIn: false
};
const getters = {
    USER: state => {
        return state.user
    },
    LOGGEDIN: state => {
        return state.loggedIn
    }
};
const mutations = {
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    SET_AUTH: (state, payload) => {
      state.loggedIn = payload;
    },
    LOGOUT: (state) => {
        state.loggedIn = false;
        localStorage.removeItem('login')
        router.push({ name: 'login'});
    }
};
const actions = {
    LOGIN: (context, payload) => {
        Auth.login(payload).then(response => {
            localStorage.setItem('login', JSON.stringify(response.data));
            context.commit("SET_USER", response.data.user);
            context.commit("SET_AUTH", true);
            router.push('/');
            //window.location.href = '/'
        }).catch(error => {
            context.commit("SET_AUTH", false);
            if(error.response.status == 401) {
                sysMsgs.toastMsg('error', 'Datos incorrectos');
            } else if (error.response.status == 404){ 
                sysMsgs.toastMsg('error', 'Usuario no encontrado');
            } else if (error.response.status == 500){ 
                sysMsgs.toastMsg('error', 'Error al conectar con el servidor.');
            } else {
                sysMsgs.toastMsg('error', 'Ocurrió un error. Reintenta mas tarde.');
            }
        });
        
    },
    CHECK_AUTH: (context, payload) => {
      let session = localStorage.getItem("login");
      if(session == null) {
        context.commit("SET_AUTH", false);
      } else {
        let auth = JSON.parse(localStorage.getItem('login'));
        if(auth.auth){
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
  