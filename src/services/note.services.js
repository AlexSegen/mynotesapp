import axios from 'axios'
import _ from 'underscore';
let RESOURCE_NAME = '/notes' 

export default {
    getAll(){
        return axios.get(RESOURCE_NAME);
    },
    getUserNotes(){
        let res = axios.get(RESOURCE_NAME);
        let x = _.filter(res, function (filter) { return filter.userId == 1 });
        return x
    },
    get(id){
        return axios.get(RESOURCE_NAME + '/' + id);
    },
    post(data){
        return axios.post(RESOURCE_NAME, data);
    },
    put(id, data){
        return axios.put(RESOURCE_NAME + '/' + id, data);
    },
    delete(id){
        return axios.delete(RESOURCE_NAME + '/' + id);
    },
}