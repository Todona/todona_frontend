import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://todona.stormkit.dev//api/tasks';
//const API_URL = 'http://localhost:4000/api/tasks';

class UserService {
    getAllTasks() {
        return axios.get(API_URL + '?isFinished=false', { headers: authHeader() });
    }

    getTasks(id) {
        return axios.get(API_URL + `/${id}`, { headers: authHeader() });
    }

    findByTask(task, isFinished) {
        return axios.get(API_URL + `?task=${task}&isFinished=${isFinished}`, { headers: authHeader() });
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
