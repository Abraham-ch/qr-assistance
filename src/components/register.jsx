import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo:""
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <form onSubmit={handleRegister}>
          <h3 className="text-2xl font-semibold pb-2">Registro</h3>

          <div className="mb-3 flex flex-col">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Nombres</label>
            <input
              type="text"
              className="form-control px-3 py-3.5 border rounded-md"
              placeholder=""
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 flex flex-col pt-2">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Apellidos</label>
            <input
              type="text"
              className="form-control px-3 py-3.5 border rounded-md"
              placeholder=""
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3 flex flex-col pt-2">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Correo Electronico</label>
            <input
              type="email"
              className="form-control px-3 py-3.5 border rounded-md"
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 flex flex-col pt-2">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Contraseña</label>
            <input
              type="password"
              className="form-control px-3 py-3.5 border rounded-md"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="py-2">
            <p className="text-end text-xs text-gray-600">O puede{' '}<Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">acceder</Link></p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button type="submit" className="px-6 py-2 border rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors duration-300">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;