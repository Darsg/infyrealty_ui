import { useState } from "react";
import ComponentCardWithButton from "../../components/common/ComponentCardWithButton";
import PageMeta from "../../components/common/PageMeta";
import BoxAlerts from "../UiElements/BoxAlerts";
import WriteMessageForm from "./WriteMessageForm";
import SupportTable from "./SupportTable";

interface MessageForm {
    country_code: string,
    mobile_no: string,
    message: string,
    file: string,
}

export default function Support() {

    const [callBackOpen, setCallBackOpen] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);  

    const handleCallBack = () => {
        setCallBackOpen(false);
        // Get the mobile number from redux store and call API
        console.log("We will call you shortly.");
    }

    const handleMessage = (messageForm: MessageForm) => {
        setMessageOpen(false);
        // Call API to send message
        console.log("Message sent successfully.", messageForm);
    }

    return (
        <>
            <PageMeta
                title="React.js Support"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <ComponentCardWithButton title="Support" 
                buttonTitle="Request CallBack" onButtonClick={() => setCallBackOpen(true)} 
                buttonTwoTitle="Write Message" onSecondButtonClick={() => setMessageOpen(true)}
            >
                <div className="space-y-6">
                    <SupportTable />
                </div>
            </ComponentCardWithButton>

            {callBackOpen && (
                <BoxAlerts 
                    onConfirm={handleCallBack} 
                    onCancel={() => setCallBackOpen(false)} 
                    title="Confirm Mobile Number" 
                    description="+98 7456321441, click on below button then we will call you shortly."
                    boxType="info"
                    isOpen={callBackOpen}/>
            )}

            {messageOpen && (
                <WriteMessageForm 
                    isOpen={messageOpen}
                    handleBack={() => setMessageOpen(false)}
                    handleSave={handleMessage} // Directly pass handleMessage
                />
            )}

        </>
    )
}