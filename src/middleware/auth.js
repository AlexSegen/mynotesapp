import axios from 'axios';
import sysMsgs from '@/helpers/sys.messages';
//let API = 'https://reqres.in/api/login'
let API = 'http://localhost:5000/login';
export default {

    login(data){
       return axios.post(API, data).then(response => {
            localStorage.setItem('login', JSON.stringify(response.data));
            localStorage.setItem('user', JSON.stringify(data.email));
            window.location.href = '/'
        }).catch(err => {
            sysMsgs.toastMsg('error', 'Error. Intenta de nuevo.')
        });
    },
    logout(){
        localStorage.removeItem('login');
        localStorage.removeItem('user');
        window.location.href = '/login'
    },
    loggedIn(){
        let loggedIn = (localStorage.getItem("login") != null) ? true : false;
        return loggedIn;
    },
    getToken(){
        let user = {};
        if (localStorage.getItem("login") == null) {
            console.log('No token found');
          } else {
            token =  JSON.parse(localStorage.getItem('login'));
          }
        return token;
    },
    getUser(){
        let user = {};
        if (localStorage.getItem("user") == null) {
            user = {
                email: null
            }
          } else {
            user =  JSON.parse(localStorage.getItem('user'));
          }
        return user;
    }

}