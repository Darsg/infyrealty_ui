import { useEffect, useState } from "react";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import { Flat } from "../../../../type/project";

interface FlatShopDetailsProps {
    flatShopDetails: Flat | null;
    isOpen: boolean;
    onClose: () => void;
    onDelete?: (id: number) => void;
    onSave?: (data: Flat) => void;
}

export default function FlatShopDetails({
    flatShopDetails,
    isOpen,
    onClose,
    onDelete,
    onSave,
}: FlatShopDetailsProps) {
    const [prefix, setPrefix] = useState("");
    const [floorNo, setFloorNo] = useState<number | string>("");
    const [size, setSize] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"Flat" | "Shop">("Flat");

    useEffect(() => {
        if (flatShopDetails) {
            setPrefix(flatShopDetails.prefix || "");
            setFloorNo(flatShopDetails.floor_no ?? "");
            setSize(flatShopDetails.size || "");
            setDescription(
                flatShopDetails.description && flatShopDetails.description !== "undefined"
                    ? flatShopDetails.description
                    : ""
            );
            setType((flatShopDetails.type === "Shop" || flatShopDetails.type === "Flat") ? flatShopDetails.type : "Flat");
        }
    }, [flatShopDetails]);

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (flatShopDetails && onSave) {
            onSave({
                ...flatShopDetails,
                prefix,
                floor_no: Number(floorNo),
                size,
                description,
                type,
            });
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
                                    value={prefix}
                                    onChange={(e) => setPrefix(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Floor No.</Label>
                                <Input
                                    type="number"
                                    value={floorNo}
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
                                    className="form-input w-full rounded-md border border-gray-300 p-2 dark:bg-gray-800 dark:text-white"
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
                                size="sm"
                                variant="outline"
                                onClick={() => onDelete && onDelete(flatShopDetails.id)}
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
