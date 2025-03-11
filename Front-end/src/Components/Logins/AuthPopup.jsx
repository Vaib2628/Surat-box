import axios from "axios";
import { Cross, CrossIcon, X } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { StoreContext } from "../Context/StoreContext";

export default function AuthPopup({ isOpen, setisOpen, onClose, isMenuOpen, setIsMenuOpen }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { token, login, logout, proxy } = useContext(StoreContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true); // Disable the button and show "Submitting..."

      if (isLogin) {
        console.log("Logging in with", data);
        const response = await axios.post(`${proxy}/api/auth/login`, data);

        if (response.data?.user?.token) {
          login(response.data.user.token);
          //for the desktop nav
          setisOpen(false);
          //for the mobile nav 
          if (isMenuOpen) setIsMenuOpen(false);

          alert("Logged in successfully");
        } else {
          throw new Error("Invalid login credentials");
        }
      } else {
        console.log("Signing up with", data);
        const response = await axios.post(`${proxy}/api/auth/register`, data);

        if (response.data.success) {
          alert("Sign up successfully");
          setIsLogin(true);
        } else {
          throw new Error("Sign up failed, please check your details.");
        }
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Invalid details. Please try again.");
    } finally {
      setIsSubmitting(false); // Enable button again
    }
  };


  const verifyOtp = (data) => {
    console.log("Verifying OTP", data.otp);
    onClose();
  };

  return (
    <div className={`${isOpen ? "fixed inset-0 flex items-center z-10 justify-center" : "hidden"}`}
      onClick={() => setisOpen(false)}
    >
      <div className="w-full h-full absolute bg-black opacity-70"></div>
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg z-50 relative opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-center">{isLogin ? "Login" : isOtpSent ? "Verify OTP" : "Sign Up"}</h2>
        {!isOtpSent ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="border p-2 rounded"
                {...register("name", { required: "Name is required" })}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              {...register("email", { required: "Email is required" })}
            />
            {!isLogin && (
              <input
                type="number"
                placeholder="Phone Number"
                className="border p-2 rounded"
                {...register("phone", { required: "Phone number is required" })}
              />
            )}
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded"
              {...register("password", { required: "Password is required" })}
            />
            <button type="submit" disabled={isSubmitting}
              className="bg-blue-600 text-white p-2 rounded disabled:opacity-50 disabled:bg-gray-400">
              {isSubmitting ? "Submitting..." : isLogin ? "Login" : "Sign Up"}
            </button>

          </form>
        ) : (
          <form onSubmit={handleSubmit(verifyOtp)} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="border p-2 rounded"
              {...register("otp", { required: "OTP is required" })}
            />
            <button type="submit" className="bg-green-600 text-white p-2 rounded">Verify OTP</button>
          </form>
        )}
        {!isOtpSent && (
          <p className="text-center text-sm mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="text-blue-600 ml-1 cursor-pointer"
              onClick={() => {
                setIsLogin(!isLogin);
                setIsOtpSent(false);
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        )}
        <button onClick={() => { setisOpen(false) }} className="cursor-pointer absolute top-7 right-7 text-gray-600 hover:text-gray-900 transition-colors"><X /></button>
      </div>
    </div>
  );
}
