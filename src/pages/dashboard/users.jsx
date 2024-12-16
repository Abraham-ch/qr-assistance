import { useState } from 'react';
import { AddUsers, EnrollUsers } from '../../components/Users/addUsers';

function Users() {
  // Hooks de los componentes para crear estudiantes y matricular
  const { createStudent, loading: studentLoading, error: studentError, success: studentSuccess } = AddUsers();
  const { createEnrollment, loading: enrollmentLoading, error: enrollmentError, success: enrollmentSuccess } = EnrollUsers();

  // Estado para el primer formulario de estudiantes
  const [studentData, setStudentData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    nivel: '',
    grado: '',
  });

  // Estado para el segundo formulario de matrícula
  const [enrollmentData, setEnrollmentData] = useState({
    dni: '',
    ciclo: '',
    periodo: ''
  });

  // Mapeo de grados por nivel
  const gradosPorNivel = {
    Primaria: ['1ro', '2do', '3ro', '4to', '5to'],
    Secundaria: ['1ro', '2do', '3ro', '4to', '5to', '6to'],
    Academia: ['Repaso', 'Semestral', 'Anual']
  };

  // Manejador de cambios para el formulario de estudiantes
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      [name]: value,
      // Resetear grado si cambia el nivel
      ...(name === 'nivel' && { grado: '' })
    }));
  };

  // Manejador de cambios para el formulario de matrícula
  const handleEnrollmentChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejador de envío para formulario de estudiantes
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    const result = await createStudent(studentData);
    
    if (result) {
      // Limpiar formulario
      setStudentData({
        dni: '',
        nombre: '',
        apellido: '',
        nivel: '',
        grado: ''
      });
    }
  };

  // Manejador de envío para formulario de matrícula
  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();
    const result = await createEnrollment(enrollmentData);
    
    if (result) {
      // Limpiar formulario
      setEnrollmentData({
        dni: '',
        ciclo: '',
        periodo: ''
      });
    }
  };

  return (
    <div className="container max-w-5xl mx-auto flex flex-col justify-center gap-y-8 h-full xl:items-start items-center">
      {/* Formulario de Estudiantes */}
      <div className="rounded-lg px-8 py-6 max-w-4xl w-full bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-start">Registro de Estudiante</h2>
        <p className='text-start pb-4 md:text-base text-sm'>Ingrese los datos del estudiante para registrarlo en el sistema.</p>
        <form onSubmit={handleStudentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={studentData.dni}
              onChange={handleStudentChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={studentData.nombre}
              onChange={handleStudentChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={studentData.apellido}
              onChange={handleStudentChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="nivel"
              value={studentData.nivel}
              onChange={handleStudentChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar Nivel</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Academia">Academia</option>
            </select>
            <select
              name="grado"
              value={studentData.grado}
              onChange={handleStudentChange}
              required
              disabled={!studentData.nivel}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">Seleccionar Grado</option>
              {studentData.nivel && gradosPorNivel[studentData.nivel].map(grado => (
                <option key={grado} value={grado}>{grado}</option>
              ))}
            </select>

            <button 
            type="submit" 
            disabled={studentLoading}
            className="w-full block self-start bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50"
          >
            {studentLoading ? 'Creando...' : 'Crear Estudiante'}
          </button>
          </div>  
        </form>
        {studentError && <div className="text-red-500 mb-4">{studentError}</div>}
        {studentSuccess && <div className="text-green-500 mb-4">Estudiante creado exitosamente</div>}
      </div>

      {/* Formulario de Matrícula */}
      <div className="rounded-lg px-8 py-6 max-w-4xl w-full bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-start">Registro de Matrícula</h2>
        <p className='text-start pb-4 md:text-base text-sm'>Ingrese los datos de la matrícula para registrarla en el sistema.</p>
        
        <form onSubmit={handleEnrollmentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={enrollmentData.dni}
              onChange={handleEnrollmentChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="ciclo"
              value={enrollmentData.ciclo}
              onChange={handleEnrollmentChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar Ciclo</option>
              <option value="2024-I">2024-I</option>
              <option value="2024-II">2024-II</option>
            </select>
            <select
              name="periodo"
              value={enrollmentData.periodo}
              onChange={handleEnrollmentChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar Periodo</option>
              <option value="Verano">Verano</option>
              <option value="Regular">Regular</option>
              <option value="Extraordinario">Extraordinario</option>
            </select>

            <button 
            type="submit" 
            disabled={enrollmentLoading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out disabled:opacity-50"
          >
            {enrollmentLoading ? 'Matriculando...' : 'Registrar Matrícula'}
          </button>
          </div>
        </form>
        {enrollmentError && <div className="text-red-500 mb-4">{enrollmentError}</div>}
        {enrollmentSuccess && <div className="text-green-500 mb-4">Matrícula creada exitosamente</div>}
      </div>
    </div>
  );
}

export default Users;