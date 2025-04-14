import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageMeta from "../../../components/common/PageMeta";
import { getProjectDetails, getProjectDocuments } from "../../../service/apis/AuthService";
import ComponentCardWithButton from "../../../components/common/ComponentCardWithButton";
import DocGroup from "./Form/DocGroup";
import { ProjectDocsLists } from "./DocsInterface";
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
    const navigate = useNavigate();
    const projectId = searchParams.get("project_id");
    const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
    const [projectDocsList, setProjectDocsList] = useState<ProjectDocsLists | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const fetchProjectDocs = useCallback(async () => {
        if (!projectId) return;
        try {
            const response = await getProjectDocuments(String(projectId));
            if (response.status_code === 200) {
                setProjectDocsList(response.records);
            } else {
                console.error("Failed to fetch documents, status:", response.status_code);
            }
        } catch (error) {
            console.error("Error while fetching project documents:", error);
        }
    }, [projectId]);

    const handleBackPress = () => {
        navigate("/projects", { replace: true })
    };

    // const handleAddEditDocGroup = () => {
    //     setIsOpen(true);
    //     console.log("Add Group button clicked");
    // };

    const fetchProjectDetails = useCallback(async () => {
        if (!projectId) return;
        try {
            const response = await getProjectDetails(Number(projectId), null as unknown as number, null as unknown as number, null as unknown as number, null as unknown as number, null as unknown as number);
            if (response.status_code === 200 && response?.records?.length > 0) {
                setProjectDetail(response.records[0]);
            } else {
                console.error("Project not found or API response issue.");
            }
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    }, [projectId]);

    useEffect(() => {
        fetchProjectDetails();
        fetchProjectDocs();
    }, [fetchProjectDetails, fetchProjectDocs]);

    return (
        <div>
            <PageMeta title="React.js Project Docs" description="Projects by InfyRealty" />

            <div className="space-y-6">
                {projectDetail ? (
                    <ComponentCardWithButton 
                        title={projectDetail?.name} 
                        backButton={true} 
                        onBackButtonClick={handleBackPress}
                        buttonTitle="Add Group" 
                        onButtonClick={() => setIsOpen(true)}
                    >
                        <ProjectDocsList projectDocsList={projectDocsList} setProjectDocList={setProjectDocsList} projectId={projectId || ""}/>
                    </ComponentCardWithButton>
                ) : (
                    <div className="flex justify-center items-center h-64 text-gray-500 text-lg font-semibold">
                        No project found
                    </div>
                )}
            </div>

            {isOpen && (
                <DocGroup
                    projectId={projectDetail?.id}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSave={() => setIsOpen(false)}
                    setIsOpen={setIsOpen}
                />
            )}
        </div>
    );
}
