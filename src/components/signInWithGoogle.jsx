import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import Googlepng from "../google.png";

function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          phone: user.phoneNumber,
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        window.location.href = "dashboard/overview";
      }
    });
  }
  return (
    <div>
      <p className="text-xs pt-4 pb-2">-- O continue con --</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={Googlepng} width={"70%"} />
      </div>
    </div>
  );
}
export default SignInwithGoogle;