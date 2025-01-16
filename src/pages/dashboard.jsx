import { NavLink, Outlet, Link } from "react-router-dom";
import Logo from "assets/img/dashboardlogo.png"
import { useState } from "react";

import Dashboardsvg from "assets/svg/dashboard.svg";
import Profile from "assets/svg/profile.svg";
import Report from "assets/svg/report.svg";
import Users from "assets/svg/users.svg";
import QR from "assets/svg/qr.svg";
import Writing from "assets/svg/writing.svg";

const NavLinkPicker = ({ to, svg, svgalt, section }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg flex gap-x-3 ${
          isActive ? "bg-blue-600" : "hover:bg-gray-700"
        }`
      }
    >
      <img src={svg} alt={svgalt} />
      <p>{section}</p>
    </NavLink>
  );
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-blue-950 text-white fill-white md:hidden"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        )}
      </button>
      <aside className={`
        fixed md:static w-64 bg-blue-950 text-white p-4 min-h-screen
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 z-40
      `}>
        <Link className="h-0" to="/">
          <img className="w-full pl-4 pr-10 mt-4" src={Logo} alt="Dashboard Galoiss Logo" />
        </Link>
        <nav className="space-y-2 pt-8">
          <div className="text-start text-sm font-semibold py-2 px-4 text-neutral-200">
            <p>General</p>
          </div>
          <NavLinkPicker to="/dashboard/overview" svg={Dashboardsvg} svgalt="Dashboard" section="Dashboard" />
          <NavLinkPicker to="/dashboard/report" svg={Report} svgalt="Report" section="Reporte" />
          <NavLinkPicker to="/dashboard/qr-reader" svg={QR} svgalt="Lector QR" section="Lector QR" />
          <NavLinkPicker to="/dashboard/users" svg={Users} svgalt="Usuarios" section="Usuarios" />
          <NavLinkPicker to="/dashboard/tuitition" svg={Writing} svgalt="writing" section="Matrícula" />
          <div className="text-start text-sm font-semibold pt-4 pb-2 px-4 text-neutral-200">
            <p>Admin</p>
          </div>
          <NavLinkPicker to="/dashboard/profile" svg={Profile} svgalt="Perfil" section="Perfil" />
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100 h-dvh overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
};

export default Dashboard;