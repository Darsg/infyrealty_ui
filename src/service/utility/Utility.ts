import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { RootState } from "../store/store";
import {
    GridIcon,
    ProjectIcon,
    SettingIcon,
    CalenderIcon,
    UserCircleIcon,
    ListIcon,
    TableIcon,
    PageIcon,
    CallIcon,
    TicketIcon,

} from '../../icons';
import React from "react";

// Extend dayjs with custom parsing support
dayjs.extend(customParseFormat);

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export class Utility {

    /**
     * Converts a date from one format to another.
     */
    static convertDateFormat(date: string, inputFormat: string, outputFormat: string): string {
        if (!date || !inputFormat || !outputFormat) return "";

        const parsedDate = dayjs(date, inputFormat);
        return parsedDate.isValid() ? parsedDate.format(outputFormat) : "";
    }

    /**
     * Generates a list of navigation items based on permission modules.
     */
    static generateNavBarItem(state: RootState): NavItem[] {
        const permissionModules = state.userPermission.modules;
    
        const navItems: NavItem[] = permissionModules
            .map((module) => {
                // Handle Dashboard module
                if (module.module_name.toLocaleLowerCase() === "dashboard") {
                    return {
                        name: module.module_name,
                        icon: React.createElement(GridIcon),
                        subItems: [{ name: "Ecommerce", path: "/dashboard", pro: false }],
                    };
                } else if (module.module_name === "Projects") {
                    return {
                        name: module.module_name,
                        icon: React.createElement(ProjectIcon),
                        path: "/projects",
                    };
                }else if (module.module_name === "Setting") {
                    const settingSubItems = module?.sub_modules.map((subModule1) => {
                        if (subModule1.module_name === "Staff Management") {
                            return {
                                name: subModule1.module_name,
                                path: "/setting/staff-management",
                                pro: false,
                            };
                        } else if (subModule1.module_name === "User Management") {
                            return {
                                name: subModule1.module_name,
                                path: "/setting/user-management",
                                pro: false,
                            };
                        }
                        return null;
                    }).filter(item => item !== null); 
                
                    settingSubItems.push({
                        name: "Profile",
                        path: "/setting/profile",
                        pro: false,
                    });
                
                    return {
                        name: module.module_name,
                        icon: React.createElement(SettingIcon),
                        subItems: settingSubItems,
                    };
                }

                return null;
            })
            .filter((item) => item !== null) as NavItem[];

            const staticPages: NavItem[] = [
                {
                    name: "Support",
                    icon: React.createElement(CallIcon),
                    path: "/support",
                },
                {
                    name: "Ticket",
                    icon: React.createElement(TicketIcon),
                    path: "/ticket",
                },
                {
                    icon: React.createElement(CalenderIcon),
                    name: "Calendar",
                    path: "/calendar",
                },
                {
                    icon: React.createElement(UserCircleIcon),
                    name: "User Profile",
                    path: "/profile",
                },
                {
                    name: "Forms",
                    icon: React.createElement(ListIcon),
                    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
                },
                {
                    name: "Tables",
                    icon: React.createElement(TableIcon),
                    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
                },
                {
                    name: "Pages",
                    icon: React.createElement(PageIcon),
                    subItems: [
                    { name: "Blank Page", path: "/blank", pro: false },
                    { name: "404 Error", path: "/error-404", pro: false },
                    ],
                }
            ];
        
        return navItems.concat(staticPages);
    }

    /**
     * Checks if a path exists in the navigation structure.
     */
    static isPathAllowed(state: RootState, targetPath: string): boolean {
        const navItems = Utility.generateNavBarItem(state);

        const searchPath = (items: NavItem[]): boolean => {
            for (const item of items) {
                if (item.path === targetPath) {
                    return true;
                }
                if (item.subItems) {
                    const found = item.subItems.some(sub => sub.path === targetPath);
                    if (found) return true;
                }
            }
            return false;
        };

        return searchPath(navItems);
    }
}
