"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // eslint-disable-next-line
  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      if (!name || !email || !password) {
        return toast.error("All Fields are required");
      }

      const res = await axios.post(`/api/user/auth/register`, {
        name,
        email,
        password,
      });

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
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-4">
          Create an Account
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Join Movie Hub and explore your favorite movies!
        </p>

        {/* Form */}
        <form>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-400 mb-2 text-sm"
            >
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
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
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={(e) => handleSignup(e)}
            type="submit"
            className="w-full bg-blue-500 text-gray-900 font-semibold py-2 rounded-md hover:bg-blue-400 transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
