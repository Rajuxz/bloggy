import { SIDEBAR_ITEMS, BOTTOM_LINKS } from "./Links.jsx"
import { Link } from "react-router"
import classNames from "classnames"
import { useLocation } from "react-router"
const linkClasses =
    "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-300 mb-2 rounded-md duration-400 transition-all ease-in-out"
const Sidebar = ({ isOpen = true }) => {
    return (
        <div
            className={`bg-white ${isOpen ? "w-60 h-screen transition-transform ease-in-out duration-300" : "hidden"} w-60 p-3 md:flex flex-col text-black `}
        >
            <div className="flex-1">
                <div className="flex items-center gap-2 px-1 py-2">
                    <span className="text-base tracking-wide">Admin Area</span>
                </div>
                <div className="pt-8 gap-0.5 flex flex-col flex-1 ">
                    {SIDEBAR_ITEMS.map((item) => {
                        return <SidebarLink key={item.key} item={item} />
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-t-black text-sm">
                {BOTTOM_LINKS.map((item) => {
                    return <SidebarLink key={item.key} item={item} />
                })}
            </div>
        </div>
    )
}

function SidebarLink({ item }) {
    const { pathname } = useLocation()
    //   console.log(pathname);

    return (
        <Link
            to={item.link}
            className={classNames(
                pathname === item.link ? "text-black" : "text-gray-700",
                linkClasses,
                "text-sm"
            )}
        >
            <span>{item.icon}</span>
            {item.label}
        </Link>
    )
}

export default Sidebar
