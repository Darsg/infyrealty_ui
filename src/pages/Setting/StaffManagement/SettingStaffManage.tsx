import { useState } from "react";
import ComponentCardWithButton from "../../../components/common/ComponentCardWithButton";
import PageMeta from "../../../components/common/PageMeta";
import StaffManageTable from "./StaffManageTable";
import StaffManageForm from "./StaffManageForm";

interface StaffForm {
    id?: number,
    name: string,
    mobile_no: string,
    email: string,
    speciality: string,
    role: string,
    allow_login: boolean,
}

export default function SettingStaffManage () {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<StaffForm | null>(null);

    const handleSave = () => {
        setIsOpen(false);
        setSelectedStaff(null);
        console.log("Clicked on save and data will be saved here.");
    }

    const handleCancel = () => {
        setIsOpen(false);
        setSelectedStaff(null);
    }

    const handleEdit = (staff: StaffForm) => {
        console.log("Editing Staff:", staff);
        setSelectedStaff(staff);
        setIsOpen(true);
    };

    const handleDelete = (staff: StaffForm) => {
        console.log("Deleting Staff:", staff);
    };

    return (
        <>
            <PageMeta
                title="React.js Staff Management"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <ComponentCardWithButton title="Staff Management" 
                buttonTitle="Add Staff" onButtonClick={() => setIsOpen(true)} 
                buttonTwoTitle="View Role" onSecondButtonClick={() => console.log("Role Management")}
            >
                <div className="space-y-6">
                    <StaffManageTable onEdit={handleEdit} onDelete={handleDelete}/>
                </div>
            </ComponentCardWithButton>

            {isOpen && (
                <StaffManageForm isOpen={isOpen} setIsOpen={setIsOpen} onCancel={handleCancel} onSave={handleSave} staffForm={selectedStaff}/>
            )}
        </>
    );
}