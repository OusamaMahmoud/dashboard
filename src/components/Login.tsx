import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import { FaEnvelope, FaLock } from "react-icons/fa";
// Define Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Infer TypeScript types from Zod schema
type LoginSchema = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, isAuthanticated, token } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthanticated) {
      navigate("/dashboard"); // Navigate to dashboard if authenticated
    }
  }, [isAuthanticated, token]);

  const onSubmit = async (data: LoginSchema) => {
    console.log("Login Data:", data);

    try {
      // Perform login API call
      const response = await axios.post(
        "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
        {
          email: data.email,
          password: data.password,
          isEmployee: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If successful, retrieve the token
      const { token } = response.data;

      console.log("Login Successful. Token:", token);
      setToken(token); // Set token in the Zustand store

      // Show toast message
      toast.success("Login Successful!");

      // Navigate to dashboard after 2 seconds
      navigate("/dashboard");
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error Response:", error.response.data);
        toast.error(
          `Login failed: ${error.response.data.message || "Unknown error"}`
        );
      } else {
        console.error("Error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="relative h-full flex flex-col sm:flex-row items-center justify-around px-10 py-4 bg-gradient-to-r from-[#E477F6] to-[#9E77F6] overflow-hidden">
      {/* Background with circular blurred gradient effect */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_#FFFFFF,_transparent)] opacity-80 backdrop-blur-xl"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_#FFFFFF,_transparent)] opacity-80 backdrop-blur-lg"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,_#FFFFFF,_transparent)] opacity-80 backdrop-blur-lg"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,_#FFFFFF,_transparent)] opacity-60 backdrop-blur-lg"></div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center max-w-[380px] order-2 sm:order-1 z-10 relative"
      >
        <ToastContainer />
        <h1 className="text-[56px] mb-4 text-center">Welcome back</h1>
        <p className="text-lg text-[#62626B] max-w-lg text-center mb-8">
          Step into our shopping metaverse for an unforgettable shopping
          experience
        </p>

        {/* Email Field */}
        <div className="mb-4 w-full relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaEnvelope />
          </div>
          <input
            placeholder="Email"
            type="email"
            id="email"
            {...register("email")}
            className={`w-full pl-10 px-2 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6 w-full relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaLock />
          </div>
          <input
            placeholder="Password"
            type="password"
            id="password"
            {...register("password")}
            className={`w-full pl-10 px-2 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-[#9414FF] text-white py-2 rounded hover:bg-[#9514ffef] transition"
        >
          Login
        </button>
      </form>

      {/* Right Image Section */}
      <section className="relative order-1 sm:order-2 z-10">
        <img
          src="/assets/login/meet.png"
          alt="login"
          className="w-[400px] h-[530px]"
        />
        <img
          src="/assets/login/logo.png"
          alt="logo"
          className="absolute top-[70%]"
        />
      </section>
    </div>
  );
};

export default Login;
