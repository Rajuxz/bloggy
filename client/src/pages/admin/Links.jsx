import {
    Squares2X2Icon,
    ArrowsRightLeftIcon,
    BeakerIcon,
    BugAntIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"

const iconClass = "h-4 w-4" // size similar to FontAwesome

const SIDEBAR_ITEMS = [
    {
        key: "dashboard",
        label: "Dashboard",
        link: "/admin",
        icon: <Squares2X2Icon className={iconClass} />,
    },
    {
        key: "Posts",
        label: "Posts",
        link: "manage-posts/",
        icon: <ArrowsRightLeftIcon className={iconClass} />,
    },
    {
        key: "manage",
        label: "Manage",
        link: "manage/",
        icon: <BeakerIcon className={iconClass} />,
    },
    {
        key: "bots",
        label: "Bots",
        link: "bots",
        icon: <BugAntIcon className={iconClass} />,
    },
]

const BOTTOM_LINKS = [
    {
        key: "settings",
        label: "Settings",
        link: "settings/",
        icon: <Cog6ToothIcon className={iconClass} />,
    },
    {
        key: "help",
        label: "Help",
        link: "help/",
        icon: <QuestionMarkCircleIcon className={iconClass} />,
    },
    {
        key: "logout",
        label: "Log Out",
        link: "logout/",
        icon: <ArrowRightOnRectangleIcon className={iconClass} />,
    },
]

export { SIDEBAR_ITEMS, BOTTOM_LINKS }
