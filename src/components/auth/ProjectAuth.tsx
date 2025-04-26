import { Navigate, Outlet } from "react-router";

const ProjectAuth = () => {
  const token = localStorage.getItem("infytoken");
  const isAdmin = localStorage.getItem("infyIsAdmin") === "Admin";

  return (token && !isAdmin) ? <Outlet /> : <Navigate to="/dashboard" replace />;;
};

export default ProjectAuth;
