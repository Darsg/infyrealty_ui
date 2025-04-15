import { Navigate, Outlet } from "react-router-dom";

const AuthRedirect = () => {
  const token = localStorage.getItem("infytoken");

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default AuthRedirect;
