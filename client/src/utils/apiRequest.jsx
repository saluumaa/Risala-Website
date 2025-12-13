import axios from "axios";

const apiRequest = axios.create({
    // baseURL: "https://risala-website.onrender.com/api",
    baseURL: "http://localhost:8800/api",
    withCredentials: true,
});

export default apiRequest;