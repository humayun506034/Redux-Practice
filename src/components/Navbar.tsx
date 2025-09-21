import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  useCurrentToken,
  useCurrentUser,
} from "../redux/features/Auth/authSlice";
import { useGetMyProfileInfoQuery } from "../redux/features/Auth/authApi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = useAppSelector(useCurrentToken);
  console.log(token)
  const user = useAppSelector(useCurrentUser);
  console.log(user);
  const { data } = useGetMyProfileInfoQuery(token as string);
  console.log(data);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          <Link to="/">YourApp</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            className="text-gray-700 hover:text-indigo-600 transition"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-gray-700 hover:text-indigo-600 transition"
            to="/features"
          >
            Features
          </Link>
          <Link
            className="text-gray-700 hover:text-indigo-600 transition"
            to="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-gray-700 hover:text-indigo-600 transition"
            to="/about"
          >
            About
          </Link>
          {user?.id && (
            <Link
              className="text-gray-700 hover:text-indigo-600 transition"
              to="/dashboard"
            >
              Dashboard
            </Link>
          )}
          {!user?.id ? (
            <Link
              className="text-gray-700 hover:text-indigo-600 transition"
              to="/login"
            >
              Login
            </Link>
          ) : (
            <button
              //   onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/"
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/features"
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 transition"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 transition"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <button
            className="block w-full text-left px-6 py-3 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
