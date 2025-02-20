"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/api/api";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        const response = await signup(username, email, password);
        if (response.success) {
            alert("Signup successful! Please log in.");
            router.push("/login");
        } else {
            alert("Signup failed. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold text-center mb-4">Create Account</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full p-2 border mt-2"
                />
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
                <button onClick={handleSignup} className="bg-blue-500 px-4 py-2 rounded mt-4 w-full">
                    Sign Up
                </button>
                <p className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-600">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;