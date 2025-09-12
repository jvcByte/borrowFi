import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Borrow from "../components/Borrow";
import Repay from "../components/Repay";

const Main = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <SideBar />
          <div className="flex-1 overflow-y-auto md:ml-64">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/borrow" element={<Borrow />} />
              <Route path="/repay" element={<Repay />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Main;