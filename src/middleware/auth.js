import axios from 'axios';
let API = 'https://reqres.in/api/login'
export default {

    login(data){
       return axios.post(API, data).then(response => {
            localStorage.setItem('login', JSON.stringify(response.data));
        });
    },
    logout(){
        localStorage.removeItem('login');
        window.location.href = '/login'
    },
    getUser(){
        let user = localStorage.getItem('login');
        return user;
    }

}