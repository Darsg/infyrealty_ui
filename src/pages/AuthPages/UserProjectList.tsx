import { useEffect, useState } from "react";
import { getAssignProjectList } from "../../service/apis/AuthService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ChevronLeftIcon } from "../../icons";
import { useNavigate } from "react-router";

export interface UserProjectListProps {
  name: string;
  email: string;
  contact_code: string;
  contact_no: string;
  telephone_no: string | null;
  address1: string;
  address2: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  status: string | null;
  description: string | null;
  project_type: string;
  type: string;
  role_id: number;
}

export default function UserProjectList() {
  const [projects, setProjects] = useState<UserProjectListProps[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchAssignProjectList = async () => {
    try {
      const response = await getAssignProjectList();
      if (response.status_code === 200) {
        setProjects(response.records);
      } else {
        toast.error("Project not found");
      }
    } catch (error) {
      toast.error("Failed to fetch projects");
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchAssignProjectList();
  }, []);

  const handleProjectClick = (projectId: number, roleId: number) => {
    setSelectedProjectId(projectId);
    localStorage.setItem("infyProjectId", projectId.toString());
    localStorage.setItem("infyRoleId", roleId.toString());
    navigate("/dashboard", { replace: true });
  };

  const handleBackClick = () => {
    localStorage.removeItem("infytoken");
    localStorage.removeItem("infyIsAdmin");
    localStorage.removeItem("infyRoleId");
    localStorage.removeItem("infyProjectId");
    window.location.href = "/signin";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative px-4">
      <ToastContainer />

      {/* Top right Back Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Back to home
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Select Your Project</h1>

      <div className="w-full max-w-md space-y-4">
        {projects.map((project) => (
          <div
            key={project.role_id}
            onClick={() => handleProjectClick(project.role_id, project.role_id)}
            className={`p-4 rounded-xl shadow-md text-center cursor-pointer font-semibold transition-all duration-300 
              ${
                selectedProjectId === project.role_id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-800 hover:bg-indigo-50"
              }`}
          >
            {project.name}
          </div>
        ))}
      </div>
    </div>
  );
}
