import { useEffect, useState } from "react";
import { UserForm } from "../../../type/usermanagment";
import { getOrgRoleList, getUserProjectDetail, setProjectRole } from "../../../service/apis/AuthService";
import { Modal } from "../../../components/ui/modal";
import Label from "../../../components/form/Label";
import Button from "../../../components/ui/button/Button";
import { RoleProps } from "../../../type/permission";
import Select from "../../../components/form/Select";
import { toast } from "react-toastify";

interface RoleData {
    project_id: number;
    role_id: number;
    project_name: string;
}

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
    const [roleData, setRoleData] = useState<RoleData[]>([]);
    const [roleList, setRoleList] = useState<RoleProps[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<Record<number, number | null>>({});

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

    const fetchUserDetail = async (userId: string) => {
        try {
            const response = await getUserProjectDetail(userId);
    
            if (response?.status_code === 200) {
                setRoleData(response.records); // or whatever key holds the array
                const initialRoles: Record<number, number> = {};
                response.records.forEach((item: RoleData) => {
                    initialRoles[item.project_id] = item.role_id;
                });
                setSelectedRoles(initialRoles);
            }
        } catch (error) {
            console.log("Error while fetching user role: ", error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchRoleList();
            if (userForm?.id) {
                fetchUserDetail(String(userForm?.id));
            }
        }
    }, [isOpen]);

    const handleRoleChange = (projectId: number, roleId: number | null) => {
        setSelectedRoles((prev) => ({
            ...prev,
            [projectId]: roleId,
        }));
    };

    const handleSaveClick = async () => {
        const payload = Object.entries(selectedRoles)
        .filter(([, roleId]) => roleId !== null && roleId !== undefined)
        .map(([projectId, roleId]) => ({
            project_id: Number(projectId),
            role_id: roleId,
        }));

    
        try {
            const formData = new FormData();
            formData.append("user_id", String(userForm?.id));
            formData.append("role_project_list", JSON.stringify(payload));
    
            const response = await setProjectRole(formData);
            if (response.status_code === 200) {
                onSave();
            }
            toast(response.msg, { type: response.alert });
        } catch (error) {
            console.log("Error while saving data", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onCancel} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {userForm ? "Update User Role" : "Add User Role"}
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Assign Roles per Project
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
                        <div className="grid grid-cols-1 gap-5">
                        {roleData?.map((role) => (
                            <div
                                key={role.project_id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-5 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
                            >
                                <h6 className="font-semibold text-gray-700 dark:text-white sm:w-1/2">
                                    {role.project_name}
                                </h6>

                                <div className="sm:w-1/2">
                                    <Select
                                        placeholder="Select role"
                                        defaultValue={selectedRoles[role.project_id]?.toString() ?? ""}
                                        options={[
                                            { label: "None", value: "" }, // 👈 default "none" option
                                            ...roleList.map((r) => ({
                                                label: r.name,
                                                value: r.id.toString(),
                                            }))
                                        ]}
                                        onChange={(val) =>
                                            handleRoleChange(role.project_id, val === "" ? null : Number(val))
                                        }
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
