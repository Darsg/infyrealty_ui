import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserManageTable from "./UserManageTable";
import UserManageForm from "./UserManageForm";
import PageMeta from "../../../components/common/PageMeta";
import ComponentCardWithButton from "../../../components/common/ComponentCardWithButton";
import { getUserList } from "../../../service/apis/AuthService";
import UserProjectRoleForm from "./UserProjectRoleForm";
import { UserForm } from "../../../type/usermanagment";

export default function SettingUserManage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenRoleForm, setIsOpenRoleForm] = useState(false);
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState<UserForm | null>(null);
    const [userList, setUserList] = useState<UserForm[]>([]); 

    const fetchUsers = async () => {
        try {
            const response = await getUserList();
            setUserList(response.records || []);
        } catch (error) {
            console.error("Failed to fetch user list:", error);
        }
    };

    const handleSave = () => {
        setIsOpen(false);
        setSelectedUser(null);
        setIsOpenRoleForm(false);
        fetchUsers();
    };

    const handleAddClick = () => {
        setIsOpen(true);
        setSelectedUser(null);
    };

    const handleCancel = () => {
        setIsOpen(false);
        setIsOpenRoleForm(false);
        setSelectedUser(null);
    };

    const handleEdit = (staff: UserForm) => {
        setSelectedUser(staff);
        setIsOpen(true);
    };

    const handleRoleClick = (staff: UserForm) => {
        console.log("Assign projectwise role to Staff:", staff);
        setSelectedUser(staff);
        setIsOpenRoleForm(true);
    }

    const handleDelete = (staff: UserForm) => {
        setSelectedUser(staff);
        console.log("Deleting Staff:", staff);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <PageMeta
                title="React.js Staff Management"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <ComponentCardWithButton
                title="User Management" 
                buttonTitle="Add User"
                onButtonClick={() => handleAddClick()}
                buttonTwoTitle="View Roles"
                onSecondButtonClick={() => navigate("/setting/role-management", { replace: true })}
                >
                <div className="space-y-6">
                    <UserManageTable 
                        onEdit={(user) => handleEdit(user)} 
                        onRoleClick={(user) => handleRoleClick(user)}
                        onDelete={(user) => handleDelete(user)}
                        userList={userList} />
                </div>
            </ComponentCardWithButton>

            {isOpen && (
                <UserManageForm
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onCancel={handleCancel}
                    onSave={handleSave}
                    userForm={selectedUser}
                />
            )}

            {isOpenRoleForm && (
                <UserProjectRoleForm 
                    isOpen={isOpenRoleForm}
                    onCancel={handleCancel}
                    onSave={handleSave}
                    userForm={selectedUser}
                />
            )}
        </>
    );
}
