import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authAction } from "../../store";
function SignIn() {
    const dispatch = useDispatch()
    const history = useNavigate()
    const [Input, setInput] = useState({ email: "", password: "" })
    const change = (e) => {

        const { name, value } = e.target
        setInput({ ...Input, [name]: value })
        console.log(Input)
    }
    const submit = async () => {
        if (!Input.email || !Input.password) {

            toast.warning("please fill the blank box")
            return;
        } else {
            await axios.post("http://localhost:5000/api/v1/login", Input).then((response) => {

                if (response.data.message === "you are not register") {
                    toast.error("you are not register")
                }
                else if (response.data.message === "Incorrect password") {
                    toast.error("please enter correct password")
                } else {
                    setInput({ email: "", password: "" })
                    sessionStorage.setItem("id", response.data._id)
                    sessionStorage.setItem("username", response.data.username)
                    dispatch(authAction.login())
                    history("/todo")
                }



            })
        }
    }




    return (
        <div className=" relative min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex justify-center items-center overflow-hidden">
            <ToastContainer />
            {/* Animated Particles */}
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-30 animate-pulse bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 z-10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 z-0"></div>

            <div className="relative bg-[#00000082] p-12 rounded-3xl shadow-2xl w-full max-w-xl z-20 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <h2 className="text-4xl font-semibold text-center text-[white] mb-8 tracking-tight">Sign In</h2>
                <div className="space-y-8">
                    {/* Email Field */}
                    <div className="transform transition duration-500 hover:scale-105">
                        <label htmlFor="email" className="block text-sm font-medium text-[white] mb-2">Email</label>
                        <input
                            value={Input.email}

                            onChange={change}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className=" w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="transform transition duration-500 hover:scale-105">
                        <label htmlFor="password" className="block text-sm font-medium text-[white] mb-2">Password</label>
                        <input
                            onChange={change}
                            value={Input.password}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={submit}
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-full shadow-xl hover:bg-gradient-to-l focus:outline-none transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                    >
                        Sign In
                    </button>
                </div>

                {/* Forgot Password Link */}
                <div className="mt-4 text-center">
                    <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out">
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
