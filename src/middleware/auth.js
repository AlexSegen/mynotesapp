import router from '@/router'
import { store } from "@/store/";
import HTTP from '@/services/config'
import sysMsgs from '@/helpers/sys.messages';

let RESOURCE_NAME_LOGIN = '/auth/login'

let RESOURCE_NAME_REGISTER = '/auth/register'

export default {

     login(data){
      return  HTTP.post(RESOURCE_NAME_LOGIN, data)
    },
    logout(){
        store.commit("LOGOUT");
    },
     register(data){
        return  HTTP.post(RESOURCE_NAME_REGISTER, data).then(response => {
            localStorage.setItem('login', JSON.stringify(response.data));
            router.push({ name: ' login'})
        }).catch(err => {
            if (err.response.status == 500){ 
                sysMsgs.toastMsg('error', 'Error al conectar con el servidor.');
            } else {
                sysMsgs.toastMsg('error', 'Ocurrió un error. Reintenta mas tarde.');
            }
        });
    },
     isLoggedIn(){
        return  store.state.authState.loggedIn
    },
     getToken(){
        return  store.state.authState.token
    },
     getUser(){
        return  store.state.authState.user
    }

}