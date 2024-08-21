import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async function (e: any) {
    e.preventDefault();
    // Handle login logic
    const response = await fetch(
      "https://chat-backend-wfsb.onrender.com/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("token", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));
      navigate("/chat-rooms");
    } else {
    }
  };

  return (
    <div className="bg-[url('/work.jpg')] flex flex-col items-center  justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Chat Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-blue shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-#d8d8d8-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button className="bg-red-700 p-2 w-full rounded-md text-white">
            Login
          </button>
        </div>
        <div>
          <Link to="/SignUp">
            <span>Don't have an account ? </span>{" "}
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        {/* Password input and submit button */}
      </form>
    </div>
  );
}

export default Login;
