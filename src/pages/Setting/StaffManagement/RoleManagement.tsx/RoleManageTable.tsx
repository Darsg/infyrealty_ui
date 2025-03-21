import {
    Table,    
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table";
import { useState } from "react";
import { PencilIcon } from "../../../../icons";

interface RoleForm {
    id: number,
    roleName: string,
}

interface StaffManageTableProps {
    onEdit: (staffForm: RoleForm) => void;
}

export default function RoleManageTable ({ onEdit }: StaffManageTableProps) {

    const [roleList] = useState([
        {
            id: 1,
            roleName: "Admin",
        },
        {
            id: 2,
            roleName: "Manager",
        },
        {
            id: 3,
            roleName: "User",
        },
    ]);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[600px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="w-20 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                        Sr no.
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="w-24 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {roleList.map((role, index) => (
                            <TableRow key={role.id}>
                                <TableCell className="w-20 px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {role.roleName}
                                </TableCell>
                                <TableCell className="w-24 px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <button
                                        onClick={() => onEdit(role)}
                                        className="text-blue-500 hover:underline active:scale-90 transition-transform duration-150 ease-in-out"
                                    >
                                        <PencilIcon className="h-5 w-5 text-gray-500 hover:text-blue-600 transition-colors duration-150" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}