import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

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
  const { login, authState } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (authState.token) {
      navigate("/dashboard");
    }
  }, [authState.token, navigate]);

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
      login(token);

      // Redirect to dashboard or update app state

      navigate("/dashboard");
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error Response:", error.response.data);
        alert(
          `Login failed: ${error.response.data.message || "Unknown error"}`
        );
      } else {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-around px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center max-w-[380px] order-2 sm:order-1"
      >
        <h1 className="text-[56px]  mb-4 text-center">Welcome back</h1>
        <p className="text-lg text-[#62626B] max-w-lg text-center mb-8">
          Step into our shopping metaverse for an unforgettable shopping
          experience
        </p>

        {/* Email Field */}
        <div className="mb-4 w-full">
          <input
            placeholder="Email"
            type="email"
            id="email"
            {...register("email")}
            className={`w-full  px-2 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6 w-full">
          <input
            placeholder="password"
            type="password"
            id="password"
            {...register("password")}
            className={` w-full px-2  py-2 border rounded ${
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
      <section className="relative order-1 sm:order-2">
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
