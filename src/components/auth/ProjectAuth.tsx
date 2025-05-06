import { Navigate, Outlet } from "react-router";

const ProjectAuth = () => {
  const token = localStorage.getItem("infytoken");
  const rawRoleId = localStorage.getItem("infyRoleId");
  const roleId = rawRoleId !== "undefined" ? rawRoleId : null;
  const isAdmin = localStorage.getItem("infyIsAdmin") === "Admin";

  return (token && !isAdmin && roleId === null) ? <Outlet /> : <Navigate to="/dashboard" replace />;;
};

export default ProjectAuth;
