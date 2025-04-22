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
    onDelete?: (id: number) => void;
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

    useEffect(() => {
        setPrefix(floorDetails?.prefix || "");
        setFloorNo(floorDetails?.floor_no ?? "");
        setDescription(
            floorDetails?.description && floorDetails.description !== "undefined"
                ? floorDetails.description
                : ""
        );
    }, [floorDetails]);

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (floorDetails && onSave) {
            onSave({
                ...floorDetails,
                prefix,
                floor_no: Number(floorNo),
                description,
            });
        }
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
                                <Label>Prefix</Label>
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
                                onClick={() => onDelete && onDelete(floorDetails.id)}
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
