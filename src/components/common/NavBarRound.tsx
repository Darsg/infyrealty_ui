import { useState } from "react";

interface TabsModal {
    name: string;
    value: string;
}

interface NavBarProps {
    tabs: TabsModal[];
    onTabSelect?: (tab: { name: string; value: string }) => void;
}

export default function NavBarRound({ tabs, onTabSelect }: NavBarProps) {
    const [selectedTab, setSelectedTab] = useState(tabs[0]?.value || "");

    const handleTabClick = (tab: TabsModal) => {
        setSelectedTab(tab.value);
        onTabSelect?.(tab);
    };

    return (

            <div className="space-y-6 ">
                <div className="p-3 border border-gray-200 rounded-xl bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out
                                    ${
                                        selectedTab === tab.value
                                            ? "bg-white text-gray-900 dark:bg-gray-700 dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:bg-blue-500 after:rounded-full"
                                            : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    }
                                `}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
    );
}
