import { useState } from 'react';
import axios from 'axios';

export const useAttendance = () => {
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