import { useState } from "react";
import ComponentCardWithButton from "../../../../components/common/ComponentCardWithButton";
import PageMeta from "../../../../components/common/PageMeta";
import { useNavigate } from "react-router";
import RoleManageTable from "./RoleManageTable";
import RoleManageFormOne from "./RoleManageFormOne";
import mockPermissionResponse from "../../../../service/utility/Utility";

export default function SettingRoleManage() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleStaffManage = () => {
        console.log("Click fire", isOpen);
        navigate("/setting/staff-management", { replace: true })
    }

    return (
        <>
            <PageMeta
                title="React.js Role Management"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <ComponentCardWithButton title="Role Management" 
                backButton={true} onBackButtonClick={handleStaffManage}
                buttonTitle="Add Role" onButtonClick={() => setIsOpen(true)} 
            >
                <div className="space-y-6">
                    <RoleManageTable onEdit={() => console.log("clicked...")}/>
                    {/* <RoleManageForm isOpen={isOpen} setIsOpen={setIsOpen} onCancel={() => setIsOpen(false)} onSave={handleSave} /> */}
                    <RoleManageFormOne data={mockPermissionResponse} isOpen={isOpen} setIsOpen={setIsOpen} onSave={() => console.log("Refresh role table")}/>
                </div>
            </ComponentCardWithButton>
        </>
    );
}