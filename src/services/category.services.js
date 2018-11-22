import HTTP from '@/services/config'

let RESOURCE_NAME = '/categories'
export default {
    checkToken(){
        let session = localStorage.getItem("login");
        HTTP.defaults.headers.common['Authorization'] = 'bearer ' + (session != null ? JSON.parse(session).token : false)
    },
    getAll() {
        this.checkToken();
        return HTTP.get(RESOURCE_NAME);
    },
    get(id) {
        this.checkToken();
        return HTTP.get(`${RESOURCE_NAME}/${id}`);
    },
    post(data) {
        this.checkToken();
        return HTTP.post(RESOURCE_NAME, data);
    },
    put(data) {
        this.checkToken();
        return HTTP.put(`${RESOURCE_NAME}/${data._id}`, data);
    },
    delete(id) {
        this.checkToken();
        return HTTP.delete(`${RESOURCE_NAME}/${id}`);
    }
}