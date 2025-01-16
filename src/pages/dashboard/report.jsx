import { useState } from "react";
import { useUsers } from "components/Users/useUsers";
import { useEnrollments } from "src/components/Users/useEnrollments";
import { PDFButton } from "src/components/pdf";

const Report = () => {
  const { students, loading: studentsLoading, error: studentsError, refetch: refetchStudents } = useUsers();
  const { enrollments, loading: enrollmentsLoading, error: enrollmentsError, refetch: refetchEnrollments } = useEnrollments();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("all");

  // Combinar datos de estudiantes y matrículas
  const combinedData = students.map(student => {
    // Buscar la matrícula más reciente del estudiante
    const studentEnrollment = enrollments
      .filter(enroll => enroll.id === student.id)
      .sort((a, b) => new Date(b.fechaInicial) - new Date(a.fechaInicial))[0];

    return {
      ...student,
      ciclo: studentEnrollment?.ciclo || '-',
      periodo: studentEnrollment?.periodo || '-'
    };
  });

  const filteredStudents = combinedData.filter((student) => {
    const searchLower = searchTerm.toLowerCase().trim();
    
    switch (searchBy) {
      case "dni":
        return student.dni.toLowerCase().includes(searchLower);
      case "nombre":
        return student.nombre.toLowerCase().includes(searchLower);
      case "apellido":
        return student.apellido.toLowerCase().includes(searchLower);
      case "all":
      default:
        return (
          student.dni.toLowerCase().includes(searchLower) ||
          student.nombre.toLowerCase().includes(searchLower) ||
          student.apellido.toLowerCase().includes(searchLower)
        );
    }
  });

  const handleRefresh = () => {
    refetchStudents();
    refetchEnrollments();
  };

  const loading = studentsLoading || enrollmentsLoading;
  const error = studentsError || enrollmentsError;

  return (
    <div className="p-0 py-3 sm:p-6 max-w-5xl mx-auto rounded-lg">
      <h1 className="text-lg sm:text-2xl font-bold text-left mb-4">Búsqueda de Estudiantes</h1>

      {/* Sección de búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 flex gap-2">
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="p-2 rounded-md border border-gray-600 text-black"
          >
            <option value="all">Todos los campos</option>
            <option value="dni">DNI</option>
            <option value="nombre">Nombre</option>
            <option value="apellido">Apellido</option>
          </select>
          <input
            type="text"
            placeholder={
              searchBy === "all"
                ? "Buscar por DNI, nombre o apellido"
                : `Buscar por ${searchBy}`
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md border border-gray-600 text-black w-full"
          />
        </div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white whitespace-nowrap"
        >
          Refrescar
        </button>
      </div>

      {/* Mostrar estados */}
      {loading && <p className="text-yellow-400">Cargando datos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Tabla de resultados */}
      <table className="w-full divide-y divide-gray-300 bg-gray-100 text-sm text-gray-900 border border-gray-300">
        <thead className="bg-gray-200 text-left text-gray-800">
          <tr>
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4">DNI</th>
            <th className="py-3 px-4 sm:table-cell hidden">Nivel</th>
            <th className="py-3 px-4 sm:table-cell hidden">Grado</th>
            <th className="py-3 px-4 sm:table-cell hidden">Ciclo</th>
            <th className="py-3 px-4 sm:table-cell hidden">Periodo</th>
            <th className="py-3 px-4 pr-6 text-right">PDF</th>
          </tr>
        </thead>
        
        {filteredStudents.length > 0 ? (
          <tbody className="divide-y divide-gray-300">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="text-left hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-xs sm:text-sm">
                  {student.nombre} {student.apellido}
                </td>
                <td className="py-3 px-4 font-medium text-xs sm:text-sm">{student.dni}</td>
                <td className="py-3 px-4 font-medium sm:table-cell hidden">{student.nivel}</td>
                <td className="py-3 px-4 font-medium sm:table-cell hidden">{student.grado}</td>
                <td className="py-3 px-4 font-medium sm:table-cell hidden">{student.ciclo}</td>
                <td className="py-3 px-4 font-medium sm:table-cell hidden">{student.periodo}</td>
                <td className="py-3 px-4 font-medium text-right"><PDFButton student={student} /></td>
              </tr>
            ))}
          </tbody>
        ) : (
          !loading && searchTerm && (
            <>
              <caption className="text-gray-400 text-start py-2 pb-4 border-none">
                No se encontraron estudiantes con los criterios de búsqueda proporcionados.
              </caption>
              <tbody>
                <tr>
                  <td className="py-5 px-4 font-medium" colSpan={7}></td>
                </tr>
              </tbody>
            </>
          )
        )}
      </table>
    </div> 
  );
};

export default Report;
