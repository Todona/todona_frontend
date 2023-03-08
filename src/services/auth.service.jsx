import axios from "axios";
import authHeader from './auth-header';

const API_URL = 'https://todona-api.radsdorn.studio/api/auth/';
//const API_URL = 'http://localhost:4000/api/auth/';

class AuthService {
    login(username, password) {
        console.log(API_URL)
        return axios.post(API_URL + 'signin', {
            username, 
            password
        }, { headers: authHeader() })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        }, { headers: authHeader() });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
