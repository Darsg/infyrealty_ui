interface FlatBoxProps {
    flatName: string;
    isShop?: boolean;
    isBasement?: boolean;
    enabled: boolean;
    onClick: () => void;
    customClass?: string; // for special cases like basement
}

const FlatBox: React.FC<FlatBoxProps> = ({ flatName, isShop, isBasement, enabled, onClick, customClass }) => {
    const baseClasses = `
        w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-lg 
        text-sm font-medium text-gray-700 dark:text-gray-300 
        bg-white/60 dark:bg-white/5 hover:cursor-pointer hover:bg-white/80 dark:hover:bg-white/10 
        backdrop-blur-md transition-all duration-200 ease-in-out
    `;

    const shopShadow = `
        border border-gray-300 dark:border-gray-600 
        shadow-[inset_0_8px_10px_-6px_rgba(0,0,0,0.2),inset_8px_0_10px_-6px_rgba(0,0,0,0.1),inset_-8px_0_10px_-6px_rgba(0,0,0,0.1),inset_0_-8px_10px_-6px_rgba(0,0,0,0.1)] 
        dark:shadow-[inset_0_8px_10px_-6px_rgba(255,255,255,0.15),inset_8px_0_10px_-6px_rgba(255,255,255,0.08),inset_-8px_0_10px_-6px_rgba(255,255,255,0.08),inset_0_-8px_10px_-6px_rgba(255,255,255,0.08)]
    `;

    const normalShadow = `
        border border-blue-500 dark:border-blue-700 
        shadow-[inset_0_8px_10px_-6px_rgba(0,123,255,0.2),inset_8px_0_10px_-6px_rgba(0,123,255,0.1),inset_-8px_0_10px_-6px_rgba(0,123,255,0.1),inset_0_-8px_10px_-6px_rgba(0,123,255,0.1)] 
        dark:shadow-[inset_0_8px_10px_-6px_rgba(255,255,255,0.15),inset_8px_0_10px_-6px_rgba(0,123,255,0.1),inset_-8px_0_10px_-6px_rgba(0,123,255,0.1),inset_0_-8px_10px_-6px_rgba(0,123,255,0.1)]
    `;

    const basementShadow = `
        border border-yellow-500 dark:border-yellow-700
        shadow-[inset_0_8px_10px_-6px_rgba(255,193,7,0.2),inset_8px_0_10px_-6px_rgba(255,193,7,0.1),inset_-8px_0_10px_-6px_rgba(255,193,7,0.1),inset_0_-8px_10px_-6px_rgba(255,193,7,0.1)]
        dark:shadow-[inset_0_8px_10px_-6px_rgba(255,255,255,0.15),inset_8px_0_10px_-6px_rgba(255,193,7,0.1),inset_-8px_0_10px_-6px_rgba(255,193,7,0.1),inset_0_-8px_10px_-6px_rgba(255,193,7,0.1)]
    `;

    const boxShadow = isBasement
        ? basementShadow
        : isShop
        ? shopShadow
        : normalShadow;

    const classes = `
        ${baseClasses}
        ${boxShadow}
        ${enabled ? 'cursor-pointer' : 'cursor-not-allowed'}
        ${customClass ?? ''}
    `;


    return (
        <div
            className={classes}
            onClick={enabled ? onClick : undefined}
            title={flatName}
        >
            {flatName}
        </div>
    );
};

export default FlatBox;
