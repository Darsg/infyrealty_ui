import { useEffect, useState } from "react";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";

interface UserForm {
    user_id?: number;
    name: string;
    contact_code: number;
    mobile_no: string;
    email: string;
    address1: string;
    description: string;
}

interface UserManageFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onCancel: () => void;
    onSave: () => void;
    userForm?: UserForm | null;
}

export default function UserManageForm({
    isOpen,
    setIsOpen,
    onCancel,
    onSave,
    userForm,
}: UserManageFormProps) {
    const [formData, setFormData] = useState<UserForm>({
        name: "",
        contact_code: 91,
        mobile_no: "",
        email: "",
        address1: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBack = () => {
        setIsOpen(false);
        onCancel();
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("New Record looks like", formData);
        onSave();
    };

    useEffect(() => {
        if (userForm) {
            setFormData({
                name: userForm.name || "",
                contact_code: userForm.contact_code || 0,
                mobile_no: userForm.mobile_no || "",
                email: userForm.email || "",
                address1: userForm.address1 || "",
                description: userForm.description || "",
                user_id: userForm.user_id,
            });
        }
    }, [userForm]);

    return (
        <Modal isOpen={isOpen} onClose={handleBack} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {userForm ? "Update User Details" : "Add User Details"}
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        All fields are required and user will only be able to login via email, so please verify it carefully.
                    </p>
                </div>

                <form onSubmit={handleAdd} className="flex flex-col">
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            User Details
                        </h5>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div>
                                <Label>Name</Label>
                                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Contact Code</Label>
                                <Input type="number" name="contact_code" value={formData.contact_code} onChange={handleChange} />
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
                                <Label>Address</Label>
                                <Input type="text" name="address1" value={formData.address1} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Address</Label>
                                <Input type="text" name="address1" value={formData.address1} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input type="text" name="description" value={formData.description} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={handleBack}>
                            Cancel
                        </Button>
                        <Button size="sm">
                            {userForm?.user_id ? "Update User" : "Create User"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
