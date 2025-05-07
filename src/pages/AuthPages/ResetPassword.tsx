import { useState } from "react";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { resetPassword, sendOTP } from "../../service/apis/AuthService";
import { toast } from "react-toastify";
import { EyeCloseIcon, EyeIcon } from "../../icons";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpSend, setOtpSend] = useState(true);
    const [timer, setTimer] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const handleSendOtp = async () => {
        if (!email) {
            toast("Please enter your email.", { type: "error" });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("email", email);

            const response = await sendOTP(formData);

            if (response.status_code === 200) {
                setOtpSend(true);
                setTimer(30);

                const countdown = setInterval(() => {
                    setTimer(prev => {
                        if (prev === 1) {
                            clearInterval(countdown);
                        }
                        return prev - 1;
                    });
                }, 1000);
            }

            toast(response.msg, { type: response.alert });
        } catch (error) {
            console.error("Error while sending OTP:", error);
        }
    };

    const handleResetPassword = async () => {
        if (otp.length !== 6) {
            toast("OTP must be 6 digits.", { type: "error" });
            return;
        }

        if (newPassword.trim().length < 8) {
            toast("Enter a password with at least 8 characters.", { type: "error" });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast("Passwords do not match.", { type: "error" });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("email", email); // Change base on payload - darsh
            formData.append("otp", otp); // Change base on payload - darsh
            formData.append("new_password", newPassword); // Change base on payload - darsh
            // Add base on payload - darsh

            const response = await resetPassword(formData);

            toast(response.msg, { type: response.alert });

            if (response.status_code === 200) {
                setTimeout(() => {
                    window.location.href = "/signin";
                }, 2000);
            }
        } catch (error) {
            console.error("Error while resetting password:", error);
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
                                        <Input 
                                            type="text" 
                                            name="otp" 
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)} 
                                        />
                                    </div>

                                    <div>
                                        <Label>Enter New Password</Label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                name="newpassword"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="Enter your password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                            >
                                                {showPassword ? (
                                                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                                ) : (
                                                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Re-Enter New Password</Label>
                                        <Input 
                                            type="password" 
                                            name="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <Button size="sm" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                                        <Button size="sm" onClick={handleResetPassword}>Reset Password</Button>
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
