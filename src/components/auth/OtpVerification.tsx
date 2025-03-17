import { useState, useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { sendOTP, verifyOTP } from "../../service/apis/AuthService";
import { toast } from "react-toastify";

export default function OtpVerification() {
    const { isOpen, openModal } = useModal();
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        openModal();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 6) {
            setOtp(value);
        }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            const formData = new FormData();
            formData.append("otp_id", localStorage.getItem("otp_id") || "");
            formData.append("otp", otp);

            const response = await verifyOTP(formData);
            if (response.status_code === 200) {
                toast.success(response.msg);
                navigate("/signin", { replace: true });
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("Verify OTP Error:", error);
            toast.error("Something went wrong. Please try again");
        }
    };

    const handleResendOtp = async () => {
        try {
          const formData = new FormData();
          formData.append("email", localStorage.getItem("email") || "");
          formData.append("user_id", localStorage.getItem("user_id") || "");
          
          const response = await sendOTP(formData);
          
          if (response.status_code === 200) {
            toast.success(response.msg);
            navigate("/signin");
          } else {
            toast.error(response.msg);
          }
        } catch (error) {
          console.error("Send OTP Error:", error);
          toast.error("Something went wrong. Please try again.");
        }
    };

    const handleBack = () => {
        navigate("/signup", { replace: true });
    };

    return (
        <Modal isOpen={isOpen} onClose={handleBack} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        OTP Verification
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Open your email and enter the OTP to verify your account.
                    </p>
                </div>
                <form className="flex flex-col">
                    <div className="px-2 pb-3">
                        <div className="mt-7">
                            <Label>OTP</Label>
                            <Input
                                type="text"
                                value={otp}
                                onChange={handleChange}
                                maxLength={6}
                                placeholder="XXXXXX"
                                className="w-full text-center border rounded-md focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <p className="mb-6 pt-4 text-sm font-normal lg:mb-7">
                            Didn't get the OTP?{" "}
                            <a
                                href="#"
                                onClick={handleResendOtp}
                                className="text-brand-500 hover:underline dark:text-brand-500"
                            >
                                Resend
                            </a>
                        </p>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" onClick={handleSave} disabled={otp.length !== 6}>
                            Verify
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
