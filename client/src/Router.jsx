import { createBrowserRouter } from "react-router"
import App from "./App"
import { Hero } from "./components"
import { Dashboard } from "./pages"
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Hero /> },
            { path: "/login", element: <h1>Login Route test</h1> },
        ],
    },
    {
        path: "/admin",
        element: <Dashboard />,
        children: [
            { index: true, element: <h1>Default Dashboard</h1> },
            { path: "analytics/", element: <h1>Analytics</h1> },
            { path: "manage/", element: <h1>Manage</h1> },
            { path: "bots/", element: <h1>Bots</h1> },
            { path: "settings/", element: <h1>Settings</h1> },
            { path: "help/", element: <h1>Help</h1> },
            { path: "logout/", element: <h1>Logout</h1> },
        ],
    },
])

export { router }
