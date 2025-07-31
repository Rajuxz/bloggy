import React from "react"
import { useState } from "react"
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"
import { useLocation } from "react-router"
const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false)
    const location = useLocation()
    console.log(location.pathname)
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev)
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark")
        } else {
            document.documentElement.classList.add("dark")
        }
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {" "}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />{" "}
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <a>Item 1</a>
                            </li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li>
                                        <a>Submenu 1</a>
                                    </li>
                                    <li>
                                        <a>Submenu 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a>Item 3</a>
                            </li>
                        </ul>
                    </div>
                    <a className="text-xl md:text-xl font-extrabold tracking-tight px-2">
                        Blog Bahadur
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex"></div>
                <div className="navbar-end flex items-center gap-2">
                    {location.pathname === "/login" ? (
                        ""
                    ) : (
                        <a className="btn btn-sm md:btn-sm bg-gray-200 text-black px-6 font-semibold rounded-lg shadow hover:bg-gray-300 transition">
                            Login
                        </a>
                    )}
                    <button
                        onClick={toggleDarkMode}
                        className="ml-2 btn btn-sm md:btn-sm bg-gray-800 text-white rounded-lg flex items-center px-4 hover:bg-gray-900 transition"
                        aria-label="Toggle dark mode"
                    >
                        <span className="relative w-5 h-5 flex items-center justify-center">
                            <span
                                key={darkMode ? "sun" : "moon"}
                                className="absolute inset-0 transition-all duration-300 ease-in-out transform"
                                style={{
                                    opacity: 1,
                                    scale: 1,
                                    transitionProperty: "opacity, transform",
                                }}
                            >
                                {darkMode ? (
                                    <SunIcon className="h-5 w-5" />
                                ) : (
                                    <MoonIcon className="h-5 w-5" />
                                )}
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar
