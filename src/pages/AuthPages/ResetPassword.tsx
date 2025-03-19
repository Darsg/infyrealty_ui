import { useState } from "react";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { sendOTP } from "../../service/apis/AuthService";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [otpSend, setOtpSend] = useState(true);
    const [timer, setTimer] = useState(0);

    const handleSendOtp = async () => {
        if (!email) {
            alert("Please enter your email.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("email", email);

            const response = await sendOTP(formData);

            if (response.status_code === 200) {
                setOtpSend(true);
                setTimer(60);
                
                const countdown = setInterval(() => {
                    setTimer(prev => {
                        if (prev === 1) {
                            clearInterval(countdown);
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        } catch (error) {
            console.error("Error while sending OTP:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-5 lg:p-6">
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 p-6 bg-white shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="space-y-6">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Note:</strong> Please do not refresh this page or use the back button while updating your password.
                    </p>

                    <div className="max-h-[450px] overflow-y-auto px-2 pb-3">
                        <h5 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">Reset Password</h5>

                        <div className="grid grid-cols-1 gap-5">
                            {/* Email Input with Send OTP Button */}
                            <div>
                                <Label>Email</Label>
                                <Input 
                                        type="email" 
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                <button 
                                    onClick={handleSendOtp} 
                                    disabled={timer > 0}
                                    className={`hover:pointer-cursor text-blue-500 pt-2 flex justify-end ${
                                        timer > 0 ? "opacity-50 cursor-not-allowed" : "hover:underline"
                                    }`}
                                >
                                    {timer > 0 ? `Resend OTP (${timer}s)` : "Send OTP"}
                                </button>
                            </div>

                            {/* OTP and Password Fields (Shown after OTP is sent) */}
                            {otpSend && (
                                <>
                                    <div>
                                        <Label>OTP</Label>
                                        <Input type="text" name="otp" />
                                    </div>

                                    <div>
                                        <Label>Enter New Password</Label>
                                        <Input type="password" name="newpassword" />
                                    </div>

                                    <div>
                                        <Label>Re-Enter New Password</Label>
                                        <Input type="password" name="password" />
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <Button size="sm" variant="outline">Cancel</Button>
                                        <Button size="sm">Reset Password</Button>
                                    </div>
                                </>
                            )}
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    );
}
