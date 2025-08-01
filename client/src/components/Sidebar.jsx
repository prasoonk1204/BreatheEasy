import { ChevronFirst, MoreVertical } from "lucide-react";
import { Children } from "react";

export default function Sidebar() {
    return(
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src="favicon.ico" alt="Logo" className="w-32" />
                    <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"> 
                        <ChevronFirst/>
                    </button>
                </div>
                <ul className="flex-1 px-3">
                    {Children}
                </ul>
                <div className="border-t flex p-3">
                    <img src="logo.svg" alt="" className="w-10 h-10 rounded-md"/>
                    <div className="flex justify-between items-center w-52 ml-3"></div>
                    <div className="leading-4">
                        <h4 className="font-semibold">User Name</h4>
                        <span className="text-xs text-gray-500">user@example.com</span>
                    </div>
                    <MoreVertical size={20}/>
                </div>
            </nav>
            

        </aside>
    )
}

export function SidebarItem({icon,text,active,alert }) {
    return(
        <li>
            {icon}
            <span>{text}</span>
        </li>
    )
}