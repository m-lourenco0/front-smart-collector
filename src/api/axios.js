import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;


export default axios.create({
    baseURL: REACT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': REACT_APP_BASE_URL,
    }
});

export const axiosPrivate = axios.create({
    baseURL: REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': REACT_APP_BASE_URL,
    },
    withCredentials: true
});