import ProjectListModel from "./ProjectListModel";

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

interface ProjectListProps {
  projectList: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: Project) => void;
}

export default function ProjectList({ projectList, onEdit, onDelete }: ProjectListProps) {

  if (projectList.length === 0) {
    return (
      <h1 className="text-center text-gray-500 dark:text-gray-400 py-6">
        No projects found
      </h1>
    );
  }

  return (
    <div className="space-y-6">
      {projectList.map((project) => (
        <ProjectListModel key={project.id} project={project} onEdit={() => onEdit(project)} onDelete={() => onDelete(project)} />
      ))}
    </div>
  );
}
