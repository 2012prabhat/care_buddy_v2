"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"

export default function Login() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleLogin = async (values) => {
    console.log("Login values:", values);
    const resp = await axios.post("/api/auth/login", {
      email:values.email,
      password:values.password
    });
    console.log(resp);
  };

  const handleForgotPassword = async (values) => {
    console.log("Forgot password values:", values);
  };

 
    const validationSchema = () => {
      return Yup.object().shape(
        
        isForgotPassword ? {
          forgotEmail: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        } : { 
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          // .min(8, "Password must be at least 8 characters")
          // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
          // .matches(/[@$!%*?&^#()[\]{}<>]/, "Password must contain at least one special character")
          .required("Password is required"),
      });
    };
  

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-slate-100 px-4 py-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row min-h-[500px] overflow-hidden">
        {/* Left Section */}
        <div
          className="
          w-full md:w-1/2 
          bg-[linear-gradient(to_right_top,#051937,#003c5a,#006171,#12867a,#67a97b)] 
          text-white flex flex-col items-center justify-center
          p-4 md:p-6
        "
        >
          <img
            className="max-w-24 md:max-w-32 rounded mt-6 mb-4"
            src="logo.png"
            alt="Logo"
          />

          <h1 className="text-2xl md:text-4xl font-bold text-center mb-2">
            Welcome Back!
          </h1>

          <p className="text-sm md:text-lg text-center px-2 md:px-6">
            Sign in to continue and explore more features of Care Buddy.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">
            {isForgotPassword ? "Forgot Password" : "Sign in"}
          </h2>

          {/* Formik */}
          <Formik
            initialValues={{ password: "", email: "", forgotEmail:"" }}
            validationSchema={validationSchema(isForgotPassword)}
            onSubmit={isForgotPassword ? handleForgotPassword : handleLogin}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* ------- LOGIN SECTION ------- */}
                {!isForgotPassword && (
                  <>
                    {/* Username */}
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Email
                      </label>

                      <Field
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Password
                      </label>

                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[linear-gradient(to_right_top,#051937,#003c5a,#006171,#12867a,#67a97b)] 
                      text-white font-medium py-2 px-4 rounded-lg hover:opacity-90 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                    <div className="text-center mt-4">
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsForgotPassword(true)}
                      >
                        Forgot Password?
                      </span>
                    </div>
                  </>
                )}

                {/* ------- FORGOT PASSWORD SECTION ------- */}
                {isForgotPassword && (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="forgotEmail"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Enter your email
                      </label>

                      <Field
                        type="email"
                        name="forgotEmail"
                        id="forgotEmail"
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <ErrorMessage
                        name="forgotEmail"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[linear-gradient(to_right_top,#051937,#003c5a,#006171,#12867a,#67a97b)] 
                      text-white font-medium py-2 px-4 rounded-lg hover:opacity-90 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Sending reset email..."
                        : "Send Reset Email"}
                    </button>

                    <div className="text-center mt-4">
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsForgotPassword(false)}
                      >
                        Back to Login
                      </span>
                    </div>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}