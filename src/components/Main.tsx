import { useState } from "react";
import Header from "./Header";
import SideBar from "./Sidebar";
import Dashboard from "./Dashboard";

const Main = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        {/* Main content */}
        <div className="flex-1 overflow-y-auto md:ml-64">
          {/* Overlay for mobile when sidebar is open */}
          {isSidebarOpen && (
            <div
              className="fixed md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Main;
