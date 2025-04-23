import { useEffect, useState } from "react";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import { Floor } from "../../../../type/project";

interface FloorDetailsProps {
    floorDetails: Floor | null;
    isOpen: boolean;
    onClose: () => void;
    onDelete?: (data: Floor) => void;
    onSave?: (data: Floor) => void;
}

export default function FloorDetails({
    floorDetails,
    isOpen,
    onClose,
    onDelete,
    onSave,
}: FloorDetailsProps) {
    const [prefix, setPrefix] = useState("");
    const [floorNo, setFloorNo] = useState<number | string>("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"Residentials" | "Commercials">("Residentials");

    useEffect(() => {
        if (floorDetails) {
            setPrefix(floorDetails.prefix || "");
            setFloorNo(floorDetails.floor_no ?? "");
            setDescription(
                floorDetails.description && floorDetails.description !== "undefined"
                    ? floorDetails.description
                    : ""
            );
            setType(
                floorDetails.type === "Commercials" ? "Commercials" : "Residentials"
            );
        } else {
            setPrefix("");
            setFloorNo("");
            setDescription("");
            setType("Residentials");
        }
    }, [floorDetails]);

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: Floor = {
            ...floorDetails!,
            id: floorDetails?.id ?? 0,
            prefix,
            floor_no: floorNo === "" ? 0 : Number(floorNo),
            type,
            description,
            org_id: floorDetails?.org_id ?? 0,
            project_id: floorDetails?.project_id ?? 0,
            tower_id: floorDetails?.tower_id ?? 0,
            createdAt: floorDetails?.createdAt ?? new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        onSave?.(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Floor Details
                    </h4>
                </div>

                <form onSubmit={handleSave} className="flex flex-col">
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div>
                                <Label>Type</Label>
                                <select
                                    className="w-full h-11 p-2 border rounded-md text-sm font-medium text-gray-700 dark:text-gray-400"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as "Residentials" | "Commercials")}
                                >
                                    <option value="Residentials">Residentials</option>
                                    <option value="Commercials">Commercials</option>
                                </select>
                            </div>
                            <div>
                                <Label>Floor No.</Label>
                                <Input
                                    type="number"
                                    value={floorNo}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFloorNo(value === "" ? "" : Number(value));
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between px-2">
                        {floorDetails?.id ? (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onDelete?.(floorDetails)}
                            >
                                Delete
                            </Button>
                        ) : (
                            <div />
                        )}

                        <div className="flex gap-3">
                            <Button type="button" size="sm" variant="outline" onClick={onClose}>
                                Close
                            </Button>
                            <Button type="submit" size="sm">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
