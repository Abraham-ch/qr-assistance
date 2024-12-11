import { useState, useEffect } from 'react';
import axios from 'axios';

export const GetUsers = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estudiantes`);
      
      const formattedStudents = response.data.map(student => ({
        id: student.id_estudiante,
        alumno: `${student.nombre} ${student.apellido}`,
        matricula: student.matricula,
        grado: student.grado,
        estado: student.estado,
      }));

      setStudents(formattedStudents);
      setLoading(false);
    } catch (err) {
      console.error('Error al obtener los estudiantes:', err);
      setError('Error al cargar los datos de los estudiantes.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, error, refetch: fetchStudents };
};