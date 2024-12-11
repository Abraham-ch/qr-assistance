import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../components/firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "../components/signInWithGoogle";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/dashboard/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 bg-white shadow-md rounded-lg py-8 px-12">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold pb-4">Login</h3>
          <div className="mb-3 flex flex-col">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Correo Electronico</label>
            <input
              type="email"
              className="form-control px-3 py-3.5 border rounded-md"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 flex flex-col pt-2">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Contraseña</label>
            <input
              type="password"
              className="form-control px-3 py-3.5 border rounded-md"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="py-2">
            <p className="text-end text-xs text-gray-600">O puede{' '}<Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">registrarse</Link></p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Ingresar
            </button>
          </div>
          <SignInwithGoogle/>
        </form>
      </div>
    </div>
  );
}

export default Login;