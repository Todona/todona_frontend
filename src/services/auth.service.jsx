import axios from "axios";

//const API_URL = 'https://backendtodona.herokuapp.com/api/auth/';
const API_URL = 'http://localhost:4000/api/auth/';

class AuthService {
    login(username, password) {
        console.log(API_URL)
        return axios.post(API_URL + 'signin', {
            username, 
            password
        })
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
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();