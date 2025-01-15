import { useState, useEffect } from "react";
import axios from "axios";

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/matriculas`);

      const formattedEnrollments = response.data.data.map(enrollment => ({
        id: enrollment.id_estudiante,
        id_matricula: enrollment.id_matricula,
        ciclo: enrollment.ciclo,
        periodo: enrollment.periodo,
        fechaInicial: enrollment.created_at,
        fechaFinal: enrollment.end_date,
      }));

      setEnrollments(formattedEnrollments);
      setLoading(false);
    } catch (err) {
      console.error('Error al obtener los alumnos:', err);
      setError('Error al cargar los datos de los alumnos.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  return { enrollments, loading, error, refetch: fetchEnrollments };
};