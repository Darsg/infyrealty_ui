import { useEffect, useState } from "react";
import { UserForm } from "../../../type/usermanagment";
import { Project } from "../../../type/project";
import { getOrgRoleList, getProjectList } from "../../../service/apis/AuthService";
import { Modal } from "../../../components/ui/modal";
import Label from "../../../components/form/Label";
import Button from "../../../components/ui/button/Button";
import { RoleProps } from "../../../type/permission";
import Select from "../../../components/form/Select";

interface UserManageFormProps {
    isOpen: boolean;
    onCancel: () => void;
    onSave: () => void;
    userForm?: UserForm | null;
}

export default function UserProjectRoleForm({
    isOpen,
    onCancel,
    onSave,
    userForm,
}: UserManageFormProps) {
    const [projectList, setProjectList] = useState<Project[] | null>(null);
    const [roleList, setRoleList] = useState<RoleProps[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<Record<number, number>>({});

    const fetchProjectList = async () => {
        try {
            const response = await getProjectList();
            if (response?.status_code === 200) {
                setProjectList(response.records);
            }
        } catch (error) {
            console.error("Error while fetching project list:", error);
        }
    };

    const fetchRoleList = async () => {
        try {
            const response = await getOrgRoleList();
            if (response?.status_code === 200) {
                setRoleList(response.records);
            }
        } catch (error) {
            console.error("Error while fetching role list:", error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchProjectList();
            fetchRoleList();
        }
    }, [isOpen]);

    const handleRoleChange = (projectId: number, roleId: number) => {
        setSelectedRoles((prev) => ({
            ...prev,
            [projectId]: roleId,
        }));
    };

    const handleSaveClick = () => {
        const payload = Object.entries(selectedRoles).map(([projectId, roleId]) => ({
            project_id: Number(projectId),
            role_id: roleId,
        }));

        console.log("Payload:", payload);
        onSave();
    };

    return (
        <Modal isOpen={isOpen} onClose={onCancel} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {userForm ? "Update User Details" : "Add User Details"}
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        All fields are required. The user will only be able to login via email, so please verify it carefully.
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveClick();
                    }}
                    className="flex flex-col"
                >
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            Assign Roles per Project
                        </h5>

                        <div className="grid grid-cols-1 gap-5">
                            {projectList?.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-5 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
                                >
                                <h6 className="font-semibold text-gray-700 dark:text-white sm:w-1/2">
                                    {project.name}
                                </h6>

                                <div className="sm:w-1/2">
                                    <Label>Assign Role</Label>
                                    <Select
                                        placeholder="Select role"
                                        defaultValue={selectedRoles[project.id]?.toString() ?? ""}
                                        options={roleList.map((role) => ({
                                            label: role.name,
                                            value: role.id.toString(),
                                        }))}
                                        onChange={(val) => handleRoleChange(project.id, Number(val))}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button size="sm">
                            {userForm ? "Update User" : "Create User"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
