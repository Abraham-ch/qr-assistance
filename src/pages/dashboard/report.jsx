import { useState } from "react";
import { GetUsers } from "../../components/Users/getUsers";

const Report = () => {
  const { students, loading, error, refetch } = GetUsers();
  const [searchDNI, setSearchDNI] = useState("");

  // Filtrado dinámico
  const filteredStudents = students.filter((student) =>
    student.dni.includes(searchDNI) // Busca coincidencias parciales
  );

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Búsqueda de Estudiantes</h1>

      {/* Sección de búsqueda */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Ingresa DNI"
          value={searchDNI}
          onChange={(e) => setSearchDNI(e.target.value)} // Actualiza el input
          className="p-2 rounded-md border border-gray-600 text-black w-full"
        />
        <button
          onClick={refetch}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
        >
          Refrescar
        </button>
      </div>

      {/* Mostrar estados */}
      {loading && <p className="text-yellow-400">Cargando estudiantes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Resultados de la búsqueda */}
      {filteredStudents.length > 0 ? (
        filteredStudents.map((student) => (
          <div
            key={student.id}
            className="p-4 bg-gray-700 rounded-md shadow-md mb-4"
          >
            <p><strong>Nombre:</strong> {student.nombre} {student.apellido}</p>
            <p><strong>DNI:</strong> {student.dni}</p>
            <p><strong>Matrícula:</strong> {student.matricula}</p>
            <p><strong>Nivel:</strong> {student.nivel}</p>
            <p><strong>Grado:</strong> {student.grado}</p>
            <p><strong>Estado:</strong> {student.estado}</p>
          </div>
        ))
      ) : (
        !loading &&
        searchDNI && (
          <p className="text-gray-400">No se encontraron estudiantes con el DNI proporcionado.</p>
        )
      )}
    </div>
  );
};


export default Report;