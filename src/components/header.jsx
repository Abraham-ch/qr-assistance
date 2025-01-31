import { Link } from "react-router-dom"
import Logo from "assets/img/dashboardlogo.png"

const Header = () => {
  return (
    <header className="items-center w-full px-8 flex justify-between text-2xl font-semibold h-16">
        <Link to="/" className="flex items-center justify-between">
          <img src={Logo} alt="Logo" className="h-10" />
        </Link>
        <div className="flex items-center">
          <Link to="/login" className="text-base font-medium leading-6 px-6 py-2 shadow-sm bg-blue-800 rounded-md text-white">
            Login
          </Link>
          <Link to="/register" className="text-neutral-500 border px-4 py-2 shadow-sm rounded-sm ml-10 text-base font-semibold leading-6">
            Register
          </Link>
        </div>
    </header>
  )
};

export default Header;