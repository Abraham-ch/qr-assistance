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
      const requiredFields = ['dni', 'nombre', 'apellido', 'genero', 'telefono', 'direccion', 'nivel', 'grado'];
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

const useAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [scanStatus, setScanStatus] = useState("");

  const createAttendance = async (attendanceData) => {
    try {
      console.log('Datos enviados al backend:', {
        url: `${import.meta.env.VITE_BACKEND_URL}/api/asistencias`,
        data: attendanceData
      });
      
      setLoading(true);
      setError(null);
      setSuccess(false);

      const requiredFields = ['qr_content'];
      const missingFields = requiredFields.filter(field => !attendanceData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/asistencias/qr/`,
        attendanceData
      );

      console.log('Respuesta exitosa:', response.data);
      setSuccess(true);
      setScanStatus(`Asistencia registrada correctamente - ${attendanceData.tipo}`);
      return response.data;
    } catch (err) {
      console.error('Error detallado:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      const errorMessage = err.response?.data?.message || err.message || 'Error al registrar la asistencia';
      setError(errorMessage);
      setScanStatus(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setScanStatus("");
  };

  return {
    createAttendance,
    loading,
    error,
    success,
    scanStatus,
    resetStatus
  };
};

export default useAttendance;
