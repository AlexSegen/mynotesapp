import axios from 'axios';

let loggedIn = (localStorage.getItem("login") != null) ? true : false;

var secret = 'Bearer ' + JSON.parse(localStorage.getItem('login')).token ;

const axiosConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {'Authorization': loggedIn ? secret : ''}
};
let  HTTP  = axios.create(axiosConfig);
export default HTTP
