import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthPopup({ isOpen, setisOpen , onClose}) {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    if (isLogin) {
      console.log("Logging in with", data);
      // API Call
      let response = await axios.post("http://localhost:5000/api/auth/login", data);
      if(response.data.success) {
        console.log("Logged in successfully");
        setisOpen(false)
        alert("Logged in successfully")
      }
      else{
        alert("Login crediantials invalid ! Please check it again..")
      }
      
    } else {
      console.log("Signing up with", data);
      setIsOtpSent(true);
    }
  };

  const verifyOtp = (data) => {
    console.log("Verifying OTP", data.otp);
    onClose();
  };

  return (
    <div className={`${isOpen ? "fixed inset-0 flex items-center z-50 justify-center bg-slate-100 bg-opacity-50" : "hidden"}`}
    onClick={()=> setisOpen(false)}
    > 
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg"
      onClick={(e)=> e.stopPropagation()}
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
                type="tel"
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
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
              {isLogin ? "Login" : "Sign Up"}
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
              className="text-blue-600 ml-1"
              onClick={() => {
                setIsLogin(!isLogin);
                setIsOtpSent(false);
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        )}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">&times;</button>
      </div>
    </div>
  );
}
