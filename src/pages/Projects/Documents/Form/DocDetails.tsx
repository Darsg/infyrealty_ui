import { useEffect, useState } from "react";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import FileInput from "../../../../components/form/input/FileInput";

interface DocDetail {
    id?: number;
    org_id: number;
    project_id: number;
    group_id: number;
    doc_name: string;
    doc_description: string;
    doc_path: string;
}
interface DocDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (doc: DocDetail) => void;
    docDetails?: DocDetail | null;
    type: string;
}

export default function DocDetails ({ isOpen, onClose, onSave, docDetails, type }: DocDetailsProps) {

    const [localDocDetails, setLocalDocDetails] = useState<DocDetail>({ org_id: 0,
        project_id: 0,
        group_id: 0,
        doc_name: "",
        doc_description: "",
        doc_path: ""
     });

    useEffect(() => {
        if (docDetails) {
            setLocalDocDetails(docDetails);
        } else {
            setLocalDocDetails({ 
                org_id: 0,
                project_id: 0,
                group_id: 0,
                doc_name: "",
                doc_description: "",
                doc_path: ""
            });
        }
    }, [docDetails]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave(localDocDetails);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          console.log("Selected file:", file.name);
        }
      };    

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {docDetails ? "Edit" : "Add"} {type}
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Enter the details for the {type}.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="px-2 pb-3">
                        <div className="mt-7">
                            <Label>{type} Name</Label>
                            <Input
                                type="text"
                                value={localDocDetails.doc_name}
                                onChange={(e) => 
                                    setLocalDocDetails((prev) => ({ ...prev, doc_name: e.target.value }))
                                }
                                placeholder="Enter Name"
                                className="w-full border rounded-md focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <div className="mt-7">
                            <Label>Upload file</Label>
                            <FileInput onChange={handleFileChange} className="custom-class" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm">
                            {docDetails ? "Update" : "Add"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
