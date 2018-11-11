import axios from 'axios'
let RESOURCE_NAME = '/categories' 

export default {
    getAll(){
        return axios.get(RESOURCE_NAME);
    }
}