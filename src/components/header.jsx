import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow">
      <div className="w-full px-8 flex justify-between items-center text-2xl font-semibold py-5">
        <Link to="/" className="flex items-center justify-between">Logo</Link>
        <div>
          <Link to="/login" className="text-xl font-semibold leading-6">
            Login
          </Link>
          <Link to="/register" className="ml-10 text-xl font-semibold leading-6">
            Register
          </Link>
        </div>
      </div>
    </header>
  )
};

export default Header;