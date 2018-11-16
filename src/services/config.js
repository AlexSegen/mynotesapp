import axios from 'axios';

let loggedIn = (localStorage.getItem("login") != null) ? true : false;

const axiosConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: loggedIn ?  {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('login')).token } : ''
};
let  HTTP  = axios.create(axiosConfig);
export default HTTP
