import { useEffect, useState } from "react";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import { ProjectTower } from "../../../../type/project";

interface TowerDetailsProps {
    towerDetails: ProjectTower | null;
    isOpen: boolean;
    onClose: () => void;
    onDelete?: (id: number) => void;
    onSave?: (data: ProjectTower) => void;
}

export default function TowerDetails({
    towerDetails,
    isOpen,
    onClose,
    onDelete,
    onSave,
}: TowerDetailsProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(towerDetails?.name || "");
        setDescription(towerDetails?.description && towerDetails.description !== "undefined" ? towerDetails.description : "");
    }, [towerDetails]);

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (towerDetails && onSave) {
            onSave({
                ...towerDetails,
                name,
                description,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Tower Details
                    </h4>
                </div>

                <form onSubmit={handleSave} className="flex flex-col">
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input
                                    type="text"
                                    value={description ?? ""}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between px-2">
                        {/* Left side: Delete button */}
                        {towerDetails?.id ? (
                            <Button size="sm" variant="outline" onClick={() => onDelete && onDelete(towerDetails.id)}>
                                Delete
                            </Button>
                        ) : (
                            <div /> // placeholder to keep spacing consistent
                        )}

                        {/* Right side: Close and Save buttons */}
                        <div className="flex gap-3">
                            <Button size="sm" variant="outline" onClick={onClose}>
                                Close
                            </Button>
                            <Button size="sm">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
