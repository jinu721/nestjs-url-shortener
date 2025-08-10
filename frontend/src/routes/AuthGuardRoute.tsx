import { Navigate, Outlet } from "react-router-dom";

const AuthGuardRoute = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken"); 

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthGuardRoute;
