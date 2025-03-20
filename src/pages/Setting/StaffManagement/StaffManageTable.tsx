import Switch from "../../../components/form/switch/Switch";
import {
    Table,    
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { useState } from "react";
import { PencilIcon } from "../../../icons";
import { Dropdown } from "../../../components/ui/dropdown/Dropdown";

interface StaffForm {
    id?: number,
    name: string,
    mobile_no: string,
    email: string,
    speciality: string,
    role: string,
    allow_login: boolean,
}

interface StaffManageTableProps {
    onEdit: (staffForm: StaffForm) => void;
    onDelete: (staffForm: StaffForm) => void;
    userList?: StaffForm[];
}

export default function StaffManageTable ({ onEdit, onDelete }: StaffManageTableProps) {

    const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
    const toggleDropdown = (id: number) => {
        setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const [userList] = useState([
        {
            id: 1,
            name: "John Doe",
            mobile_no: "9876543210",
            email: "johndoe@example.com",
            speciality: "Cardiologist",
            role: "Doctor",
            allow_login: true,
        },
        {
            id: 2,
            name: "Jane Smith",
            mobile_no: "9123456789",
            email: "janesmith@example.com",
            speciality: "Pediatrician",
            role: "Doctor",
            allow_login: false,
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
                        <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
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
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                        Mobile No
                        </TableCell>
                        <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                        Email
                        </TableCell>
                        <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                        Speciality
                        </TableCell>
                        <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                        Role
                        </TableCell>
                        <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                        Allow Login
                        </TableCell>
                        <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                        Action
                        </TableCell>
                    </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {userList.map((user, index) => (
                        <TableRow key={user.id}>
                        <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                            {index + 1}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {user.name}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {user.mobile_no}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {user.email}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {user.speciality}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {user.role}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            <Switch
                                label=""
                                defaultChecked={user.allow_login}
                                onChange={() => console.log('Switch changed')}
                            />
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            <div>
                                <button
                                    onClick={() => toggleDropdown(user.id)}
                                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <PencilIcon className="h-5 w-5 text-gray-500" />
                                </button>

                                <Dropdown
                                    isOpen={openDropdowns[user.id]}
                                    onClose={() => setOpenDropdowns(prev => ({ ...prev, [user.id]: false }))}
                                    className="absolute right-0 mt-[17px] flex w-[200px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                                >
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-300">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                        onClick={() => {
                                            onEdit(user);
                                            toggleDropdown(user.id);
                                        }}
                                    >
                                        Edit
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                        onClick={() => {
                                            onDelete(user);
                                            toggleDropdown(user.id);;
                                        }}
                                    >
                                        Delete
                                    </li>
                                    </ul>
                                </Dropdown>
                            </div>
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