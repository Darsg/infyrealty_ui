import {
    Table,    
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table";
import { PencilIcon } from "../../../../icons";

interface RoleProps {
    id: number,
    description: string,
    is_deleted: number,
    name: string,
    org_id: number,
}

interface StaffManageTableProps {
    onEdit: (staffForm: RoleProps) => void;
    roleList: RoleProps[];
}

export default function RoleManageTable ({ roleList, onEdit }: StaffManageTableProps) {

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
                            <TableRow
                            key={role.id}
                            className={
                              role.name === 'Admin'
                                ? 'bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                                : ''
                            }
                          >
                            <TableCell className="w-20 px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                              {index + 1}
                            </TableCell>
                          
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {role.name}
                            </TableCell>
                          
                            <TableCell className="w-24 px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                              <button
                                onClick={() => role.name !== 'Admin' && onEdit(role)}
                                disabled={role.name === 'Admin'}
                                className={`text-blue-500 hover:underline active:scale-90 transition-transform duration-150 ease-in-out ${
                                  role.name === 'Admin' ? 'cursor-not-allowed opacity-50 pointer-events-none' : ''
                                }`}
                              >
                                <PencilIcon
                                  className={`h-5 w-5 transition-colors duration-150 ${
                                    role.name === 'Admin' ? 'text-gray-400' : 'text-gray-500 hover:text-blue-600'
                                  }`}
                                />
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