import React from "react"
import { Outlet } from "react-router"
import Sidebar from "./Sidebar"

const Dashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Page content */}
            <main className="flex-1 bg-gray-400 p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default Dashboard
