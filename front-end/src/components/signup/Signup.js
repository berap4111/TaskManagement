import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
// Define validation schema using Yup
const schema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const SignupForm = () => {
    const history = useNavigate()
    // Initialize the form with react-hook-form and yup validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Handle form submission
    const onSubmit = async (data) => {
        
        try {
            const response = await axios.post('http://localhost:5000/api/v1/register', data);
            console.log('User Registered:', response.data);
            if (response.data.message === "User Already Exists") {
                alert(response.data.message);
              } else {
                alert(response.data.message);
            // Show a success message or redirect as needed
            // alert('User registered successfully!');
            history("/SignIn")
              }
        } catch (error) {
            console.error(
                'Error registering user:',
                error.response ? error.response.data : error.message
            );
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-[#0000006d] p-10 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out hover:scale-105">
                <h2 className="text-4xl font-bold text-center text-[white] mb-8">
                    Sign Up
                </h2>

                {/* Form for username, email, and password */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Username */}
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-sm font-semibold text-[white] mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register('username', { required: 'Username is required' })}
                            className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-semibold text-[white] mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-8">
                        <label htmlFor="password" className="block text-sm font-semibold text-[white] mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Optional: Add a link to login page */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <Link to="/SignIn" className="text-indigo-600 hover:text-[white] font-semibold"> Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );



};

export default SignupForm;
