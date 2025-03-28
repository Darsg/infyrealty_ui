import { useEffect, useState, useCallback } from "react";
import Select from "../form/Select";
import { getProjectList } from "../../service/apis/AuthService";

interface Project {
    id: number;
    name: string;
}

interface ProjectOption {
    value: string;
    label: string;
}

interface ProjectSelectionDropDownProps {
    onItemSelect?: (selectedProject: string) => void;
}

export default function ProjectSelectionDropDown({ onItemSelect }: ProjectSelectionDropDownProps) {
    const [projectOptions, setProjectOptions] = useState<ProjectOption[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectOption | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjectList();
                if (!response?.records || !Array.isArray(response.records)) return;

                const options = response.records.map(({ id, name }: Project) => ({
                    value: String(id),
                    label: name,
                }));

                setProjectOptions(options);

                if (options.length > 0) {
                    setSelectedProject(options[0]);
                    onItemSelect?.(options[0].value); 
                }
            } catch (error) {
                console.error("Error fetching project list:", error);
            }
        };

        fetchProjects();
    }, [onItemSelect]);

    const handleSelectChange = useCallback(
        (selectedValue: string) => {
            const selectedOption = projectOptions.find(({ value }) => value === selectedValue) || null;
            setSelectedProject(selectedOption);
            onItemSelect?.(selectedOption?.value || "");
        },
        [projectOptions, onItemSelect]
    );

    return (
        <Select
            className="w-full max-w-sm"
            options={projectOptions}
            placeholder="Select a project"
            defaultValue={selectedProject?.value || ""}
            onChange={handleSelectChange}
        />
    );
}
