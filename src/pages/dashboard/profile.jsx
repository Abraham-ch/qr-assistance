import { useEffect, useState } from "react";
import { auth, db } from "components/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile, updatePassword } from "firebase/auth";
import userimg from "assets/img/user_img.png";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [editFields, setEditFields] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    address: false,
    password: false
  });

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserDetails(userData);
          setEditFields({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            phone: userData.phone || "",
            address: userData.address || "",
            email: userData.email || "",
            newPassword: "",
            confirmPassword: ""
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      
      // Update Firestore document
      const userDocRef = doc(db, "Users", user.uid);
      await updateDoc(userDocRef, {
        firstName: editFields.firstName,
        lastName: editFields.lastName,
        phone: editFields.phone,
        address: editFields.address
      });

      // Update Firebase Auth profile if needed
      if (user.displayName !== `${editFields.firstName} ${editFields.lastName}`) {
        await updateProfile(user, { 
          displayName: `${editFields.firstName} ${editFields.lastName}`
        });
      }

      // Update password if provided
      if (editFields.newPassword) {
        if (editFields.newPassword !== editFields.confirmPassword) {
          throw new Error("Las contraseñas no coinciden");
        }
        await updatePassword(user, editFields.newPassword);
      }

      // Reset all editable states
      setEditableFields({
        firstName: false,
        lastName: false,
        phone: false,
        address: false,
        password: false
      });

      // Refresh user data
      await fetchUserData();
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleEdit = (field) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="flex space-x-6 p-6">
      {/* User Data Container */}
      {userDetails && (
        <div className="w-1/3 bg-white rounded-md p-6 py-12">
          <h3 className="text-2xl font-bold pb-4">Datos de Usuario</h3>
          <img
            src={userimg}
            className="border rounded-full w-32 mx-auto mb-4"
            alt="Profile"
          />
          <div className="space-y-2">
            <p><strong>Nombre:</strong> {userDetails.firstName} {userDetails.lastName}</p>
            <p><strong>Correo:</strong> {userDetails.email}</p>
            <p><strong>Teléfono:</strong> {userDetails.phone || 'No definido'}</p>
            <p><strong>Dirección:</strong> {userDetails.address || 'No definida'}</p>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleLogout}
              className="border px-3 py-2 rounded-lg hover:bg-gray-200/50"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Edit Form Container */}
      <div className="w-1/2 bg-white rounded-md px-10 py-12">
        <h3 className="text-2xl font-bold pb-6">Editar Perfil</h3>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="space-y-4">
          {/* Nombre */}
          <div className="mb-3 flex flex-col">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Nombre</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={editFields.firstName}
                onChange={(e) => setEditFields(prev => ({
                  ...prev,
                  firstName: e.target.value
                }))}
                disabled={!editableFields.firstName}
                className="form-control px-3 py-3.5 border rounded-md w-full disabled:bg-gray-50"
              />
              <button
                onClick={() => toggleEdit('firstName')}
                className="px-2 text-gray-500 hover:text-blue-600 border rounded"
              >
                {editableFields.firstName ? '✓' : '✎'}
              </button>
            </div>
          </div>

          {/* Apellido */}
          <div className="mb-3 flex flex-col">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Apellido</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={editFields.lastName}
                onChange={(e) => setEditFields(prev => ({
                  ...prev,
                  lastName: e.target.value
                }))}
                disabled={!editableFields.lastName}
                className="form-control px-3 py-3.5 border rounded-md w-full disabled:bg-gray-50"
              />
              <button
                onClick={() => toggleEdit('lastName')}
                className="px-2 text-gray-500 hover:text-blue-600 border rounded"
              >
                {editableFields.lastName ? '✓' : '✎'}
              </button>
            </div>
          </div>

          {/* Teléfono */}
          <div className="mb-3 flex flex-col">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Teléfono</label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={editFields.phone}
                onChange={(e) => setEditFields(prev => ({
                  ...prev,
                  phone: e.target.value
                }))}
                disabled={!editableFields.phone}
                className="form-control px-3 py-3.5 border rounded-md w-full disabled:bg-gray-50"
              />
              <button
                onClick={() => toggleEdit('phone')}
                className="px-2 text-gray-500 hover:text-blue-600 border rounded"
              >
                {editableFields.phone ? '✓' : '✎'}
              </button>
            </div>
          </div>

          {/* Dirección */}
          <div className="mb-3 flex flex-col">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Dirección</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={editFields.address}
                onChange={(e) => setEditFields(prev => ({
                  ...prev,
                  address: e.target.value
                }))}
                disabled={!editableFields.address}
                className="form-control px-3 py-3.5 border rounded-md w-full disabled:bg-gray-50"
              />
              <button
                onClick={() => toggleEdit('address')}
                className="px-2 text-gray-500 hover:text-blue-600 border rounded"
              >
                {editableFields.address ? '✓' : '✎'}
              </button>
            </div>
          </div>

          {/* Contraseña */}
          <div className="mb-3 flex flex-col">
            <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">Nueva Contraseña</label>
            <div className="flex gap-2">
              <input
                type="password"
                value={editFields.newPassword}
                onChange={(e) => setEditFields(prev => ({
                  ...prev,
                  newPassword: e.target.value
                }))}
                disabled={!editableFields.password}
                className="form-control px-3 py-3.5 border rounded-md w-full disabled:bg-gray-50"
                placeholder="••••••••"
              />
              <button
                onClick={() => toggleEdit('password')}
                className="px-2 text-gray-500 hover:text-blue-600 border rounded"
              >
                {editableFields.password ? '✓' : '✎'}
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña - Solo visible cuando se está editando la contraseña */}
          {editableFields.password && (
            <div className="mb-3 flex flex-col">
              <label className="-mb-2.5 z-10 text-xs bg-white w-fit px-1.5 ml-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={editFields.confirmPassword}
                onChange={(e) => setEditFields(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))}
                className="form-control px-3 py-3.5 border rounded-md w-full"
                placeholder="••••••••"
              />
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              onClick={handleUpdateProfile}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => {
                setEditableFields({
                  firstName: false,
                  lastName: false,
                  phone: false,
                  address: false,
                  password: false
                });
                fetchUserData(); // Reset to original values
              }}
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;