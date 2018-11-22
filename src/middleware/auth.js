import { store } from "@/store/";
import HTTP from '@/services/config'

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
        return  HTTP.post(RESOURCE_NAME_REGISTER, data);
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