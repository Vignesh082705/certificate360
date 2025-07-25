import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      // Set persistence to stay logged in
      await setPersistence(auth, browserLocalPersistence);

      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate after successful login
      navigate('/certificate');
    } catch (error) {
      setError("Login Failed:Invalid Credential");
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-15 mb-15">
        <img 
          src={logo} 
          alt="Compliance360 Logo" 
          className="w-40"
        />
      </div>
    <div className="flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
