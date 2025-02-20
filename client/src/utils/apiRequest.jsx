import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://risala-website.onrender.com/api",
    withCredentials: true,
});

export default apiRequest;