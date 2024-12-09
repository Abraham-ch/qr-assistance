import { NavLink, Outlet, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <Link className="text-2xl font-semibold" to="/">Logo</Link>
        <nav className="space-y-2 pt-4">
          <NavLink
            to="/dashboard/overview"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            Configuración
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            Perfil
          </NavLink>
          <NavLink
            to="/dashboard/qr-reader"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            QR Scanner
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  )
};

export default Dashboard;