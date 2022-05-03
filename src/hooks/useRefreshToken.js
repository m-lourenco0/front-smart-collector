import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh_token = localStorage.getItem('refresh_token');

    const refresh = async () => {
        const response = await axios.get('/login/refresh', {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        });
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.permissions,
                token: response.data.token
            }
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;