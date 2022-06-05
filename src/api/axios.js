import axios from 'axios';

const { BASE_URL } = process.env;

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL,
    }
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL,
    },
    withCredentials: true
});