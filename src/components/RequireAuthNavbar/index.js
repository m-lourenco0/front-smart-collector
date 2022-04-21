import useAuth from "../../hooks/useAuth";

const RequireAuthNavBar = ({ allowedRoles, children }) => {
    const { auth } = useAuth();
    return (
        auth?.roles?.find(role => allowedRoles?.includes(role)) 
        ? children
        : null
    );
}

export default RequireAuthNavBar;