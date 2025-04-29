import { useEffect, useState } from "react";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import FileInput from "../../../../components/form/input/FileInput";

interface DocDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (docName: string, file: File) => void;
    docName: string;
    groupName: string;
}

export default function DocDetails({ isOpen, onClose, onSave, docName, groupName }: DocDetailsProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (docName && isOpen) {
            setName(docName);
        } else {
            setName("");
        }
    }, [docName, isOpen]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name.trim()) {
            alert("File name is required.");
            return;
        }
        if (!selectedFile) {
            alert("Please select a file before submitting.");
            return;
        }

        onSave(name.trim(), selectedFile);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    let fileType: "Images" | "Videos" | "Documents" = "Documents";
    if (groupName.toLowerCase() === "photo") fileType = "Images";
    else if (groupName.toLowerCase() === "videos") fileType = "Videos";

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                {docName ? "Edit" : "Add"} {fileType}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Enter the details for the {fileType.toLowerCase()}.
            </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="px-2 pb-3">
                <div className="mt-7">
                <Label>File Name</Label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    className="w-full border rounded-md focus:ring-2 focus:ring-brand-500"
                />
                </div>
                <div className="mt-7">
                <Label>Upload File</Label>
                <FileInput
                    onChange={handleFileChange}
                    className="custom-class"
                    fileType={fileType}
                />
                </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" disabled={!name.trim() || !selectedFile} type="submit">
                {docName ? "Update" : "Add"}
                </Button>
                <Button size="sm" variant="outline" onClick={onClose}>
                Cancel
                </Button>
            </div>
            </form>
        </div>
        </Modal>
    );
}
