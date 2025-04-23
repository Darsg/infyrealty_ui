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
    onDelete?: (data: ProjectTower) => void;
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
    
        const newTower: ProjectTower = {
            id: towerDetails?.id ?? 0,
            org_id: towerDetails?.org_id ?? 0,
            project_id: towerDetails?.project_id ?? 0,
            name,
            description,
            created_by: towerDetails?.created_by ?? 0,
            updated_by: towerDetails?.updated_by ?? null,
            is_visible: towerDetails?.is_visible ?? 1,
            is_deleted: towerDetails?.is_deleted ?? 0,
            createdAt: towerDetails?.createdAt ?? new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            wing_list: towerDetails?.wing_list ?? [],
        };
    
        onSave?.(newTower);
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
                            <Button size="sm" variant="outline" onClick={() => onDelete && onDelete(towerDetails)}>
                                Delete
                            </Button>
                        ) : (
                            <div />
                        )}

                        {/* Right side: Close and Save buttons */}
                        <div className="flex gap-3">
                            <Button size="sm" variant="outline" onClick={onClose}>
                                Close
                            </Button>
                            <Button size="sm" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
