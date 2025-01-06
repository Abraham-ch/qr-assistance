import { useEffect, useState } from "react";
import { auth, db } from "components/firebase";
import { doc, getDoc } from "firebase/firestore";
import userimg from "assets/img/user_img.png"

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <>
      {userDetails ? (
        <section className="flex flex-col h-full py-12 items-center justify-center">
          <div className="max-w-sm mx-auto w-full h-full flex flex-col justify-center items-center py-10 gap-y-2 bg-white rounded-md">
            <h3 className="text-2xl font-bold pb-4">Bienvenido!</h3>
            <img
              src={userimg}
              className="border rounded-full w-32"
            />
            <p className="text-base pb-2">{userDetails.email}</p>
            <p className="text-lg font-semibold pb-4">{userDetails.firstName}</p>
            
            <button
              className='border px-3 py-2 rounded-lg flex gap-x-3 items-center hover:bg-gray-200/50'
              onClick={handleLogout}
            >
              Cerrar sesión
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M15 12h-12l3 -3" /><path d="M6 15l-3 -3" /></svg>
            </button>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
export default Profile;