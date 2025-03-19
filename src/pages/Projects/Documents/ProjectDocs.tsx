import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageMeta from "../../../components/common/PageMeta";
import { getProjectDetails, getProjectDocuments } from "../../../service/apis/AuthService";
import ComponentCardWithButton from "../../../components/common/ComponentCardWithButton";
import ProjectDocsList from "./ProjectDocsList";

interface ProjectDetail {
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

export default function ProjectDocs() {
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get("project_id");
    const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);

    useEffect(() => {
        if (!projectId) {
            return;
        }

        const fetchProjectDocs = async () => {
            try {
                const response = await getProjectDocuments(projectId);
                console.log(response);
            } catch (error) {
                console.log("Error while fetching docs: ", error);
            }
        }

        const fetchProjectDetails = async () => {
            try {
                const response = await getProjectDetails(Number(projectId), Number(null), Number(null), Number(null), Number(null), Number(null));

                if (response.status_code === 200 && response?.records?.[0]) {
                    setProjectDetail(response.records[0]);
                    fetchProjectDocs()
                }
            } catch (err) {
                console.error("Error fetching project:", err);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const handleAddDocGroup = () => {
        console.log("Add Group button clicked");
    };

    return (
        <div>
            <PageMeta title="React.js Project Docs" description="Projects by InfyRealty" />

            <div className="space-y-6">
                {projectDetail ? (
                    <ComponentCardWithButton 
                        title={projectDetail?.name} 
                        buttonTitle="Add Group" 
                        onButtonClick={handleAddDocGroup}
                    >
                        <ProjectDocsList />
                    </ComponentCardWithButton>
                ) : (
                    <div className="flex justify-center items-center h-64 text-gray-500 text-lg font-semibold">
                        No project found
                    </div>
                )}
            </div>
        </div>
    );
}
