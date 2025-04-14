import { useEffect, useState } from "react";
import ComponentCardWithButton from "../../../../components/common/ComponentCardWithButton";
import { useNavigate } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";
import UserManageTable from "./UserManageTable";
import UserManageForm from "./UserManageForm";
import { getUserList } from "../../../../service/apis/AuthService";

interface UserForm {
    id?: number;
    name: string;
    contact_code: string;
    contact_no: string;
    email: string;
    address: string;
    description: string;
    password?: string;
}

export default function SettingUserManage() {
    const [isOpen, setIsOpen] = useState(false);
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
        fetchUsers();
    };

    const handleAddClick = () => {
        setIsOpen(true);
        setSelectedUser(null);
    };

    const handleCancel = () => {
        setIsOpen(false);
        setSelectedUser(null);
    };

    const handleEdit = (staff: UserForm) => {
        console.log("Editing Staff:", staff);
        setSelectedUser(staff);
        setIsOpen(true);
    };

    const handleDelete = (staff: UserForm) => {
        console.log("Deleting Staff:", staff);
    };

    const handleBackClick = () => {
        navigate("/setting/staff-management", { replace: true });
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
                title="User Management" backButton={true} 
                onBackButtonClick={handleBackClick}
                buttonTitle="Add User"
                onButtonClick={() => handleAddClick()}>
                <div className="space-y-6">
                    <UserManageTable 
                        onEdit={(user) => handleEdit(user)} 
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
        </>
    );
}
