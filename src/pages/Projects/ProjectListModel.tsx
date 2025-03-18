import { useState } from "react";
import Badge from "../../components/ui/badge/Badge";
import Project from "./Project";
import { HeartIcon, PencilIcon } from "../../icons";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";

interface Project {
  id: number;
  name: string;
  email: string;
  contact_code: string;
  contact_no: string;
  address1: string;
  address2?: string | null;
  locality?: string | null;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  project_type: string;
}

interface ProjectListModelProps {
  project: Project;
  onEdit: (id: Project) => void;
  onDelete: (id: Project) => void;
}

export default function ProjectListModel({ project, onEdit, onDelete }: ProjectListModelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl dark:border-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {/* Image Section */}
        <div className="col-span-1">
          <img
            src="/images/grid-image/image-04.png"
            alt="grid"
            className="border border-gray-200 rounded-xl dark:border-gray-800 w-full"
          />
        </div>

        {/* Content Section */}
        <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 p-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {project.name}
            </h2>

            <div className="relative flex gap-2">
              <button
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex gap-4"
              >
                <HeartIcon className="fill-gray-500 size-5 hover:cursor-pointer transition-all duration-200"/>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <PencilIcon className="h-5 w-5 text-gray-500" />
              </button>

              <Dropdown
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-300">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => onEdit(project)}
                  >
                    Edit
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => onDelete(project)}
                  >
                    Delete
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    View Details
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {project.email}
          </p>

          <div className="flex gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {project.contact_code} {project.contact_no}
            </p>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {project.address1}, {project.address2 ? project.address2 + "," : ""}{" "}
            {project.locality ? project.locality + "," : ""} {project.city},{" "}
            {project.state}, {project.country} - {project.zipcode}
          </p>

          <div className="pt-2">
            <Badge variant="light" color="primary">
              {project.project_type}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
