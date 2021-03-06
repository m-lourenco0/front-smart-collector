import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        localStorage.setItem('refresh_token', null);
        await axios.post("/login/logout", {
            withCredentials: true
        }).catch(err => {
            console.error(err);
        })
    }

    return logout;
}

export default useLogout;