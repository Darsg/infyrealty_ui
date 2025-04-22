import { useEffect, useState } from "react";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import { Wing } from "../../../../type/project";

interface WingDetailsProps {
    wingDetails: Wing | null;
    isOpen: boolean;
    onClose: () => void;
    onDelete?: (id: number) => void;
    onSave?: (data: Wing) => void;
}

export default function WingDetails({
    wingDetails,
    isOpen,
    onClose,
    onDelete,
    onSave,
}: WingDetailsProps) {
    const [form, setForm] = useState<Omit<Wing, 'id' | 'org_id' | 'project_id' | 'tower_id' | 'created_by' | 'updated_by' | 'is_visible' | 'is_deleted' | 'createdAt' | 'updatedAt' | 'floor_list'>>({
        name: "",
        prefix: "",
        total_floors: 0,
        total_basement: 0,
        total_shop_floors: 0,
        flats_on_floor: 0,
        shops_on_floor: 0,
        flat_size: "",
        shop_size: "",
        basement_size: "",
        type: "",
        description: "",
    });

    useEffect(() => {
        if (wingDetails) {
            setForm({
                name: wingDetails.name || "",
                prefix: wingDetails.prefix || "",
                total_floors: wingDetails.total_floors || 0,
                total_basement: wingDetails.total_basement || 0,
                total_shop_floors: wingDetails.total_shop_floors || 0,
                flats_on_floor: wingDetails.flats_on_floor || 0,
                shops_on_floor: wingDetails.shops_on_floor || 0,
                flat_size: wingDetails.flat_size || "",
                shop_size: wingDetails.shop_size || "",
                basement_size: wingDetails.basement_size || "",
                type: wingDetails.type || "",
                description: wingDetails.description || "",
            });
        }
    }, [wingDetails]);

    const handleChange = (key: keyof typeof form, value: string | number) => {
        if (typeof value === "number") {
            value = Math.max(0, Math.floor(value));
        }
        setForm({ ...form, [key]: value });
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (wingDetails && onSave) {
            onSave({
                ...wingDetails,
                ...form,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Wing Details
                    </h4>
                </div>

                <form onSubmit={handleSave} className="flex flex-col">
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div>
                                <Label>Name</Label>
                                <Input 
                                    type="text" 
                                    value={form.name} 
                                    onChange={(e) => handleChange("name", e.target.value)} 
                                />
                            </div>

                            <div>
                                <Label>Type</Label>
                                <select
                                    className="w-full h-11 p-2 border rounded-md mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400"
                                    value={form.type}
                                    onChange={(e) => handleChange("type", e.target.value)}
                                    disabled={!!wingDetails?.id}
                                >
                                    <option value="Residentials">Residentials</option>
                                    <option value="Commercials">Commercials</option>
                                </select>
                            </div>

                            <div>
                                <Label>Prefix</Label>
                                <Input 
                                    type="text" 
                                    value={form.prefix} 
                                    onChange={(e) => handleChange("prefix", e.target.value)} 
                                />
                            </div>

                            <div>
                                <Label>Total Floors</Label>
                                <Input 
                                    type="number" 
                                    value={form.total_floors} 
                                    onChange={(e) => handleChange("total_floors", Number(e.target.value))} 
                                />
                            </div>

                            <div>
                                <Label>Basements</Label>
                                <Input 
                                    type="number" 
                                    value={form.total_basement} 
                                    onChange={(e) => handleChange("total_basement", Number(e.target.value))} 
                                />
                            </div>

                            <div>
                                <Label>Shop Floors</Label>
                                <Input 
                                    type="number" 
                                    value={form.total_shop_floors} 
                                    onChange={(e) => handleChange("total_shop_floors", Number(e.target.value))} 
                                />
                            </div>

                            {form.type !== "Commercials" && (
                                <div>
                                    <Label>Flats on Floor</Label>
                                    <Input 
                                        type="number" 
                                        value={form.flats_on_floor} 
                                        onChange={(e) => handleChange("flats_on_floor", Number(e.target.value))} 
                                    />
                                </div>
                            )}

                            {form.total_shop_floors > 0 && (
                                <div>
                                    <Label>Shops on Floor</Label>
                                    <Input 
                                        type="number" 
                                        value={form.shops_on_floor} 
                                        onChange={(e) => handleChange("shops_on_floor", Number(e.target.value))} 
                                    />
                                </div>
                            )}

                            <div>
                                <Label>Basement in Sqft</Label>
                                <Input 
                                    type="text" 
                                    value={form.basement_size} 
                                    onChange={(e) => handleChange("basement_size", e.target.value)} 
                                />
                            </div>

                            {form.type !== "Commercials" && (
                                <div>
                                    <Label>Flats in Sqft</Label>
                                    <Input 
                                        type="text" 
                                        value={form.flat_size} 
                                        onChange={(e) => handleChange("flat_size", e.target.value)} 
                                    />
                                </div>
                            )}

                            {form.total_shop_floors > 0 && (
                                <div>
                                    <Label>Shops in Sqft</Label>
                                    <Input 
                                        type="text" 
                                        value={form.shop_size} 
                                        onChange={(e) => handleChange("shop_size", e.target.value)} 
                                    />
                                </div>
                            )}

                            <div>
                                <Label>Description</Label>
                                <Input 
                                    type="text" 
                                    value={form.description} 
                                    onChange={(e) => handleChange("description", e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between px-2">
                        {wingDetails?.id ? (
                            <Button size="sm" variant="outline" onClick={() => onDelete && onDelete(wingDetails.id)}>
                                Delete
                            </Button>
                        ) : (
                            <div />
                        )}

                        <div className="flex gap-3">
                            <Button size="sm" variant="outline" onClick={onClose}>Close</Button>
                            <Button size="sm">Save Changes</Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
