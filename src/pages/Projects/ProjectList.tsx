import { Project } from "../../type/project";
import ProjectListModel from "./ProjectListModel";

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
