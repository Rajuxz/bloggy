import React from "react"
import { EyeIcon } from "@heroicons/react/24/solid"
import BarChart from "./Chart"
const Home = () => {
    return (
        <>
            <div className="w-full">
                <div className="py-2">
                    <h2 className="font-bold text-xl">Dashboard</h2>
                </div>
                <div className="flex flex-row items-center  justify-center flex-1">
                    <div className="flex w-full justify-around gap-4 py-3">
                        <div className="card flex-1 max-w-xs bg-gray-300 text-black p-5 shadow-sm flex  flex-row items-center justify-between">
                            <h2 className="card-title">10 Posts</h2>
                            <EyeIcon className="h-5 w-5 text-black" />
                        </div>

                        <div className="card flex-1 max-w-xs bg-gray-300 text-black p-5 shadow-sm flex flex-row items-center justify-between">
                            <h2 className="card-title">4 Category</h2>
                            <EyeIcon className="h-5 w-5 text-black" />
                        </div>

                        <div className="card flex-1 max-w-xs bg-gray-300 text-black p-5 shadow-sm flex flex-row  items-center justify-between">
                            <h2 className="card-title">20 New Viewers</h2>
                            <EyeIcon className="h-5 w-5 text-black" />
                        </div>
                    </div>
                </div>
                <div>
                    <BarChart />
                </div>
            </div>
        </>
    )
}

export default Home
