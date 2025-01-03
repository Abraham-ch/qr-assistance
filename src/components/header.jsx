import { Link } from "react-router-dom"
import Logo from "assets/img/dashboardlogo.png"

const Header = () => {
  return (
    <header className="bg-blue-950 text-white shadow items-center w-full px-8 flex justify-between text-2xl font-semibold h-16">
        <Link to="/" className="flex items-center justify-between">
          <img src={Logo} alt="Logo" className="h-10" />
        </Link>
        <div className="flex items-center">
          <Link to="/login" className="text-lg font-semibold leading-6">
            Login
          </Link>
          <Link to="/register" className="ml-10 text-lg font-semibold leading-6">
            Register
          </Link>
        </div>
    </header>
  )
};

export default Header;