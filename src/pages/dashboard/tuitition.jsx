import { useState } from 'react';
import { EnrollUsers } from "src/components/Users/addUsers";

const Tuition = () => {
  const { createEnrollment, loading: enrollmentLoading, error: enrollmentError, success: enrollmentSuccess } = EnrollUsers();

  const [enrollmentData, setEnrollmentData] = useState({
    dni: '',
    ciclo: '',
    periodo: ''
  });

  const handleEnrollmentChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();
    
    // Construir el id_fechas_ciclo basado en periodo y ciclo
    const formattedData = {
      dni: enrollmentData.dni,
      id_fechas_ciclo: `ciclo_${enrollmentData.periodo.toLowerCase()}_2024_${enrollmentData.ciclo}`.toLowerCase()
    };
    
    const result = await createEnrollment(formattedData);
    
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
    <div className='h-full flex justify-center items-center'>
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
              pattern="\d{8}"
              title="El DNI debe tener 8 dígitos"
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
              <option value="2024-I">2024-i</option>
              <option value="2024-II">2024-ii</option>
            </select>
            <select
              name="periodo"
              value={enrollmentData.periodo}
              onChange={handleEnrollmentChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar Periodo</option>
              <option value="Verano">verano</option>
              <option value="Regular">regular</option>
              <option value="Extraordinario">extraordinario</option>
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
        {enrollmentError && <div className="text-red-500 mt-4">{enrollmentError}</div>}
        {enrollmentSuccess && <div className="text-green-500 mt-4">Matrícula creada exitosamente</div>}
      </div>
    </div>
  );
};

export default Tuition;