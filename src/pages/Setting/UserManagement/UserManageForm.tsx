import { useEffect, useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { UserForm } from "../../../type/usermanagment";
import { createUser, updateUser } from "../../../service/apis/AuthService";
import { toast } from "react-toastify";

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
        id: undefined,
        name: "",
        contact_code: "91",
        contact_no: "",
        email: "",
        address: "",
        description: "",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBack = () => {
        setIsOpen(false);
        onCancel();
        onSave(); // -- darsh
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const data = new FormData();
    
            if (formData.id) {
                data.append("user_id", formData.id.toString());
            }else if (formData.password) {
                data.append("password", formData.password);
                data.append("city", "");
                data.append("state", "");
                data.append("country", "");
            }
    
            data.append("name", formData.name);
            data.append("contact_code", formData.contact_code);
            data.append("contact_no", formData.contact_no);
            data.append("email", formData.email);
            data.append("description", formData.description);
            data.append("address1", formData.address || "");
    
            const response = formData.id
                ? await updateUser(data)
                : await createUser(data);
    
            if (response?.error?.[0]?.msg) {
                toast(response.error[0].msg, { type: "error" });
                return;
            }
    
            toast(response.msg, { type: response.alert || "success" });
            setIsOpen(false);
            onSave();
        } catch (error) {
            console.error("Error creating/updating user:", error);
            toast("Something went wrong.", { type: "error" });
        }
    };
    

    useEffect(() => {
        if (userForm) {
            setFormData({
                id: userForm.id,
                name: userForm.name || "",
                contact_code: userForm.contact_code || "91",
                contact_no: userForm.contact_no || "",
                email: userForm.email || "",
                address: userForm.address || "",
                description: userForm.description || "",
                password: "",
            });
        } else {
            setFormData({
                id: undefined,
                name: "",
                contact_code: "91",
                contact_no: "",
                email: "",
                address: "",
                description: "",
                password: "",
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
                        All fields are required. The user will only be able to login via email, so please verify it carefully.
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
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label>Contact Code</Label>
                                <Input
                                    type="text"
                                    name="contact_code"
                                    value={formData.contact_code}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label>Mobile Number</Label>
                                <Input
                                    type="text"
                                    name="contact_no"
                                    value={formData.contact_no}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {!userForm && (
                                <div>
                                    <Label>Password</Label>
                                    <Input
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                            <div>
                                <Label>Address</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={handleBack}>
                            Cancel
                        </Button>
                        <Button size="sm" type="submit">
                            {userForm ? "Update User" : "Create User"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
