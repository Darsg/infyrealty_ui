import { Table, TableBody, TableCell, TableRow } from "../../../components/ui/table";
import { InfoIcon, PencilIcon } from "../../../icons";
import { Flat, Floor } from "../../../type/project";
import FlatBox from "./FlatBoxProps";

interface WingModalProps {
    floorList: Floor[];
    onFloorEdit?: (floor: Floor) => void;
    onFlatEdit?: (floor: Floor, flat?: Flat) => void;
}

export default function WingViewModal({ floorList, onFloorEdit, onFlatEdit }: WingModalProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[400px]">
                    <Table>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {floorList.map((floor) => {
                            return (
                                <TableRow key={floor.id}>
                                    <TableCell className="pl-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <button
                                            className="text-blue-500 underline hover:text-blue-700"
                                            onClick={() => onFloorEdit?.(floor)}
                                        >
                                            <PencilIcon className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="overflow-x-auto">
                                            {floor.type === "Basement" || floor.type === "Ground Floor" ? (
                                                <FlatBox
                                                    flatName={`${floor.type === "Ground Floor" ? "Ground Floor" : `${floor.type} ${floor.floor_no}`}`}
                                                    isBasement={true}
                                                    customClass="w-full border-yellow-500"
                                                    enabled={true}
                                                    onClick={() => console.log("nothing")}
                                                />
                                            ) : (
                                                <div className="flex flex-nowrap gap-2">
                                                    {floor.flat_list?.map((flat) => (
                                                        <FlatBox
                                                            key={flat.id}
                                                            flatName={flat.name}
                                                            isShop={flat.type === "Shop"}
                                                            enabled={true}
                                                            onClick={() => onFlatEdit?.(floor, flat)}
                                                        />
                                                    ))}

                                                    {/* Always display the Info button, regardless of flat_list */}
                                                    <button
                                                        onClick={() => onFlatEdit?.(floor)}
                                                        className="text-blue-500 underline hover:text-blue-700"
                                                    >
                                                        <InfoIcon className="w-5 h-5 text-gray-500" />
                                                    </button>
                                                </div>
                                            )}

                                            
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
