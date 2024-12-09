import { useEffect, useState } from 'react';
import axios from 'axios';

const Overview = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/estudiantes`)
      .then(response => {
        // Ajustamos la estructura de los datos para el uso en la tabla
        const formattedStudents = response.data.map(student => ({
          id: student.id_estudiante,
          alumno: `${student.nombre} ${student.apellido}`,
          estado: student.grado_nivel,
          asistencia: 0, // Asignar un valor por defecto, puedes modificar esto según tus necesidades
        }));
        setStudents(formattedStudents);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener los estudiantes:', err);
        setError('Error al cargar los datos de los estudiantes.');
        setLoading(false);
      });
  }, []);

  const totalAsistidos = students.filter((student) => student.asistencia === 1).length;

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <h2 className="self-start text-xl font-semibold pb-4">Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-300 bg-gray-100 text-sm text-gray-900">
          <caption className="py-4 text-gray-800 text-start pb-4">
            Lista de alumnos registrados.
          </caption>
          <thead className="bg-gray-100 text-left text-gray-800">
            <tr>
              <th className="py-3 px-4 w-[100px]">ID</th>
              <th className="py-3 px-4">Alumno</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-right">Asistencia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-400">
            {students.map((student) => (
              <tr key={student.id} className="text-left">
                <td className="py-3 px-4 font-medium">{student.id}</td>
                <td className="py-3 px-4">{student.alumno}</td>
                <td className="py-3 px-4">{student.estado}</td>
                <td className="py-3 px-4 text-right">{student.asistencia === 1 ? "Presente" : "Ausente"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-200/50 text-left">
            <tr>
              <td className="py-3 px-4 font-medium" colSpan={3}>
                Total
              </td>
              <td className="py-3 px-4 text-right font-bold">{totalAsistidos}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Overview;
