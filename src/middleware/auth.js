import axios from 'axios';
import sysMsgs from '@/helpers/sys.messages';
//let API = 'https://reqres.in/api/login'
let API = 'http://localhost:3000';

let RESOURCE_NAME_LOGIN = '/login'

let RESOURCE_NAME_REGISTER = '/register'

export default {

    login(data){
       return axios.post(API + RESOURCE_NAME_LOGIN, data).then(response => {
            localStorage.setItem('login', JSON.stringify(response.data));
            window.location.href = '/'
        }).catch(err => {
            if(err.response.status == 401) {
                sysMsgs.toastMsg('error', 'Datos incorrectos');
            } else if (err.response.status == 404){ 
                sysMsgs.toastMsg('error', 'Usuario no encontrado');
            } else if (err.response.status == 500){ 
                sysMsgs.toastMsg('error', 'Error al conectar con el servidor.');
            } else {
                sysMsgs.toastMsg('error', 'Ocurrió un error. Reintenta mas tarde.');
            }
        });
    },
    logout(){
        localStorage.removeItem('login');
        window.location.href = '/login'
    },
    register(data){
        return axios.post(API + RESOURCE_NAME_REGISTER, data).then(response => {
            localStorage.setItem('login', JSON.stringify(response.data));
            window.location.href = '/'
        }).catch(err => {
            if (err.response.status == 500){ 
                sysMsgs.toastMsg('error', 'Error al conectar con el servidor.');
            } else {
                sysMsgs.toastMsg('error', 'Ocurrió un error. Reintenta mas tarde.');
            }
        });
    },
    loggedIn(){
        let loggedIn = (localStorage.getItem("login") != null) ? true : false;
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