import { useState } from "react";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import FileInput from "../../components/form/input/FileInput";
import TextArea from "../../components/form/input/TextArea";

interface MessageForm {
    country_code: string,
    mobile_no: string,
    message: string,
    file: string,
}

interface WriteMessageFormProps {
    isOpen: boolean;
    handleBack: () => void;
    handleSave: (formData: MessageForm) => void;
    messageForm?: MessageForm | null;
}
export default function WriteMessageForm( {isOpen, handleBack, handleSave}: WriteMessageFormProps ) {

    const [formData, setFormData] = useState<MessageForm>({
        country_code: "",
        mobile_no: "",
        message: "",
        file: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          console.log("Selected file:", file.name);
        }
    };  

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("New Record look like ", formData)
        handleSave(formData)
    }

    return (
        <Modal isOpen={isOpen} onClose={handleBack} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {"Get in touch with us"}
                    </h4>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                    <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Message Form</h5>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <Label>Country Code</Label>
                            <Input type="text" name="country_code" value={formData.country_code} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Mobile Number</Label>
                            <Input type="text" name="mobile_no" value={formData.mobile_no} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Message</Label>
                            <TextArea value={formData.message} onChange={(value) => setFormData({ ...formData, message: value })} />
                        </div>
                        <div>
                            <Label>Attach file</Label>
                            <FileInput onChange={handleFileChange} className="custom-class" />
                        </div>
                    </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={handleBack}>Cancel</Button>
                    <Button size="sm" >Generate Ticket</Button>
                    </div>
                </form>
            </div>
      </Modal>
    )
}