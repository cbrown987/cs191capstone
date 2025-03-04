"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { login } from "../lib/api";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        // const response = await login(email, password);
        // if (response.success) {
        //     localStorage.setItem("username", response.username);
        //     router.push("/");
        // } else {
        //     alert("Login failed. Please check credentials.");
        // }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold text-center mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full p-2 border mt-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-2 border mt-2"
                />
                <button onClick={handleLogin} className="bg-blue-500 px-4 py-2 rounded mt-4 w-full">
                    Login
                </button>
                <p className="text-center mt-4">
                    Don't have an account? <a href="/signup" className="text-blue-600">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;