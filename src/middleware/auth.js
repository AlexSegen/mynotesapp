import HTTP from '@/services/config'
import sysMsgs from '@/helpers/sys.messages';

let RESOURCE_NAME_LOGIN = '/auth/login'

let RESOURCE_NAME_REGISTER = '/auth/register'

export default {

    login(data){
      return HTTP.post(RESOURCE_NAME_LOGIN, data)
    },
    logout(){
        localStorage.removeItem('login');
        window.location.href = env.process.VUE_APP_BASE_URL + 'login'
    },
    register(data){
        return HTTP.post(RESOURCE_NAME_REGISTER, data).then(response => {
            localStorage.setItem('login', JSON.stringify(response.data));
            window.location.href = env.process.VUE_APP_BASE_URL + 'login'
        }).catch(err => {
            if (err.response.status == 500){ 
                sysMsgs.toastMsg('error', 'Error al conectar con el servidor.');
            } else {
                sysMsgs.toastMsg('error', 'Ocurrió un error. Reintenta mas tarde.');
            }
        });
    },
    loggedIn(){
        
        let loggedIn = (localStorage.getItem("login") != null) ? true  : false

        return loggedIn;
    },
    getToken(){
        let data = '';
        if (localStorage.getItem("login") == null) {
            console.log('No token found');
          } else {
            data =  JSON.parse(localStorage.getItem('login'));
          }
        return data.token;
    },
    getUser(){
        let data = {};
        if (localStorage.getItem("login") == null) {
            data.user = {
                name: null,
                email: null
            }
          } else {
            data =  JSON.parse(localStorage.getItem('login'));
          }
        return data.user;
    }

}