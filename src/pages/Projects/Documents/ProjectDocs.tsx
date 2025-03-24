import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageMeta from "../../../components/common/PageMeta";
import { getProjectDetails, getProjectDocuments } from "../../../service/apis/AuthService";
import ComponentCardWithButton from "../../../components/common/ComponentCardWithButton";
import ProjectDocsList from "./ProjectDocsList";
import DocGroup from "./Form/DocGroup";

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
    const navigate = useNavigate();
    const projectId = searchParams.get("project_id");
    const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
    const [isOpen, setIsOpen] = useState(false);

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
                const response = await getProjectDetails(Number(projectId), 
                    null as unknown as number, 
                    null as unknown as number, 
                    null as unknown as number, 
                    null as unknown as number, 
                    null as unknown as number);

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

    const handleBackPress = () => {
        navigate("/projects", { replace: true })
    };

    const handleAddDocGroup = () => {
        setIsOpen(true);
        console.log("Add Group button clicked");
    };

    return (
        <div>
            <PageMeta title="React.js Project Docs" description="Projects by InfyRealty" />

            <div className="space-y-6">
                {projectDetail ? (
                    <ComponentCardWithButton 
                        title={projectDetail?.name} 
                        backButton={true} onBackButtonClick={handleBackPress}
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

            {isOpen && (
                <DocGroup
                    isOpen={isOpen}
                    onClose={() => console.log("Document group not changed")}
                    onSave={() => console.log("Document group saved")}
                    setIsOpen={setIsOpen}
                />
            )}
        </div>
    );
}
