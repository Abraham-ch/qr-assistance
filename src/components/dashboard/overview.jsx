const Overview = () => {
  const students = [
    { id: "A001", alumno: "Juan Pérez", estado: "Matriculado", asistencia: 1 },
    { id: "A002", alumno: "María López", estado: "Pendiente", asistencia: 0 },
    { id: "A003", alumno: "Carlos Sánchez", estado: "Matriculado", asistencia: 1 },
    { id: "A004", alumno: "Ana Gómez", estado: "Pendiente", asistencia: 0 },
    { id: "A005", alumno: "Luis Fernández", estado: "Matriculado", asistencia: 1 },
    { id: "A006", alumno: "Sofía Ramírez", estado: "Pendiente", asistencia: 0 },
    { id: "A007", alumno: "Diego Torres", estado: "Matriculado", asistencia: 1 },
  ];
  const totalAsistidos = students.filter((student) => student.asistencia === 1).length;
  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <h2 className="self-start text-xl font-semibold pb-4">Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full  divide-y divide-gray-300 bg-gray-100 text-sm text-gray-900">
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