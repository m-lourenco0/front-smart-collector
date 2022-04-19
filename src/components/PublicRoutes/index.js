import { Navigate, Outlet } from "react-router-dom";

const userAuth = () => {
    const user = localStorage.getItem("user");
    
    if ((user === "logged out") || (user === null)) {
        return false;
    } else {
        return true;
    }
}

const PublicRoutes = (props) => {
    const auth = userAuth();
    
    return auth ? <Navigate to="/home"/> : <Outlet />
}

export default PublicRoutes;