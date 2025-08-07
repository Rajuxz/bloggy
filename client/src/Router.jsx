import { createBrowserRouter } from "react-router"
import App from "./App"
import { Hero } from "./components"
import { AddPost, Dashboard, Home, Post } from "./pages"
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
            { index: true, element: <Home /> },
            { path: "manage-posts/", element: <Post /> },
            { path: "add-post/", element: <AddPost /> },
            { path: "manage/", element: <h1>Manage</h1> },
            { path: "bots/", element: <h1>Bots</h1> },
            { path: "settings/", element: <h1>Settings</h1> },
            { path: "help/", element: <h1>Help</h1> },
            { path: "logout/", element: <h1>Logout</h1> },
        ],
    },
])

export { router }
