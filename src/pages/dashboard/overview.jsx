import { GetUsers } from '../../components/Users/getUsers';
import CardsGrid from '../../components/Students/cardsGrid';

const Overview = () => {
  const { students, loading, error, refetch } = GetUsers();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  {/*const totalAsistidos = students.filter((student) => student.asistencia === 1).length;*/}
  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <h2 className="self-start text-2xl font-bold pb-4">Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-300 bg-gray-100 text-sm text-gray-900 border border-gray-300">
          <caption className="py-3 pb-3 text-gray-800 text-start text-sm pl-4">
            <div className='flex justify-between items-end'>
              <p>Lista de alumnos registrados.</p>
            <div className='flex gap-x-4'>
              <button onClick={refetch} className='border px-3 py-2 rounded-lg flex gap-x-3 items-center hover:bg-gray-200/50'>
              <p>Actualizar</p>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-refresh"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
            </button>
            <CardsGrid students={students} />
            </div>
            </div>
          </caption>
          <thead className="bg-gray-200 text-left text-gray-800">
            <tr>
              <th className="py-3 px-4 w-[180px]">ID</th>
              <th className="py-3 px-4">Alumno</th>
              <th className="py-3 px-4">Nivel</th>
              <th className="py-3 px-4">Grado</th>
              <th className="py-3 px-4 pr-6 text-right">Asistencia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {students.map((student) => (
              <tr key={student.id} className="text-left">
                <td className="py-3 px-4 font-medium">{student.id}</td>
                <td className="py-3 px-4">{student.nombre} {student.apellido}</td>
                <td className="py-3 px-4">{student.nivel}</td>
                <td className="py-3 px-4">{student.grado}</td>
                {/* <td className="py-3 pr-6 px-4 text-right">{student.estado === "Activo" || student.estado === "activo" ? "Presente" : "Ausente"}</td> */}
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-200/50 text-left">
            <tr>
              <td className="py-3 px-4 font-medium" colSpan={4}>
                Total
              </td>
              {/* <td className="py-3 px-4 text-right font-bold">{totalAsistidos}</td> */}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Overview;
