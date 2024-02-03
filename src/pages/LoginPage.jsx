/* eslint-disable react/prop-types */
import { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Implement your actual login logic here
    // For simplicity, this example checks if both username and password are "admin"
    if (username === "admin" && password === "admin") {
      onLogin(); // Call the onLogin function passed from the parent component
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-xs">
        <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          {error && <p className="mt-3 text-xs italic text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
