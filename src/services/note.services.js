import axios from 'axios'
import _ from 'underscore';
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
    put(id, data) {
        return axios.put(RESOURCE_NAME + '/' + id, data);
    },
    delete(id) {
        return axios.delete(RESOURCE_NAME + '/' + id);
    },
}