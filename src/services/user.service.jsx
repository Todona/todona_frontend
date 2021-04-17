import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://backendtodona.herokuapp.com/api/tasks';
//const API_URL = 'http://localhost:8080/api/tasks';

class UserService {
    getAllTasks() {
        return axios.get(API_URL + '?isFinished=false', { headers: authHeader() });
    }

    getTasks(id) {
        return axios.get(API_URL + `/${id}`, { headers: authHeader() });
    }

    getDoneTasks() {
        return axios.get(API_URL + '?isFinished=true', { headers: authHeader() });
    }

    createTasks(data) {
        return axios.post(API_URL, data, { headers: authHeader() });
    }

    updateTasks(id, data) {
        return axios.put(API_URL + `/${id}`, data, { headers: authHeader() });
    }

    deleteTasks(id) {
        return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
    }
}

export default new UserService();