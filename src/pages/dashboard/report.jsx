import { useState } from "react";
import { GetUsers } from "../../components/Users/getUsers";

const Report = () => {
  const { students, loading, error, refetch } = GetUsers();
  const [searchDNI, setSearchDNI] = useState("");

  const filteredStudents = students.filter((student) =>
    student.dni.includes(searchDNI) // Busca coincidencias parciales
  );

  return (
    <div className="p-6 max-w-5xl mx-auto rounded-lg">
      <h1 className="text-2xl font-bold text-left mb-4">Búsqueda de Estudiantes</h1>

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
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white"
        >
          Refrescar
        </button>
      </div>

      {/* Mostrar estados */}
      {loading && <p className="text-yellow-400">Cargando estudiantes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Resultados de la búsqueda */}

      <table className="w-full divide-y divide-gray-300 bg-gray-100 text-sm text-gray-900 border border-gray-300">
        <thead className="bg-gray-200 text-left text-gray-800">
          <tr>
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4">DNI</th>
            <th className="py-3 px-4">Nivel</th>
            <th className="py-3 px-4">Grado</th>
            <th className="py-3 px-4 pr-6 text-right">Estado</th>
          </tr>
        </thead>
        
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tbody className="divide-y divide-gray-300" key={student.id}>
                <tr
                  className="text-left"
                >
                  <th className="py-3 px-4 font-medium">{student.nombre} {student.apellido}</th>
                  <th className="py-3 px-4 font-medium">{student.dni}</th>
                  <th className="py-3 px-4 font-medium">{student.nivel}</th>
                  <th className="py-3 px-4 font-medium">{student.grado}</th>
                  <th className="py-3 px-4 font-medium">{student.estado}</th>
                </tr>
              </tbody>
            ))
          ) : (
            !loading &&
            searchDNI && (
              <>
                <caption className="text-gray-400 text-start py-2 pb-4 border-none">No se encontraron estudiantes con el DNI proporcionado.</caption>
                <tfoot>
                  <tr>
                    <td className="py-5 px-4 font-medium" colSpan={4}></td>
                  </tr>
                </tfoot>
              </>
            )
          )}
        
      </table>

    </div>
  );
};


export default Report;