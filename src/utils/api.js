import axios from "axios";
import { BASE_URL } from "./constants";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
},
    (error) => {
        return Promise.reject(error);
    })

export default api;