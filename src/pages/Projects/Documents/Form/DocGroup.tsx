import { useEffect, useState } from "react";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import { createDocumentGroup, updateDocumentGroup } from "../../../../service/apis/AuthService";
import { toast } from "react-toastify";

interface DocGroupDetail {
    id?: number;
    name: string;
    description?: string;
}

interface DocGroupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    setIsOpen: (isOpen: boolean) => void;
    docGroup?: DocGroupDetail | null;
    projectId?: number;
}

export default function DocGroup({ isOpen, onClose, onSave, setIsOpen, docGroup, projectId }: DocGroupProps) {
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (docGroup) {
            setGroupName(docGroup.name || "");
            setDescription(docGroup.description || "");
        } else {
            setGroupName("");
            setDescription("");
        }
    }, [docGroup]);

    const handleBack = () => {
        setIsOpen(false);
        onClose();
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("project_id", String(projectId))
            formData.append("group_name", groupName);
            formData.append("description", description);

            let response;
            if (docGroup) {
                formData.append("id", docGroup.id?.toString() || "");
                response = await updateDocumentGroup(formData);
            } else {
                response = await createDocumentGroup(formData);
            }

            if(response?.status_code === 200){
                onSave();
            }
            toast(response?.msg, { type: response.alert })
        } catch (error) {
            console.error("Error while creating document group:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleBack} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {document ? "Edit" : "Add"} Document Group
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Enter the details for the document group.
                    </p>
                </div>
                <form onSubmit={handleSave} className="flex flex-col">
                    <div className="px-2 pb-3">
                        <div className="mt-7">
                            <Label>Group Name</Label>
                            <Input
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder="Group Name"
                                className="w-full border rounded-md focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <div className="mt-7">
                            <Label>Description</Label>
                            <Input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="w-full border rounded-md focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm">
                            {docGroup ? "Update" : "Add"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
