import { useEffect, useState } from "react";
import { Modal } from "../../../../components/ui/modal";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import { ArrowDownIcon, ArrowRightIcon } from "../../../../icons";
import Checkbox from "../../../../components/form/input/Checkbox";

interface PermissionDetails {
    [key: string]: {
        value: boolean;
    };
}

interface SubModule {
    id: number;
    parent_id: number | null;
    module_id: number;
    module_name: string;
    permission_details: PermissionDetails;
    sub_modules: SubModule[];
}

interface Module {
    id: number;
    parent_id: number | null;
    module_id: number;
    module_name: string;
    permission_details: PermissionDetails;
    sub_modules: SubModule[];
}

interface RoleForm {
    id?: number;
    roleName: string;
    modules: Module[];
}

interface RoleManageFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onCancel: () => void;
    onSave: () => void;
    roleForm?: RoleForm | null;
}

const staticRoleData: RoleForm = {
    "roleName": "Admin",
    "modules": [
        {
            "id": 1,
            "parent_id": null,
            "module_id": 1,
            "module_name": "Dashboard",
            "permission_details": {
                "view": { "value": false }
            },
            "sub_modules": [
                {
                    "id": 2,
                    "parent_id": 1,
                    "module_id": 2,
                    "module_name": "User Management",
                    "permission_details": {
                        "view": { "value": false }
                    },
                    "sub_modules": [
                        {
                            "id": 9,
                            "parent_id": 2,
                            "module_id": 9,
                            "module_name": "Add User",
                            "permission_details": {
                                "view": { "value": true }
                            },
                            "sub_modules": [
                                {
                                    "id": 10,
                                    "parent_id": 9,
                                    "module_id": 10,
                                    "module_name": "Add Admin",
                                    "permission_details": {
                                        "view": { "value": true },
                                        "create": { "value": true },
                                        "edit": { "value": true },
                                        "delete": { "value": true }
                                    },
                                    "sub_modules": []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "parent_id": null,
            "module_id": 3,
            "module_name": "Settings",
            "permission_details": {
                "view": { "value": true }
            },
            "sub_modules": [
                {
                    "id": 4,
                    "parent_id": 3,
                    "module_id": 4,
                    "module_name": "General Settings",
                    "permission_details": {
                        "view": { "value": true },
                        "edit": { "value": true }
                    },
                    "sub_modules": []
                },
                {
                    "id": 5,
                    "parent_id": 3,
                    "module_id": 5,
                    "module_name": "Security Settings",
                    "permission_details": {
                        "view": { "value": true },
                        "edit": { "value": false },
                        "delete": { "value": false }
                    },
                    "sub_modules": []
                }
            ]
        },
        {
            "id": 6,
            "parent_id": null,
            "module_id": 6,
            "module_name": "Reports",
            "permission_details": {
                "view": { "value": true }
            },
            "sub_modules": [
                {
                    "id": 7,
                    "parent_id": 6,
                    "module_id": 7,
                    "module_name": "Sales Reports",
                    "permission_details": {
                        "view": { "value": true },
                        "export": { "value": true }
                    },
                    "sub_modules": []
                },
                {
                    "id": 8,
                    "parent_id": 6,
                    "module_id": 8,
                    "module_name": "User Activity Reports",
                    "permission_details": {
                        "view": { "value": true },
                        "export": { "value": false },
                        "create": { "value": false }
                    },
                    "sub_modules": []
                }
            ]
        },
        {
            "id": 11,
            "parent_id": null,
            "module_id": 11,
            "module_name": "Finance",
            "permission_details": {
                "view": { "value": true }
            },
            "sub_modules": [
                {
                    "id": 12,
                    "parent_id": 11,
                    "module_id": 12,
                    "module_name": "Invoices",
                    "permission_details": {
                        "view": { "value": true },
                        "create": { "value": true },
                        "approve": { "value": false }
                    },
                    "sub_modules": []
                },
                {
                    "id": 13,
                    "parent_id": 11,
                    "module_id": 13,
                    "module_name": "Payments",
                    "permission_details": {
                        "view": { "value": true },
                        "download": { "value": true }
                    },
                    "sub_modules": []
                }
            ]
        },
        {
            "id": 14,
            "parent_id": null,
            "module_id": 14,
            "module_name": "HR",
            "permission_details": {
                "view": { "value": true }
            },
            "sub_modules": [
                {
                    "id": 15,
                    "parent_id": 14,
                    "module_id": 15,
                    "module_name": "Employee Records",
                    "permission_details": {
                        "view": { "value": true },
                        "edit": { "value": true },
                        "delete": { "value": false }
                    },
                    "sub_modules": []
                },
                {
                    "id": 16,
                    "parent_id": 14,
                    "module_id": 16,
                    "module_name": "Payroll",
                    "permission_details": {
                        "view": { "value": true },
                        "generate": { "value": false }
                    },
                    "sub_modules": []
                }
            ]
        },
        {
            "id": 17,
            "parent_id": null,
            "module_id": 17,
            "module_name": "Support",
            "permission_details": {
                "view": { "value": true }
            },
            "sub_modules": [
                {
                    "id": 18,
                    "parent_id": 17,
                    "module_id": 18,
                    "module_name": "Tickets",
                    "permission_details": {
                        "view": { "value": true },
                        "create": { "value": true },
                        "resolve": { "value": false }
                    },
                    "sub_modules": []
                },
                {
                    "id": 19,
                    "parent_id": 17,
                    "module_id": 19,
                    "module_name": "Live Chat",
                    "permission_details": {
                        "view": { "value": true },
                        "send_message": { "value": true },
                        "delete": { "value": false }
                    },
                    "sub_modules": []
                }
            ]
        }
    ]
};

export default function RoleManageForm({ isOpen, setIsOpen, onCancel, onSave, roleForm }: RoleManageFormProps) {
    const [formData, setFormData] = useState<RoleForm>(staticRoleData);
    const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        if (roleForm) {
            setFormData(roleForm);
            console.log("Role Form Data Loaded", roleForm);
        }
    }, [roleForm]);

    const handleClose = () => {
        setIsOpen(false);
        onCancel();
    };

    const handleSave = () => {
        setIsOpen(false);
        onSave();
        console.log("Saving Role Data:", formData);
    };

    const toggleModuleExpand = (moduleId: number) => {
        setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const renderModule = (module: SubModule, parentId: number | null = null) => {
        const isLeafNode = module.sub_modules.length === 0;
    
        // Function to find a module by ID
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const findModuleById = (modules: Module[], moduleId: number): Module | null => {
            for (const mod of modules) {
                if (mod.module_id === moduleId) return mod;
                const found = findModuleById(mod.sub_modules, moduleId);
                if (found) return found;
            }
            return null;
        };
    
        // Function to get parent ID of a module
        const getParentId = (modules: Module[], moduleId: number): number | null => {
            for (const mod of modules) {
                if (mod.sub_modules.some(sub => sub.module_id === moduleId)) return mod.module_id;
                const found = getParentId(mod.sub_modules, moduleId);
                if (found !== null) return found;
            }
            return null;
        };
    
        // Function to update module permissions and recursively check all parents up to the root
        const updateModulePermissions = (moduleId: number, permissionKey: string, value: boolean) => {
            setFormData(prevFormData => {
                let updatedModules = prevFormData.modules.map(m => updateModule(m, moduleId, permissionKey, value));
    
                if (permissionKey === "view" && !value) {
                    updatedModules = updatedModules.map(m =>
                        updateModule(m, moduleId, permissionKey, value) // Pass flag to reset other permissions
                    );
                }

                // If checked, update all parent modules to be checked
                if (value) {
                    let parentId = getParentId(updatedModules, moduleId);
                    while (parentId !== null) {
                        updatedModules = updatedModules.map(m => updateModule(m, parentId!, permissionKey, true));
                        parentId = getParentId(updatedModules, parentId);
                    }
                } else {
                    // all childe node should be unchecked
                    updatedModules = updatedModules.map(m => uncheckChildren(m, moduleId, permissionKey));
                }
    
                return { ...prevFormData, modules: updatedModules };
            });
        };
    
        // Recursive function to update the correct module in a nested structure
        const updateModule = (m: Module, moduleId: number, permissionKey: string, value: boolean): Module => {
            if (m.module_id === moduleId) {
                return {
                    ...m,
                     permission_details: Object.fromEntries(
                        Object.entries(m.permission_details).map(([key, perm]) => {
                            if (permissionKey === "view" && !value && key !== "view") {
                                return [key, { value: false }]; // Uncheck all except "view"
                            }
                            return key === permissionKey ? [key, { value }] : [key, perm];
                        })
                    )
                };
            }
            return {
                ...m,
                sub_modules: m.sub_modules.map(sub => updateModule(sub, moduleId, permissionKey, value))
            };
        };

        // Recursive function to uncheck all child modules
        const uncheckChildren = (m: Module, parentId: number, permissionKey: string): Module => {
            if (m.module_id === parentId) {
                return {
                    ...m,
                    permission_details: {
                        ...m.permission_details,
                        [permissionKey]: { value: false }
                    },
                    sub_modules: m.sub_modules.map(sub => uncheckChildren(sub, sub.module_id, permissionKey))
                };
            }
            return {
                ...m,
                sub_modules: m.sub_modules.map(sub => uncheckChildren(sub, parentId, permissionKey))
            };
        };
    
        return (
            <div key={module.module_id} className="ml-2">
                <div className="flex items-center gap-3">
                    {/* Expand/Collapse Button */}
                    <div className="w-7 flex items-center justify-center">
                        {!isLeafNode && (
                            <button 
                                type="button" 
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
                                onClick={() => toggleModuleExpand(module.module_id)}
                            >
                                {expandedModules[module.module_id] ? (
                                    <ArrowDownIcon className="h-5 w-5 p-1 text-gray-500 text-gray-300" />
                                ) : (
                                    <ArrowRightIcon className="h-5 w-5 p-1 text-gray-500 text-gray-300" />
                                )}
                            </button>
                        )}
                    </div>

                    {/* Main Checkbox */}
                    <Checkbox
                        checked={module.permission_details.view.value}
                        onChange={(checked) => updateModulePermissions(module.module_id, "view", checked)}
                        label={module.module_name}
                    />
                </div>

                {/* Sub-Modules */}
                {expandedModules[module.module_id] && module.sub_modules.length > 0 && (
                    <div className="ml-6 space-y-2">
                        {module.sub_modules.map(sub => (
                            <div key={sub.module_id}>
                                {renderModule(sub, module.module_id)}
                            </div>
                        ))}
                    </div>
                )}

                {/* Leaf Node Permissions (Aligning with Expand Button Space) */}
                {isLeafNode && (
                    <div className="ml-[36px] space-y-2">
                        {Object.entries(module.permission_details).map(([key, value]) => (
                            <div className="flex items-center gap-3">
                                {/* Empty space to match the expand button size */}
                                <div className="w-7 h-7 flex items-center"></div>

                                <Checkbox
                                    label={key}
                                    checked={value.value}
                                    disabled={key !== "view" && !module.permission_details.view.value}
                                    onChange={(checked) => updateModulePermissions(module.module_id, key, checked)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose} 
            isFullscreen={true} 
            className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900"
        >
            <div className="w-screen h-screen flex flex-col bg-white dark:bg-gray-900 rounded-3xl p-4 lg:p-11">
                {/* ✅ Make Header Sticky at Top */}
                <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 px-2 pr-14 pb-2">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Role Management</h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Only admins can assign roles to staff members.
                    </p>
                    <div className="px-2">
                        <Label>Role Name*</Label>
                        <Input 
                            type="text" 
                            name="roleName" 
                            value={formData.roleName} 
                            onChange={(e) => setFormData({ ...formData, roleName: e.target.value })} 
                        />
                    </div>
                </div>

                {/* ✅ Make only this part scrollable */}
                <div className="flex-1 overflow-y-auto px-2 custom-scrollbar pb-20">
                    {formData.modules.map(renderModule)}
                </div>

                {/* ✅ Ensure bottom buttons are outside the scroll area */}
                <div className="sticky bottom-0 left-0 w-full bg-white dark:bg-gray-900 py-4 px-2 flex justify-end gap-3 border-t">
                    <Button size="sm" variant="outline" onClick={handleClose}>Close</Button>
                    <Button size="sm" onClick={handleSave}>Save Changes</Button>
                </div>
            </div>
        </Modal>
    );
}
