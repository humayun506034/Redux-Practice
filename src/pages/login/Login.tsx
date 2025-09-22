import { useState } from "react";
import { useLoginMutation } from "../../redux/features/Auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/Auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login clicked:", { email, password });

    try {
      const result = await login({ email, password }).unwrap();
      console.log("🚀 ~ handleSubmit ~ result:", result);

      if (result?.data?.accessToken && result?.data?.user) {
        dispatch(
          setUser({
            user: result.data.user,
            accessToken: result.data.accessToken,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Please login to continue
        </p>

        {/* Email */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition font-medium shadow-md"
        >
          Login
        </button>

        {/* Extra Links */}
        <div className="mt-6 flex justify-between text-sm text-gray-500">
          <a href="#" className="hover:text-indigo-600">
            Forgot Password?
          </a>
          <a href="#" className="hover:text-indigo-600">
            Create Account
          </a>
        </div>
      </form>
    </div>
  );
}
