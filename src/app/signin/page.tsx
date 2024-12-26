"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // eslint-disable-next-line
  const handleSignin = async (e: any) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        return toast.error("All Fields are required");
      }

      const res = await axios.post(
        `${process.env.BASE_URL}/api/user/auth/login`,
        { email, password }
      );

      const data = res.data;
      toast.success(data.message);
      window.location.href = "/";
      // eslint-disable-next-line
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors or network issues
        toast.error("Unexpected Error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-4">
          Welcome Back!
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Log in to access your favorite movies and more!
        </p>

        {/* Form */}
        <form>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 mb-2 text-sm">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-400 mb-2 text-sm"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={(e) => handleSignin(e)}
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md hover:bg-yellow-400 transition duration-200"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-yellow-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
