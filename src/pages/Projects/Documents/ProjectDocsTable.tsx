import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
import { EyeIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { Utility } from "../../../service/utility/Utility";
import { TimeFormates } from "../../../service/utility/CommonConstant";
import { getDocumentLink } from "../../../service/apis/AuthService";
import { Document } from "./DocsInterface";

interface ProjectDocsProps {
    projectDocsList: Document[];
    onEdit: (doc: Document) => void;
    onDelete: (doc: Document) => void;
  }
  

export default function ProjectDocsTable( {projectDocsList, onEdit, onDelete}: ProjectDocsProps ) {

    const handleViewClicked = async (document: Document) => {
        if (!document?.key) {
            console.log("Document key is not available.");
            return;
        }

        const response = await getDocumentLink(document?.key ?? "");

        if (response?.records) {
            window.open(response?.records, "_blank");
        } else {
            console.log("Document path is not available.");
        }
    };

    return (
        projectDocsList.length > 0 ? (
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
                                    Upload Date
                                </TableCell>
                                <TableCell isHeader className="w-24 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {projectDocsList.map((document, index) => (
                                <TableRow key={document.id}>
                                    <TableCell className="w-20 px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {document.document_name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {document.createdAt ? Utility.convertDateFormat(document.createdAt, TimeFormates.ISO, TimeFormates.fullDate) : ""}
                                    </TableCell>
                                    <TableCell className="flex gap-2 w-24 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <button
                                            onClick={() => handleViewClicked(document)}
                                            className="text-blue-500 hover:underline active:scale-90 transition-transform duration-150 ease-in-out"
                                        >
                                            <EyeIcon className="h-5 w-5 text-gray-500 hover:text-black transition-colors duration-150" />
                                        </button>
                                        <button
                                            onClick={() => onEdit(document)}
                                            className="text-blue-500 hover:underline active:scale-90 transition-transform duration-150 ease-in-out"
                                        >
                                            <PencilIcon className="h-5 w-5 text-gray-500 hover:text-blue-600 transition-colors duration-150" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(document)}
                                            className="text-blue-500 hover:underline active:scale-90 transition-transform duration-150 ease-in-out"
                                        >
                                            <TrashBinIcon className="h-5 w-5 text-gray-500 hover:text-red-600 transition-colors duration-150" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>)
        : <>No docs available</>
    );
}
