import { useEffect, useState } from "react";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import { Flat, Floor } from "../../../../type/project";

interface FlatShopDetailsProps {
    flatShopDetails: Flat | null;
    floorDetails: Floor;
    isOpen: boolean;
    onClose: () => void;
    onDelete?: (data: Flat) => void;
    onSave?: (data: Flat) => void;
}

export default function FlatShopDetails({
    flatShopDetails,
    floorDetails,
    isOpen,
    onClose,
    onDelete,
    onSave,
}: FlatShopDetailsProps) {
    const [name, setName]= useState("");
    const [floorNo, setFloorNo] = useState<number>(0);
    const [size, setSize] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"Flat" | "Shop">("Flat");

    useEffect(() => {

        if (flatShopDetails && floorDetails) {
            setName(flatShopDetails.name || "");
            setFloorNo(floorDetails.floor_no);
            setSize(flatShopDetails.size || "");
            setDescription(
                flatShopDetails.description && flatShopDetails.description !== "undefined"
                    ? flatShopDetails.description
                    : ""
            );
            setType((flatShopDetails.type === "Shop" || flatShopDetails.type === "Flat") ? flatShopDetails.type : "Flat");
        } else {
            setName("");
            setFloorNo(floorDetails.floor_no);
            setSize("");
            setDescription("");
            setType("Flat");
        }
    }, [flatShopDetails, floorDetails]);

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSave && floorDetails) {
            if (onSave && floorDetails) {
                onSave({
                    id: flatShopDetails?.id ?? 0,
                    name,
                    prefix: floorDetails.prefix,
                    floor_no: Number(floorDetails.floor_no),
                    size,
                    description,
                    type,
                    is_deleted: 0,
                    is_visible: 0,
                    createdAt: flatShopDetails?.createdAt ?? new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    org_id: flatShopDetails?.org_id ?? 0,
                    project_id: flatShopDetails?.project_id ?? 0,
                    tower_id: flatShopDetails?.tower_id ?? 0,
                    wing_id: flatShopDetails?.wing_id ?? 0,
                    floor_id: flatShopDetails?.floor_id ?? floorDetails.id,
                    created_by: flatShopDetails?.created_by ?? 0,
                    updated_by: flatShopDetails?.updated_by ?? 0,
                    order: 0
                });
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Flat / Shop Details
                    </h4>
                </div>

                <form onSubmit={handleSave} className="flex flex-col">
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div>
                                <Label>Flat / Shop No.</Label>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Floor No.</Label>
                                <Input
                                    type="number"
                                    value={floorNo}
                                    disabled={true}
                                    onChange={(e) => setFloorNo(Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <Label>Area (Size)</Label>
                                <Input
                                    type="text"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
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
                            <div>
                                <Label>Type</Label>
                                <select
                                    className="w-full h-11 p-2 border rounded-md mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as "Flat" | "Shop")}
                                >
                                    <option value="Flat">Flat</option>
                                    <option value="Shop">Shop</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between px-2">
                        {flatShopDetails?.id ? (
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => onDelete && onDelete(flatShopDetails)}
                            >
                                Delete
                            </Button>
                        ) : (
                            <div />
                        )}

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
