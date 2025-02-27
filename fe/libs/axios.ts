import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.BASE_API_URI,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    function (response) {
        //return response.data;
         return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;