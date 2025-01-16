import { useEffect, useState } from "react";
import axios from "axios";

export const useUsers = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/estudiantes`);

      const formattedStudents = response.data.data.map(student => ({
        id: student.id_estudiante,
        nombre: student.nombre,
        apellido: student.apellido,
        dni: student.dni,
        nivel: student.nivel,
        grado: student.grado,
      }));

      setStudents(formattedStudents);
      setLoading(false);
    } catch (err) {
      console.error('Error al obtener los estudiantes:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, error, refetch: fetchStudents };
};