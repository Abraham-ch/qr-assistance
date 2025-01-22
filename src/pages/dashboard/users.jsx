import { useState } from 'react';
import { AddUsers, AddGuardians } from 'components/Users/addUsers';

function Users() {
  const { createStudent, loading: studentLoading, error: studentError, success: studentSuccess } = AddUsers();
  const { createGuardian, loading: guardianLoading, error: guardianError, success: guardianSuccess } = AddGuardians();
  
  // Estado para estudiantes
  const [studentData, setStudentData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    nivel: '',
    grado: '',
  });

  // Estado para apoderados
  const [guardianData, setGuardianData] = useState({
    nombre: '',
    apellido: '',
    telefono1: '',
    telefono2: '',
    estudiantes: [''],
    relaciones: ''
  });

  // Estado para el número de estudiantes a añadir
  const [numStudents, setNumStudents] = useState(1);

  const gradosPorNivel = {
    Primaria: ['1ro', '2do', '3ro', '4to', '5to'],
    Secundaria: ['1ro', '2do', '3ro', '4to', '5to', '6to'],
    Academia: ['Repaso', 'Semestral', 'Anual']
  };

  const tiposRelacion = [
    'Padre',
    'Madre',
    'Abuelo/a',
    'Tío/a',
    'Hermano/a',
    'Tutor Legal'
  ];

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'nivel' && { grado: '' })
    }));
  };

  const handleGuardianChange = (e) => {
    const { name, value } = e.target;
    setGuardianData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejador para el cambio de número de estudiantes
  const handleNumStudentsChange = (e) => {
    const num = parseInt(e.target.value);
    setNumStudents(num);
    // Actualiza el array de estudiantes según el número seleccionado
    setGuardianData(prev => ({
      ...prev,
      estudiantes: Array(num).fill('')
    }));
  };

  // Manejador para cambios en los IDs de estudiantes
  const handleStudentIdChange = (index, value) => {
    setGuardianData(prev => {
      const newStudents = [...prev.estudiantes];
      newStudents[index] = value;
      return {
        ...prev,
        estudiantes: newStudents
      };
    });
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    const result = await createStudent(studentData);
    console.log('Datos enviados:', studentData);
    if (result) {
      setStudentData({
        dni: '',
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        nivel: '',
        grado: ''
      });
    }
  };

  const handleGuardianSubmit = async (e) => {
    e.preventDefault();
    // Filtra cualquier ID de estudiante vacío antes de enviar
    const filteredData = {
      ...guardianData,
      estudiantes: guardianData.estudiantes.filter(id => id.trim() !== '')
    };
    
    const result = await createGuardian(filteredData);
    
    if (result) {
      setGuardianData({
        nombre: '',
        apellido: '',
        telefono1: '',
        telefono2: '',
        estudiantes: [''],
        relaciones: ''
      });
      setNumStudents(1);
    }
  };

  // Renderiza los campos de ID de estudiante según el número seleccionado
  const renderStudentIdFields = () => {
    return guardianData.estudiantes.map((studentId, index) => (
      <input
        key={index}
        type="text"
        placeholder={`ID del estudiante ${index + 1}`}
        value={studentId}
        onChange={(e) => handleStudentIdChange(index, e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    ));
  };

  return (
    <div className="container max-w-5xl mx-auto flex flex-col justify-center gap-y-8 h-full xl:items-start items-center">
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
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={studentData.telefono}
              onChange={handleStudentChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={studentData.direccion}
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
        
        {studentError && <div className="text-red-500 mt-4">{studentError}</div>}
        {studentSuccess && <div className="text-green-500 mt-4">Estudiante creado exitosamente</div>}
      </div>

      <div className="rounded-lg px-8 py-6 max-w-4xl w-full bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-start">Registro de Apoderado</h2>
        <p className='text-start pb-4 md:text-base text-sm'>Ingrese los datos del apoderado para registrarlo en el sistema.</p>
        
        <form onSubmit={handleGuardianSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={guardianData.nombre}
              onChange={handleGuardianChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={guardianData.apellido}
              onChange={handleGuardianChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="telefono1"
              placeholder="Teléfono Principal"
              value={guardianData.telefono1}
              onChange={handleGuardianChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="telefono2"
              placeholder="Teléfono Secundario (Opcional)"
              value={guardianData.telefono2}
              onChange={handleGuardianChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="relaciones"
              value={guardianData.relaciones}
              onChange={handleGuardianChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar Relación</option>
              {tiposRelacion.map(relacion => (
                <option key={relacion} value={relacion.toLowerCase()}>{relacion}</option>
              ))}
            </select>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de estudiantes a cargo
              </label>
              <select
                value={numStudents}
                onChange={handleNumStudentsChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Campos dinámicos para IDs de estudiantes */}
            {renderStudentIdFields()}

            <button 
              type="submit" 
              disabled={guardianLoading}
              className="w-full block self-start bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50"
            >
              {guardianLoading ? 'Creando...' : 'Crear Apoderado'}
            </button>
          </div>  
        </form>
        
        {guardianError && <div className="text-red-500 mt-4">{guardianError}</div>}
        {guardianSuccess && <div className="text-green-500 mt-4">Apoderado creado exitosamente</div>}
      </div>
    </div>
  );
}

export default Users;