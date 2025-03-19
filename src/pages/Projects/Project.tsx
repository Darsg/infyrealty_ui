import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import ProjectList from "./ProjectList";
import ComponentCardWithButton from "../../components/common/ComponentCardWithButton";
import { deleteProject, getProjectList } from "../../service/apis/AuthService";
import ProjectForm from "./Form/ProjectForm";
import { toast } from "react-toastify";
import BoxAlerts from "../UiElements/BoxAlerts";

interface Project {
  id: number;
  name: string;
  email: string;
  contact_code: string;
  contact_no: string;
  address1: string;
  address2: string | null;
  locality: string | null;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  project_type: string;
}

export default function Project() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCreateProject = () => {
    setSelectedProject(null); // Clear previous selection for new project
    setIsOpen(true);
  };

  const fetchProjects = async () => {
    try {
      const response = await getProjectList();
      if (response?.records) {
        setProjectList(response.records);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSaveProject = () => {
    setIsOpen(false);
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    
    try {
      const response = await deleteProject(projectId!);
      
      if (response.status_code === 200){
        fetchProjects();
      }

      toast(response.msg, { type: response.alert });
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const confirmDelete = (project: Project) => {
    setProjectId(project.id);
    setConfirmDialogOpen(true);
  };

  return (
    <div>
      <PageMeta title="React.js Projects" description="Projects by InfyRealty" />

      <div className="space-y-6">
        <ComponentCardWithButton title="Project List" buttonTitle="Create Project" onButtonClick={handleCreateProject}>
          <ProjectList projectList={projectList} onEdit={handleEdit} onDelete={confirmDelete} />
        </ComponentCardWithButton>
      </div>

      {/* Project Form for Create/Edit */}
      {isOpen && (
        <ProjectForm isOpen={isOpen} project={selectedProject} setIsOpen={setIsOpen} onSave={handleSaveProject} />
      )}

      {/* Confirmation Dialog for Delete */}
      <BoxAlerts
        title="Delete Project"
        description="Are you sure you want to delete this project?"
        boxType="error"
        isOpen={isConfirmDialogOpen}
        onCancel={() => setConfirmDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
