import { useState } from 'react';
import axios from 'axios';

export const AddUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createStudent = async (studentData) => {
    try {
      setLoading(true); 
      setError(null);
      setSuccess(false);

      // Validar campos requeridos
      const requiredFields = ['dni', 'nombre', 'apellido', 'telefono', 'direccion', 'nivel', 'grado', 'sexo'];
      const missingFields = requiredFields.filter(field => !studentData[field]);


      if (missingFields.length > 0) {
        throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/estudiantes`, 
        studentData
      );

      setSuccess(true);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al crear estudiante:', err);
      console.error('Error al crear estudiante:', err.response?.data || err.message);
      setLoading(false);
      return null;
    }
  };

  const resetStatus = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return { 
    createStudent, 
    loading, 
    error, 
    success, 
    resetStatus 
  };
};

export const AddGuardians = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createGuardian = async (guardianData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Validar campos requeridos
      const requiredFields = ['nombre', 'apellido', 'telefono1', 'estudiantes', 'relaciones'];
      const missingFields = requiredFields.filter(field => {
        if (Array.isArray(guardianData[field])) {
          return guardianData[field].length === 0;
        }
        return !guardianData[field];
      });

      if (missingFields.length > 0) {
        throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
      }

      // Validación de teléfonos
      const phoneRegex = /^\d{9,}$/;
      if (!phoneRegex.test(guardianData.telefono1)) {
        throw new Error('El teléfono principal debe contener al menos 9 dígitos numéricos');
      }
      if (guardianData.telefono2 && !phoneRegex.test(guardianData.telefono2)) {
        throw new Error('El teléfono secundario debe contener al menos 9 dígitos numéricos');
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/apoderados`, 
        guardianData
      );

      setSuccess(true);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al crear apoderado:', err);
      setError(err.response?.data?.message || err.message || 'Error al crear apoderado');
      setLoading(false);
      return null;
    }
  };

  const resetStatus = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return { 
    createGuardian, 
    loading, 
    error, 
    success, 
    resetStatus 
  };
};

export const EnrollUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createEnrollment = async (enrollmentData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Validar campos requeridos
      const requiredFields = ['dni', 'id_fechas_ciclo'];
      const missingFields = requiredFields.filter(field => !enrollmentData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
      }

      // Validar formato del DNI
      if (!/^\d{8}$/.test(enrollmentData.dni)) {
        throw new Error('El DNI debe tener exactamente 8 dígitos');
      }

      // Validar formato del id_fechas_ciclo
      if (!/^ciclo_(regular|verano|extraordinario)_\d{4}_\d{4}-[i|ii]$/i.test(enrollmentData.id_fechas_ciclo)) {
        throw new Error('Formato de ciclo inválido');
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/matriculas`, 
        enrollmentData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess(true);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al crear matrícula';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return { 
    createEnrollment, 
    loading, 
    error, 
    success, 
    resetStatus 
  };
};