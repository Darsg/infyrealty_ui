import { useState } from "react";
import ComponentCardWithButton from "../../../components/common/ComponentCardWithButton";
import DocDetails from "./Form/DocDetails";

interface ProjectDocsProps {
    projectDocsList: ProjectDocsLists | null;
}

interface ProjectDocsLists {
    photos: ProjectDocsDetails[];
    video: ProjectDocsDetails[];
    documents: ProjectDocsDetails[];
    groups: ProjectDocsDetails[];
}

interface ProjectDocsDetails {
    id: number;
    org_id: number;
    project_id: number;
    group_name: string;
    description: string;
    created_by: number;
    updated_by: number;
    created_at: string;
    updated_at: string;
    document_list: DocsDetail[];
}

interface DocsDetail {
    id?: number;
    org_id: number;
    project_id: number;
    group_id: number;
    doc_name: string;
    doc_description: string;
    doc_path: string;
}

export default function ProjectDocsList({ projectDocsList }: ProjectDocsProps) {
    
    const [isDocDetailOpen, setIsDetailOpen] = useState(false);
    const [docType, setDocType] = useState<string>("");

    const handleAddClick = (type: string) => () => {
        setDocType(type);
        setIsDetailOpen(true);
    }

    // Call API here and output save in projectDocsList
    const handleAddEditDoc = (doc: DocsDetail) => {
        console.log(doc);
    }
    
    return (
        <div>
            <div className="space-y-6 flex flex-col">
            <ComponentCardWithButton 
                            title="Images" 
                            buttonTitle="Add Image" 
                            onButtonClick={handleAddClick("Image")}
            >
                Add Image here
            </ComponentCardWithButton>

            <ComponentCardWithButton 
                            title="Videos" 
                            buttonTitle="Add Video" 
                            onButtonClick={handleAddClick("Video")}
            >
                Add Video here
            </ComponentCardWithButton>

            <ComponentCardWithButton 
                            title="Documents" 
                            buttonTitle="Add Doc" 
                            onButtonClick={handleAddClick("Document")}
            >
                Add Docs here
            </ComponentCardWithButton>

            <pre className="whitespace-pre-wrap break-words p-4 bg-gray-100 opacity-90 rounded-md text-sm">
                {JSON.stringify(projectDocsList, null, 2)}
            </pre>
        </div>

        {isDocDetailOpen && (
            <DocDetails 
                isOpen={isDocDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                onSave={(doc) => handleAddEditDoc(doc)}
                type={docType}/>
        )}
        </div>
    );
}