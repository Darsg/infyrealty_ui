import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../components/ui/table";
import { PencilIcon, TrashBinIcon } from "../../../../icons";
import { useState } from "react";

interface UserManageTableProps {
    onEdit: (user: UserForm) => void;
    onDelete: (user: UserForm) => void;
}

interface UserForm {
    user_id?: number;
    name: string;
    contact_code: number;
    mobile_no: string;
    email: string;
    address1: string;
    description: string;
}

export default function UserManageTable({ onEdit, onDelete }: UserManageTableProps) {

    const [userList] = useState<UserForm[]>([
        {
            user_id: 1,
            name: "John Doe",
            contact_code: 91,
            mobile_no: "9876543210",
            email: "johndoe@example.com",
            address1: "Doctor",
            description: "true",
        },
        {
            user_id: 2,
            name: "Jane Smith",
            contact_code: 91,
            mobile_no: "9123456789",
            email: "janesmith@example.com",
            address1: "Nurse",
            description: "true",
        },
    ]);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Sr no.
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Name
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Mobile No
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Email
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Description
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {userList.map((user, index) => {
                                const userId = user.user_id ?? index; // fallback to index if undefined

                                return (
                                    <TableRow key={userId}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {user.name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            +{user.contact_code} {user.mobile_no}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {user.description}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 relative">
                                            <button
                                                onClick={() => onEdit(user)}
                                                className="p-2 transition-all duration-150 ease-in-out transform rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-90"
                                            >
                                                <PencilIcon className="h-5 w-5 text-gray-500 transition-colors duration-150 hover:text-blue-600" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(user)}
                                                className="p-2 transition-all duration-150 ease-in-out transform rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-90"
                                            >
                                                <TrashBinIcon className="h-5 w-5 text-gray-500 transition-colors duration-150 hover:text-red-500" />
                                            </button>
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
