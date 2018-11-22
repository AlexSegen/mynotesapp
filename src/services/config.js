import axios from 'axios';

const axiosConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 5000
};
let HTTP = axios.create(axiosConfig);

export default HTTP
