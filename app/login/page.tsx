'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>('');
  const router = useRouter();

  const handleLogin = async () => {
    // Validate fields
    if (!username || !password) {
      setMessage('Please enter both username and password.');
      setMessageType('error');
      return;
    }

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'login', username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessageType('success');
        setMessage('Login successful! Redirecting...');
        setTimeout(() => router.push('/'), 1500);
      } else {
        setMessageType('error');
        setMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setMessageType('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        onClick={handleLogin}
        className="w-full bg-[#902425] text-white py-2 rounded"
      >
        Log In
      </button>

      {/* Signup link */}
      <p className="mt-4 text-sm text-center text-gray-600">
        Don&apos;t have an account?{' '}
        <button
          onClick={() => router.push('/signup')}
          className="text-[#902425] underline hover:text-[#701b1d] transition"
        >
          Sign up
        </button>
      </p>

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
    </div>
  );
}
