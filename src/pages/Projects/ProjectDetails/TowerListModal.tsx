import Button from "../../../components/ui/button/Button";

interface TowerListProps {
    title: string;
    description: string;
    buttonTitle?: string;
    onButtonClick?: () => void;
    onTitleClick?: () => void;
    children: React.ReactNode;
}

export default function TowerListModal( {title, description, buttonTitle, onButtonClick, onTitleClick, children}: TowerListProps ) {
    return (
        <div className={"rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] mb-2"}>
            {/* Card Header */}
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    {/* Title on the left */}
                    <h3 
                        className="text-lg font-semibold text-gray-900 dark:text-white flex items-center hover:cursor-pointer"
                        onClick={onTitleClick}
                    >
                        {title}
                    </h3>

                    {/* Buttons for Large Screens */}
                    <div className="gap-2">
                        {buttonTitle && (
                        <Button size="sm" variant="outline" onClick={onButtonClick}>
                            {buttonTitle}
                        </Button>
                        )}
                    </div>
                </div>
                {description && description !== "undefined" && description !== null && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>

            {/* Card Body */}
            <div className="p-2 sm:p-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {children}
            </div>
        </div>
    );
}