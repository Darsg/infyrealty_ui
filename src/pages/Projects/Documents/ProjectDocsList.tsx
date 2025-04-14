import { useState } from "react";
import ComponentCardWithButton from "../../../components/common/ComponentCardWithButton";
import ProjectPhotoModal from "./ProjectPhotoModal";
import { ProjectDocsLists } from "./DocsInterface";
import DocDetails from "./Form/DocDetails";
import ProjectDocsTable from "./ProjectDocsTable";
import { addPhotoVideo, deletePhotoVideo, updatePhotoVideo } from "../../../service/apis/AuthService";
import { toast } from "react-toastify";
import BoxAlerts from "../../UiElements/BoxAlerts";

interface ProjectDocsProps {
    projectDocsList: ProjectDocsLists | null;
    setProjectDocList: React.Dispatch<React.SetStateAction<ProjectDocsLists | null>>;
    projectId: string;
}

export default function ProjectDocsList({
    projectDocsList,
    setProjectDocList,
    projectId,
}: ProjectDocsProps) {
    const [isDocDetailOpen, setIsDetailOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [groupId, setGroupId] = useState<number | null>(null);
    const [groupName, setGroupName] = useState<string | null>(null);
    const [docId, setDocId] = useState<number | null>(null);
    const [docName, setDocName] = useState<string>("");

    const handleOpenDialoge = (
        group_id: number | null,
        group_name: string,
        doc_id: number | null,
        doc_name: string | null
    ) => {
        setIsDetailOpen(true);
        setDocId(doc_id);
        setDocName(doc_name ?? ""); 
        setGroupName(group_name);
        setGroupId(group_id);
    };

    const handleCancelClick = () => {
        setIsDetailOpen(false);
        setDocId(null);
        setDocName("");
        setGroupName(null);
        setGroupId(null);
    };

    const handleAddUpdateDocs = async (docName: string, file: File) => {
        if (!file || file.size === 0) {
            console.warn("No file selected or empty file.");
            return;
        }

        const formData = new FormData();
        formData.append("project_id", projectId);
        formData.append("type", groupName ?? "");
        formData.append("document_name", docName);
        formData.append("files", file);

        if(groupId){
            formData.append("group_id", String(groupId));
        }

        let response;

        try{
            if(!docId){
                response = await addPhotoVideo(formData);
            } else {
                formData.append("id", String(docId));
                response = await updatePhotoVideo(formData);
            }

            if(response.status_code === 200){
                setProjectDocList(response?.records);
            }

            if(response?.msg){
                toast(response.msg, {type: response.alert});
            } else {
                toast(response?.error[0]?.msg, {type: "error"});
            }

            handleCancelClick();
        } catch(error) {
            console.log("Error while adding/updating document:", error);
        }
    };

    const confirmDialoge = (
        group_id: number | null,
        group_name: string,
        doc_id: number | null,
    ) => {
        setIsOpen(true);
        setDocId(doc_id);
        setGroupName(group_name);
        setGroupId(group_id);
    }

    const cancelDialoge = () => {
        setIsOpen(false);
        setDocId(null);
        setDocName("");
        setGroupName(null);
        setGroupId(null);
    }

    const handleDeleteDocs = async () => {
        try {
            const response = await deletePhotoVideo(
                projectId,
                groupName ?? "",
                groupId !== null ? String(groupId) : "",
                docId !== null ? String(docId) : ""
            );
              
            if(response.status_code === 200){
                setProjectDocList(response?.records);
            }

            if(response?.msg){
                toast(response.msg, {type: response.alert});
            } else {
                toast(response?.error[0]?.msg, {type: "error"});
            }

            cancelDialoge();
        } catch(error) {
            console.log("error while deleting documents.", error);
        }
    };

    return (
        <>
            <div className="space-y-6 flex flex-col">
                {/* Images */}
                <ComponentCardWithButton
                    title="Images"
                    buttonTitle="Add Image"
                    onButtonClick={() => handleOpenDialoge(null, "Photo", null, null)}
                >
                    <div className="flex flex-nowrap gap-4 overflow-x-auto rounded-2xl p-4 border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] scrollbar-thin scrollbar-thumb-gray-400">
                    {(projectDocsList?.photos || []).map((photo) => (
                        <ProjectPhotoModal key={photo.id} photo={photo} onDelete={() => confirmDialoge(null, "Photo", photo.id)}/>
                    ))}
                    </div>
                </ComponentCardWithButton>

                {/* Ungrouped Documents */}
                <ComponentCardWithButton
                    title="Documents"
                    buttonTitle="Add Doc"
                    onButtonClick={() => handleOpenDialoge(null, "Document", null, null)}
                >
                    <ProjectDocsTable
                    projectDocsList={projectDocsList?.documents || []}
                    onEdit={(document) =>
                        handleOpenDialoge(null, "Document", document.id, document.document_name)
                    }
                    onDelete={(document) => confirmDialoge(null, "Document", document.id)}
                    />
                </ComponentCardWithButton>

                {/* Grouped Documents */}
                {(projectDocsList?.groups || []).map((group) => (
                    <ComponentCardWithButton
                    key={group.id}
                    title={group.group_name}
                    buttonTitle="Add Doc"
                    onButtonClick={() => handleOpenDialoge(group.id, group.group_name, null, null)}
                    >
                    <ProjectDocsTable
                        projectDocsList={group.document_list}
                        onEdit={(document) =>
                            handleOpenDialoge(group.id, group.group_name, document.id, document.document_name)
                        }
                        onDelete={(document) => confirmDialoge(group.id, group.group_name, document.id)}
                    />
                    </ComponentCardWithButton>
                ))}

                {/* Document Form Modal */}
                {isDocDetailOpen && (
                    <DocDetails
                        isOpen={isDocDetailOpen}
                        onClose={handleCancelClick}
                        onSave={handleAddUpdateDocs}
                        docName={docName}
                        groupName={groupName ?? ""}
                    />
                )}

            </div>

            {isOpen && 
                <BoxAlerts 
                    onConfirm={handleDeleteDocs} 
                    onCancel={cancelDialoge} 
                    title="Delete Document?" 
                    description="Are you sure you want to delete this document?"
                    boxType="error"
                    isOpen={isOpen}/>
            }
        </>
    );
}
