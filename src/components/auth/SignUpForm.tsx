import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { signUp, sendOTP } from "../../service/apis/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await signUp(data);

      if(response.status_code === 200) {
        console.log("Sign Up Response:", response);
        toast.success(response.msg);
        handleSendOtp(response.email, response.user_id);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        console.error("Sign Up Error:", error.response.data);
    
        const errors = error.response.data?.error;
        if (Array.isArray(errors) && errors.length > 0) {
          const firstError = errors[0];
          toast.error(firstError.msg);
        }
      }else {
        console.error("Unexpected Error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleSendOtp = async (email: string, user_id: number) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("user_id", user_id.toString());
      
      const response = await sendOTP(formData);
      
      if (response.status_code === 200) {
        toast.success(response.msg);
        localStorage.setItem("user_id", response.user_id);
        localStorage.setItem("otp_id", response.otp_id.toString());
        navigate("/otp-verification");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to home
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- Business Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Business Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your business name"
                    />
                  </div>
                  {/* <!-- Email Address --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Email<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- Country Code --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Country Code<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="contact_code"
                      name="contact_code"
                      placeholder="Enter your country code"
                    />
                  </div>
                  {/* <!-- Mobile Number --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Mobile Number<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="contact_no"
                      name="contact_no"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- Address One --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Address 1<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="address1"
                      name="address1"
                      placeholder="Enter your address"
                    />
                  </div>
                  {/* <!-- Address Two --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Address 2<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="address2"
                      name="address2"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- City --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      City<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Enter your city"
                    />
                  </div>
                  {/* <!-- State --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      State<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="Enter your state"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- Coutry --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Country<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="Enter your country"
                    />
                  </div>
                  {/* <!-- Zip Code --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Zip Code<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="zipcode"
                      name="zipcode"
                      placeholder="Enter your zip code"
                    />
                  </div>
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Checkbox --> */}
                {/* <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account means you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions,
                    </span>{" "}
                    and our{" "}
                    <span className="text-gray-800 dark:text-white">
                      Privacy Policy
                    </span>
                  </p>
                </div> */}
                {/* <!-- Button --> */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account? {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
