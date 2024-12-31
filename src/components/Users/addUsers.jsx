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
      const requiredFields = ['nombre', 'apellido', 'nivel', 'grado'];
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
      setError(err.response?.data?.message || err.message || 'Error al crear estudiante');
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
      const requiredFields = ['dni', 'ciclo', 'periodo'];
      const missingFields = requiredFields.filter(field => !enrollmentData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/matriculas`, 
        enrollmentData
      );

      setSuccess(true);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al crear matrícula:', err);
      setError(err.response?.data?.message || err.message || 'Error al crear matrícula');
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
    createEnrollment, 
    loading, 
    error, 
    success, 
    resetStatus 
  };
};