import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to="/auth/login" />;
    }

    if (isAuthenticated) {
        if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
            if (user?.role === 'admin') {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/shop/home" />;
            }
        }

        if (user?.role !== 'admin' && location.pathname.includes('/admin')) {
            return <Navigate to="/un-authPage" />;
        }
        if (!isAuthenticated || !user) {

            if (!(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
                return <Navigate to="/auth/login" />;
            }
        }
        

        if (user?.role === 'admin' && location.pathname.includes('/shop')) {
            return <Navigate to="/admin/dashboard" />;
        }
    }

    return <>{children}</>;
}

export default CheckAuth;
