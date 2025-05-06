import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function SelectOrganization() {
  const navigate = useNavigate();

  useEffect(() => {

    const isAdmin = localStorage.getItem("infyIsAdmin") === "Admin";

    if (isAdmin) {
      const lastPage = localStorage.getItem("infyLastPage") || "/dashboard";
      navigate(lastPage, { replace: true });
    } else {
      localStorage.removeItem("infyToken");
      localStorage.removeItem("infyRoleId");
      navigate("/select-project", { replace: true });
    }
  }, [navigate]);

  return null;
}
