'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signupUser } from "@/app/lib/api";

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>('');
  const router = useRouter();

  const handleSignup = async () => {
    if (!username || !name || !email || !password) {
      setMessage('Please fill in all fields.');
      setMessageType('error');
      return;
    }
    
    try {
      const userData = {
        name,
        username,
        email,
        password,
      };
      
      const user = await signupUser(userData);
      
      // Successfully signed up
      localStorage.setItem('user', JSON.stringify(user));
      setMessageType('success');
      setMessage('Account created successfully! Redirecting...');
      setTimeout(() => router.push('/'), 1500);
    }
    catch (err) {
      setMessageType('error');
      setMessage(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <button
        onClick={handleSignup}
        className="w-full bg-[#902425] text-white py-2 rounded"
      >
        Sign Up
      </button>
      
      {/* Alert Box */}
      {message && (
        <div
          className={`mt-4 p-2 text-sm rounded ${
            messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {message}
        </div>
      )}
      
      {/* Login link */}
      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{' '}
        <button
          onClick={() => router.push('/login')}
          className="text-[#902425] underline hover:text-[#701b1d] transition"
        >
          Log in
        </button>
      </p>
    </div>
  );
}