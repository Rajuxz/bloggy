import { Outlet } from "react-router"
import "./App.css"
import { Navbar, Hero } from "./components"

function App() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default App
