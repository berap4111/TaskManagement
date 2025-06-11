// Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { authAction } from "../../store";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    const storedUsername = sessionStorage.getItem('username');
    console.log(storedUsername);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch()
    console.log(isLoggedIn);
    const logout = () => {
        sessionStorage.clear("id")
        dispatch(authAction.logout());
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const active = ({ isActive }) =>
        `${isActive ? 'active-link' : ''} hover:text-gray-300 transition duration-300 transform hover:scale-105`
    return (
        <nav className="bg-gradient-to-r items-center from-blue-600 via-indigo-700 to-purple-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600 transition duration-300 ease-in-out transform hover:scale-105">
                            <NavLink to="/">TaskWorld</NavLink>
                        </h1>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-6 text-lg font-semibold items-center gap-3">
                        <NavLink to="/" className={active
                        }>
                            Home
                        </NavLink>
                        <NavLink to="/about-us" className={active}>
                            About
                        </NavLink>
                        <NavLink to="/todo" className={active}>
                            Task Management
                        </NavLink>

                        {/* SignUp & SignIn Buttons */}

                        <div className="flex space-x-4 gap-3">
                            {!isLoggedIn && <><NavLink to="/SignUp">
                                <button className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition transform hover:scale-105 duration-300">
                                    SignUp
                                </button>
                            </NavLink>
                                <NavLink to="/Signin">
                                    <button className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 duration-300">
                                        SignIn
                                    </button>
                                </NavLink></>}
                            {isLoggedIn && (<NavLink to="/Logout" className="flex justify-between gap-3 items-center">
                                <button
                                    onClick={logout}
                                    className=" px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition transform hover:scale-105 duration-300">
                                    Logout
                                </button>
                                <div className="flex align-items-center gap-1 ">
                                    <CgProfile className="size-[40px]" />
                                    <span className="bg-orange-600 p-1 rounded-lg ">{storedUsername}</span>
                                </div>



                            </NavLink>)}


                        </div>
                    </div>

                    {/* Hamburger Menu (Mobile) */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-400 hover:text-white focus:outline-none">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 py-4 px-6 space-y-4 text-lg">
                    <NavLink to="/" className="block text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105">
                        Home
                    </NavLink>
                    <NavLink to="/about-us" className="block text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105">
                        About
                    </NavLink>
                    <NavLink to="/todo" className="block text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105">
                        Todo
                    </NavLink>
                    <NavLink to="/SignUp" className="block text-white hover:bg-green-600 px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105">
                        SignUp
                    </NavLink>
                    <NavLink to="/Signin" className="block text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105">
                        SignIn
                    </NavLink>
                    <NavLink to="/Logout" className="block text-white hover:bg-red-600 px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105">
                        Logout
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
