import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Utility } from "../../service/utility/Utility";
import { TimeFormates } from "../../service/utility/CommonConstant";
import Badge from "../../components/ui/badge/Badge";
import { AcceptAllIcon, AcceptIcon, CloseIcon, EyeIcon } from "../../icons";

export default function TicketTable() {
    const [documentList] = useState([
        { 
            id: "IND45786", 
            name: "My Docs", 
            type: "Message", 
            description: "This document contains important personal records and essential paperwork required for verification and compliance. It includes identity proofs, address verification, and additional legal documents necessary for official purposes. The document serves as a reference for authentication and plays a crucial role in various applications, including banking, legal processes, and employment verification. Ensuring the accuracy and security of this document is vital to prevent identity fraud and maintain legal compliance.",
            createdAt: "2025-03-20T04:15:44.000Z", 
            resolveAt: "", 
            status: "Pending",
            email: "john@mail.com"
        },
        { 
            id: "USA54213", 
            name: "Charge Sheet", 
            type: "Message", 
            description: "A charge sheet is a detailed report filed by law enforcement agencies that contains the formal allegations against an individual suspected of committing a crime. This document outlines the nature of the offense, evidence collected, witness statements, and supporting legal provisions under which charges have been framed. It serves as a critical document in criminal proceedings and helps judicial authorities assess the severity of the case before proceeding to trial. Maintaining the integrity and confidentiality of this document is essential for a fair trial.",
            createdAt: "2025-03-20T04:15:44.000Z", 
            resolveAt: "", 
            status: "Processing",
            email: "john@mail.com"
        },
        { 
            id: "FRS98745", 
            name: "Anexure", 
            type: "CallBack", 
            description: "An annexure is a supplementary document that provides additional information or evidence to support the main document. It may include tables, charts, legal agreements, or explanatory notes that are crucial for a comprehensive understanding of the primary document. Annexures are commonly used in legal, financial, and corporate documentation to provide clarity and supporting details. They ensure that all relevant data is included without cluttering the main report, making them an indispensable part of official documentation.",
            createdAt: "2025-03-20T04:15:44.000Z", 
            resolveAt: "2025-03-22T08:10:11.000Z", 
            status: "Resolved",
            email: "john@mail.com"
        }
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
                                    Ticket no.
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Name
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Type
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Discription
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Raise Date
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Resolve Date
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Assign To
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Status
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {documentList.map((document) => (
                                <TableRow key={document.id}>
                                    <TableCell className="w-20 px-4 py-3 text-gray-700 text-center text-theme-sm dark:text-gray-400 font-medium">
                                        {document.id}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                        <div className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                                            {document.name}
                                        </div>
                                        <div>
                                            {document?.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {document.type}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="line-clamp-3 text-ellipsis overflow-hidden">
                                            {document?.description}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                        {Utility.convertDateFormat(document.createdAt, TimeFormates.ISO, TimeFormates.fullDate)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                        {Utility.convertDateFormat(document.resolveAt, TimeFormates.ISO, TimeFormates.fullDate)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                        Darsh Dobariya
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
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {document.status === "Pending" && (
                                            <div className="flex">
                                                <button className="group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                                    <EyeIcon className="h-5 w-5 text-gray-500 transition-colors duration-150 group-hover:text-black" />
                                                </button>
                                                <button className="group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                                    <AcceptIcon className="h-5 w-5 text-gray-500 transition-colors duration-150 group-hover:text-blue-600" />
                                                </button>
                                            </div>
                                        )}

                                        {document.status === "Processing" && (
                                            <div className="flex">
                                                <button className="group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                                    <EyeIcon className="h-5 w-5 text-gray-500 transition-colors duration-150 group-hover:text-black" />
                                                </button>
                                                <button className="group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                                    <AcceptAllIcon className="h-5 w-5 text-gray-500 transition-colors duration-150 group-hover:text-green-600" />
                                                </button>

                                                <button className="group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                                    <CloseIcon className="h-5 w-5 text-gray-500 transition-colors duration-150 group-hover:text-red-600" />
                                                </button>
                                            </div>
                                        )}

                                        {document.status === "Resolved" && (
                                            <button className="group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                                <EyeIcon className="h-5 w-5 text-gray-500 transition-colors duration-150 group-hover:text-black" />
                                            </button>
                                        )}
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
