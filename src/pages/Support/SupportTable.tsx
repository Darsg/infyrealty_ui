import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Utility } from "../../service/utility/Utility";
import { TimeFormates } from "../../service/utility/CommonConstant";
import Badge from "../../components/ui/badge/Badge";


export default function SupportTable() {
    const [documentList] = useState([
        { id: 1, name: "My Docs", type: "Message", createdAt: "2025-03-20T04:15:44.000Z", resolveAt: "", status: "Pending" },
        { id: 2, name: "Charge Sheet", type: "Message", createdAt: "2025-03-20T04:15:44.000Z", resolveAt: "", status: "Processing" },
        { id: 3, name: "Anexure", type: "CallBack", createdAt: "2025-03-20T04:15:44.000Z", resolveAt: "2025-03-22T08:10:11.000Z", status: "Resolved" },
    ]);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[600px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="w-20 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Sr no.
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Name
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Type
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Raise Date
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Resolve Date
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {documentList.map((document, index) => (
                                <TableRow key={document.id}>
                                    <TableCell className="w-20 px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {document.name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {document.type}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {Utility.convertDateFormat(document.createdAt, TimeFormates.ISO, TimeFormates.fullDate)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {Utility.convertDateFormat(document.resolveAt, TimeFormates.ISO, TimeFormates.fullDate)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={
                                                document.status === "Resolved"
                                                ? "success"
                                                : document.status === "Pending"
                                                ? "warning"
                                                : "primary"
                                            }
                                        >
                                            {document.status}
                                        </Badge>
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
