import axios from 'axios';
const BASE_URL = 'https://smart-collector.herokuapp.com';

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://smart-collector.herokuapp.com',
    }
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://smart-collector.herokuapp.com',
    },
    withCredentials: true
});