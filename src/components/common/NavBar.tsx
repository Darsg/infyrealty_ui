import { useState } from "react";

interface TabsModal {
    name: string;
    value: string;
}

interface NavBarProps {
    tabs: TabsModal[];
    onTabSelect?: (tab: { name: string; value: string }) => void;
    navBarType: "round" | "underline" | "icon" | "vertical";
    children?: React.ReactNode;
}

export default function NavBarRound({ tabs, onTabSelect, navBarType, children }: NavBarProps) {
    const [selectedTab, setSelectedTab] = useState(tabs[0]?.value || "");

    const handleTabClick = (tab: TabsModal) => {
        setSelectedTab(tab.value);
        onTabSelect?.(tab);
    };

    return (
        <div className="space-y-6">
            <div className="p-3 border border-gray-200 rounded-xl bg-white dark:border-gray-800 dark:bg-white/[0.03] flex flex-col">
                {navBarType == "round" && (<nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
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
                </nav>)}

                {navBarType == "underline" && (<nav className="flex overflow-x-auto rounded-lg [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out
                                ${
                                    selectedTab === tab.value
                                        ? "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-brand-400 after:rounded-full text-brand-400 hover:text-brand-500 dark:text-brand-400"
                                        : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                }
                            `}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>)}

                {navBarType == "icon" && (<nav className="flex space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out
                                ${
                                    selectedTab === tab.value
                                        ? "text-gray-900 dark:text-white"
                                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                }
                            `}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>)}

                {navBarType === "vertical" && (
                    <div className="flex flex-col md:flex-row md:space-x-6">
                        <nav className="flex overflow-x-auto pb-2 md:w-[200px] md:flex-col md:space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out
                                        ${
                                            selectedTab === tab.value
                                                ? "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out sm:p-3 text-brand-500 dark:bg-brand-400/20 dark:text-brand-400 bg-brand-50"
                                                : "inline-flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ease-in-out sm:p-3 bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        }
                                    `}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-4 md:mt-0 md:flex-1">{children}</div>
                    </div>
                )}

                {(navBarType === "round" || navBarType === "underline" || navBarType === "icon") && (
                    <div className="mt-4">{children}</div>
                )}
            </div>
        </div>
    );
}
