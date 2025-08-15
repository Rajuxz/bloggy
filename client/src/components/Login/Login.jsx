import React, { useRef, useState } from "react"
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid"
import axios from "axios"
const Login = () => {
    const usernameOrEmailRef = useRef(null)
    const passwordRef = useRef(null)
    const [credentials, setCredentials] = useState({
        identifier: "",
        password: "",
    })
    const [usernameOrEmailMessage, setUsernameOrEmailMessage] = useState("")
    const [passwordMessage, setPasswordMessage] = useState("")

    const handleChange = (event) => {
        const { name, value } = event.target
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const user = usernameOrEmailRef.current.value.trim()
        const password = passwordRef.current.value.trim()
        if (!user) {
            setUsernameOrEmailMessage("Username or Email is Required.")
            return
        }
        if (!password) {
            setPasswordMessage("Password is required.")
            return
        }
        console.log(credentials)
        // send api request for login
        try {
            const res = await axios.post("/api/v1/admin/login", credentials)
            if (res.data.statusCode == 200) {
                console.log("Login Successful.")
            } else {
                console.log("Something went wrong.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUsernameOrEmailChange = () => {
        if (usernameOrEmailRef.current.value.trim()) {
            setUsernameOrEmailMessage("")
        }
    }

    const handlePasswordChange = () => {
        if (passwordRef.current.value.trim()) {
            setPasswordMessage("")
        }
    }

    return (
        <div className="flex items-center justify-center flex-col py-36 w-full bg-slate-200">
            <div className="font-bold mb-3">Login</div>
            <form
                method="post"
                className="flex flex-col items-start justify-center gap-2 w-[250px]
            "
            >
                <div className="flex flex-col">
                    {usernameOrEmailMessage && (
                        <span className="text-red-700 text-sm">
                            {usernameOrEmailMessage}
                        </span>
                    )}
                    <div className="input">
                        <UserIcon className="text-black h-4 w-4" />
                        <input
                            ref={usernameOrEmailRef}
                            name="identifier"
                            value={credentials.identifier}
                            onChange={handleChange}
                            onInput={handleUsernameOrEmailChange}
                            type="email"
                            placeholder="Username or Email"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    {passwordMessage && (
                        <span className="text-red-700 text-sm">
                            {passwordMessage}
                        </span>
                    )}
                    <div className="input ">
                        <LockClosedIcon className="text-black h-4 w-4" />
                        <input
                            ref={passwordRef}
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            onInput={handlePasswordChange}
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                </div>
                <div className="flex items-start justify start">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn bg-gray-800 text-white"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
