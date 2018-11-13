import axios from 'axios'
let RESOURCE_NAME = '/categories'

export default {
    getAll() {
        return axios.get(RESOURCE_NAME);
    },
    get(id) {
        return axios.get(RESOURCE_NAME + '/' + id);
    },
    post(data) {
        return axios.post(RESOURCE_NAME, data);
    },
    put(data) {
        return axios.put(RESOURCE_NAME + '/' + data.id, data);
    },
    delete(id) {
        return axios.delete(RESOURCE_NAME + '/' + id);
    }
}