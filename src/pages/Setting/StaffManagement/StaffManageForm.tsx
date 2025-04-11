import React, { useEffect, useState } from "react";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Button from "../../../components/ui/button/Button";
import { Modal } from "../../../components/ui/modal";
import Switch from "../../../components/form/switch/Switch";

interface StaffForm {
    id?: number,
    name: string,
    mobile_no: string,
    email: string,
    speciality: string,
    role: string,
    allow_login: boolean,
}

interface StaffManageFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onCancel: () => void;
    onSave: () => void;
    staffForm?: StaffForm | null;
}

export default function StaffManageForm ({ isOpen, setIsOpen, onCancel, onSave, staffForm }: StaffManageFormProps) {

    const [formData, setFormData] = useState<StaffForm>({
        name: "",
        mobile_no: "",
        email: "",
        speciality: "",
        role: "",
        allow_login: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBack = () => {
        setIsOpen(false)
        onCancel()
    }

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("New Record look like ", formData)
        onSave()
    }

    useEffect(() => {
        if (staffForm) {
            setFormData(staffForm);
        }
    }, [staffForm]);

    return (
      <Modal isOpen={isOpen} onClose={handleBack} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {staffForm ? "Update Staff Details" : "Add Staff Details"}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              All field are required and user will be only able to login via Email so cross verify this.
            </p>
          </div>
          
          <form onSubmit={handleAdd} className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Project Details</h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                  <Label>Mobile Number</Label>
                  <Input type="text" name="mobile_no" value={formData.mobile_no} onChange={handleChange} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <Label>Speciality</Label>
                  <Input type="text" name="speciality" value={formData.speciality} onChange={handleChange} />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input type="text" name="role" value={formData.role} onChange={handleChange} />
                </div>
                <div>
                  <Label>Allow Login</Label>
                  <Switch
                      label=""
                      defaultChecked={staffForm?.allow_login}
                      onChange={(checked) => setFormData({ ...formData, allow_login: checked })}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={handleBack}>Cancel</Button>
              <Button size="sm" >{staffForm ? "Update Project" : "Create Project"}</Button>
            </div>
          </form>
        </div>
      </Modal>
    );
}