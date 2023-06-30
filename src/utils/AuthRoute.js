import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const AuthRoute = ({roles}) => {

    const {auth} = useAuthContext();

    if(auth.isAuthenticated && roles.includes(auth.user?.role)) {
        // authenticated & role is fine, so render the outlet
        return <Outlet />
    }

    if(auth.isAuthenticated && !roles.includes(auth.user?.role)) {
        // authenticated but not authorized to access this page
        return <Navigate to='/unauthorized' />
    }

    return <Navigate to='/login' />
}

export default AuthRoute;

