import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async function (e: any) {
    e.preventDefault();
    console.log({
      email,
      password,
      full_name: fullName,
    });
    const response = await fetch("http://localhost:3000/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
      }),
    });

    const json = await response.json();
    if (response.ok) {
      // localStorage.setItem('token', token);
      navigate("/chat-rooms");
    } else {
    }
    console.log(json);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Chat Room Registration</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="full_name"
            type="text"
            placeholder="Full Name"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button className="bg-blue-700 p-2 w-full rounded-md text-white">
            Register
          </button>
        </div>
        <div>
          <Link to="/">
            <span>Already have an account ? </span>{" "}
            <span className="text-blue-700">Sign In</span>
          </Link>
        </div>
        {/* Password input and submit button */}
      </form>
    </div>
  );
}

export default SignUp;
