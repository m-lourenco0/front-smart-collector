import { Navigate, Outlet } from "react-router-dom";

const userAuth = () => {
    const user = localStorage.getItem('user');
    
    if ((!user) || (user === null) || (user === 'logged out')) {
        return false;
    }
    return true;
}

const ProtectedRoutes = (props) => {

    const auth = userAuth();

    return auth ? <Outlet /> : <Navigate to="login"/>
}

export default ProtectedRoutes;