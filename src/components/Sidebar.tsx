import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { DashboardIcon } from "@/assets/custom-icons/dashboard-icon";
import { BorrowIcon } from "@/assets/custom-icons/borrow-icon";
import { RepayIcon } from "@/assets/custom-icons/repay-icon";

export default function SideBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div>
            {/* Mobile menu button - Only visible on mobile */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-20 right-4 z-50 p-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-expanded={isSidebarOpen}
            >
                <span className="sr-only">Open sidebar</span>
                {isSidebarOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
                fixed md:fixed inset-y-0 top-16 md:top-20 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
                bg-gray-900 border-r border-gray-800 overflow-y-auto`}
            >
                <div className="flex-1 p-4 overflow-y-hidden">
                    <div className="space-y-2">
                        <Link
                            to="/"
                            className={`flex gap-2 items-center p-2 rounded-lg transition-colors duration-200 ${isActive('/') ? 'bg-gray-800 text-white font-bold' : 'text-gray-300 hover:bg-gray-800'
                                }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <DashboardIcon className={`${isActive('/') ? 'text-whte fon-extrabold' : 'text-gray-400'}`} />
                            <span className="text-lg md:text-xl font-base">Dashboard</span>
                        </Link>
                        <Link
                            to="/borrow"
                            className={`flex gap-2 items-center p-2 rounded-lg transition-colors duration-200 ${isActive('/borrow') ? 'bg-gray-800 text-white font-bold' : 'text-gray-300 hover:bg-gray-800'
                                }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <BorrowIcon className={`${isActive('/borrow') ? 'text-whte fon-extrabold' : 'text-gray-400'}`} />
                            <span className="text-lg md:text-xl font-base">Borrow</span>
                        </Link>
                        <Link
                            to="/repay"
                            className={`flex gap-2 items-center p-2 rounded-lg transition-colors duration-200 ${isActive('/repay') ? 'bg-gray-800 text-white font-bold' : 'text-gray-300 hover:bg-gray-800'
                                }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <RepayIcon className={`${isActive('/repay') ? 'text-whte fon-extrabold' : 'text-gray-400'}`} />
                            <span className="text-lg md:text-xl font-base">Repay</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}