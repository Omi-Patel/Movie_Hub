"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import cookies from "js-cookie";

const Navbar = () => {
  const [token, setToken] = useState<string | null>(null); // State to manage token
  const [isHydrated, setIsHydrated] = useState(false); // State to track hydration status
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu

  // Set token on component mount
  useEffect(() => {
    const tokenFromCookie = cookies.get("token");
    setToken(tokenFromCookie ?? null); // Update token state based on cookie value
    setIsHydrated(true); // Set hydration state to true after client-side rendering
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

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            className="text-yellow-400 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
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

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search movies..."
            className="px-4 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-yellow-400"
          />
          {token ? (
            <>
              <Link
                href="/profile"
                className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-400"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-700 text-red-300 font-semibold rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
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
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-gray-800 text-white p-4 absolute inset-x-0 top-16 z-40 flex flex-col space-y-4 shadow-lg md:hidden">
          {/* Links */}
          <ul className="flex flex-col px-1 font-semibold tracking-wide space-y-4">
            <li>
              <Link
                href="/"
                className="hover:text-yellow-400 transition duration-200 "
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/movies"
                className="hover:text-yellow-400 transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/series"
                className="hover:text-yellow-400 transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Series
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-yellow-400 transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search movies..."
              className="px-4 py-2 w-full rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring focus:ring-yellow-400"
            />
          </div>

          {/* User Actions */}
          <div className="flex gap-5 justify-center items-center ">
            {token ? (
              <>
                <Link
                  href="/profile"
                  className="px-4 py-2 w-full text-center bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-4 py-2 w-full text-center bg-red-700 text-red-300 font-semibold rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-4 py-2 w-full text-center bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 w-full text-center bg-gray-700 text-gray-300 font-semibold rounded hover:bg-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
