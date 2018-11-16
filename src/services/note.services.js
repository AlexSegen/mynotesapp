import HTTP from '@/services/config'

let RESOURCE_NAME = '/notes'


export default {
    getAll() {
        try {
            return HTTP.get(RESOURCE_NAME)
        } catch (err) {
            return err
        }
    },
    get(id) {
        return HTTP.get(`${RESOURCE_NAME}/${id}`);
    },
    post(data) {
        return HTTP.post(RESOURCE_NAME, data);
    },
    put(data) {
        return HTTP.put(`${RESOURCE_NAME}/${data._id}`, data);
    },
    delete(id) {
        return HTTP.delete(`${RESOURCE_NAME}/${id}`);
    },
}