"use client";
import Link from "next/link";
import cookies from "js-cookie";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [token, setToken] = useState<string | null>(null); // State to manage token
  const [isHydrated, setIsHydrated] = useState(false); // State to track hydration status

  // Set token on component mount
  useEffect(() => {
    const tokenFromCookie = cookies.get("token");
    setToken(tokenFromCookie ?? null); // Update token state based on cookie value

    // Set hydration state to true after client-side rendering
    setIsHydrated(true);
  }, []);

  const handleLogout = () => {
    cookies.remove("token"); // Remove token from cookies
    setToken(null); // Update state immediately after logout
    window.location.href = "/signin"; // Redirect to signin page using window.location
  };

  

  // Don't render the navbar until the client has hydrated
  if (!isHydrated) return null;

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Movie Hub</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link
              href="/"
              className="hover:text-yellow-400 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/movies"
              className="hover:text-yellow-400 transition duration-200"
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              href="/series"
              className="hover:text-yellow-400 transition duration-200"
            >
              Series
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-yellow-400 transition duration-200"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search movies..."
            className="px-4 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* User Profile */}
        <div className="space-x-4">
          {token ? (
            // If token exists, show Profile button
            <Link
              href="/profile"
              className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-400"
            >
              Profile
            </Link>
          ) : (
            // If no token, show Login and Signup buttons
            <>
              <Link
                href="/signin"
                className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-400"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-gray-700 text-gray-300 font-semibold rounded hover:bg-gray-600"
              >
                Sign Up
              </Link>
            </>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-red-700 text-red-300 font-semibold rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
