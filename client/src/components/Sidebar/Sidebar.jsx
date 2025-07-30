import React from "react"

const Sidebar = () => {
    const suggestions = [
        "How to Start Blogging",
        "10 Tips for Writing Better Posts",
        "Understanding React Hooks",
        "Tailwind CSS Tricks",
        "SEO Basics for Beginners",
    ]
    return (
        <aside className="bg-gray-100 rounded-lg shadow p-4 w-full">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Suggestions
            </h3>
            <ul className="space-y-2">
                {suggestions.map((item, idx) => (
                    <li key={idx}>
                        <a
                            href="#"
                            className="text-sm text-blue-700 hover:underline"
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar
