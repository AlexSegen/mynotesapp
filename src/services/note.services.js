import axios from 'axios'
let RESOURCE_NAME = '/notes'

export default {
    getAll() {
        try {
            return axios.get(RESOURCE_NAME)
        } catch (err) {
            return err
        }
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
    },
}