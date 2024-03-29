import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions/authActions';

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {
                email,
                password
            });

            if (response.data && response.data.role) {
                dispatch(loginSuccess(response.data));
                              
                if (response.data.role === 'admin') {
                    navigate('/admin/dashboard'); 
                } else {
                    navigate('/user/dashboard'); 
                }
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-lg px-10 py-8 bg-white shadow-lg rounded-3xl">
                <form onSubmit={handleLogin} className="space-y-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-900">Log In</h2>
                    {error && (
                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            {error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                            type="text" placeholder="Enter Email" name="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                        type="password" placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" type="submit">
                            Log In
                        </button>
                        <a href="#home" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                    </div>
                </form>
                <p className="mt-6 text-xs text-center text-gray-600">
                    Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
