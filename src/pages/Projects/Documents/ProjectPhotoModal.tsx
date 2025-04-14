import { useState } from "react";
import { Photo } from "./DocsInterface";
import { MoreDotIcon } from "../../../icons";
import { Dropdown } from "../../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../../components/ui/dropdown/DropdownItem";

interface PhotoProps{
    photo: Photo;
    setImage?: (id: number) => void;
    onDelete: () => void;
}

export default function ProjectPhotoModal( {photo, setImage, onDelete}: PhotoProps ) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-[300px] aspect-[16/9] inline-block flex-shrink-0 border-4 border-brand-500 rounded-3xl overflow-hidden">
            <div className="relative w-full h-full">
                <img 
                    src={photo?.link} 
                    alt="Project Photo" 
                    className="w-full h-full object-cover rounded-2xl hover:cursor-pointer"
                />

                <button 
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 shadow"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-label="More options"
                >
                    <MoreDotIcon className="text-gray-500 hover:text-gray-700 dark:text-gray-300 size-6" />
                </button>
            </div>

            {isOpen && (
                <Dropdown
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="absolute right-2 top-12 z-50 w-40 p-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
                >
                    <DropdownItem
                        onItemClick={() => setImage && setImage(photo?.id)}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                        Set Picture
                    </DropdownItem>
                    <DropdownItem
                        onItemClick={onDelete}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                        Delete
                    </DropdownItem>
                </Dropdown>
            )}
        </div> 
    );
}