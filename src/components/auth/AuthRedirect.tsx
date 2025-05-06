import { Navigate, Outlet } from "react-router-dom";

const AuthRedirect = () => {
  const token = localStorage.getItem("infytoken");
  const rawRoleId = localStorage.getItem("infyRoleId");
  const roleId = rawRoleId !== "undefined" ? rawRoleId : null;
  const isAdmin = localStorage.getItem("infyIsAdmin") === "Admin";

  if (token && isAdmin) {
    return <Navigate to="/dashboard" replace />;
  } else if (token && !isAdmin && roleId && roleId !== "undefined") {
    return <Navigate to="/dashboard" replace />;
  } else if(token && !isAdmin && roleId === null) {
    return <Navigate to="/select-project" replace />;
  } else {
    return <Outlet />;
  }
};

export default AuthRedirect;
