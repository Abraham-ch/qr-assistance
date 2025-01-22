import { useState, useEffect } from 'react';
import { EnrollUsers } from "src/components/Users/addUsers";

const Tuition = () => {
  const { createEnrollment, loading: enrollmentLoading, error: enrollmentError, success: enrollmentSuccess } = EnrollUsers();

  const [enrollmentData, setEnrollmentData] = useState({
    dni: '',
    ciclo: '',
    periodo: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Validar el formulario antes de enviarlo
  const validateForm = () => {
    const errors = {};
    
    if (!/^\d{8}$/.test(enrollmentData.dni)) {
      errors.dni = 'El DNI debe tener exactamente 8 dígitos';
    }
    
    if (!enrollmentData.ciclo) {
      errors.ciclo = 'Debe seleccionar un ciclo';
    }
    
    if (!enrollmentData.periodo) {
      errors.periodo = 'Debe seleccionar un periodo';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEnrollmentChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar el error específico cuando el usuario modifica el campo
    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log('Errores de validación:', formErrors);
      return;
    }

    // Construir el id_fechas_ciclo basado en periodo y ciclo
    const formattedCiclo = enrollmentData.ciclo.toLowerCase();
    const formattedPeriodo = enrollmentData.periodo.toLowerCase();
    
    const id_fechas_ciclo = `ciclo_${formattedPeriodo}_2024_${formattedCiclo}`;
    
    const formattedData = {
      dni: enrollmentData.dni,
      id_fechas_ciclo
    };

    console.log('Datos a enviar:', formattedData);
    
    try {
      const result = await createEnrollment(formattedData);
      console.log('Respuesta del servidor:', result);
      
      if (result) {
        setEnrollmentData({
          dni: '',
          ciclo: '',
          periodo: ''
        });
        setFormErrors({});
      }
    } catch (error) {
      console.error('Error en la matrícula:', error);
    }
  };

  // Efecto para mostrar errores en consola
  useEffect(() => {
    if (enrollmentError) {
      console.error('Error de matrícula:', enrollmentError);
    }
  }, [enrollmentError]);

  return (
    <div className='h-full flex justify-center items-center'>
      <div className="rounded-lg px-8 py-6 max-w-4xl w-full bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-start">Registro de Matrícula</h2>
        <p className='text-start pb-4 md:text-base text-sm'>Ingrese los datos de la matrícula para registrarla en el sistema.</p>
        
        <form onSubmit={handleEnrollmentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
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
              {formErrors.dni && <span className="text-red-500 text-sm mt-1">{formErrors.dni}</span>}
            </div>

            <div className="flex flex-col">
              <select
                name="ciclo"
                value={enrollmentData.ciclo}
                onChange={handleEnrollmentChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar Ciclo</option>
                <option value="2024-i">2024-I</option>
                <option value="2024-ii">2024-II</option>
              </select>
              {formErrors.ciclo && <span className="text-red-500 text-sm mt-1">{formErrors.ciclo}</span>}
            </div>

            <div className="flex flex-col">
              <select
                name="periodo"
                value={enrollmentData.periodo}
                onChange={handleEnrollmentChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar Periodo</option>
                <option value="verano">Verano</option>
                <option value="regular">Regular</option>
                <option value="extraordinario">Extraordinario</option>
              </select>
              {formErrors.periodo && <span className="text-red-500 text-sm mt-1">{formErrors.periodo}</span>}
            </div>

            <button 
              type="submit" 
              disabled={enrollmentLoading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out disabled:opacity-50"
            >
              {enrollmentLoading ? 'Matriculando...' : 'Registrar Matrícula'}
            </button>
          </div>
        </form>
        
        {enrollmentError && (
          <div className="text-red-500 mt-4 p-3 border border-red-300 rounded bg-red-50">
            Error: {typeof enrollmentError === 'string' ? enrollmentError : JSON.stringify(enrollmentError)}
          </div>
        )}
        {enrollmentSuccess && (
          <div className="text-green-500 mt-4 p-3 border border-green-300 rounded bg-green-50">
            Matrícula creada exitosamente
          </div>
        )}
      </div>
    </div>
  );
};

export default Tuition;