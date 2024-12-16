import { useState, useEffect } from 'react';
import axios from 'axios';

export const GetUsers = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/students`);

      const formattedStudents = response.data.map(student => ({
        id: student.id_estudiante,
        nombre: student.nombre,
        apellido: student.apellido,
        dni: student.dni,
        matricula: student.matricula,
        nivel: student.nivel,
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

export const GetEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/enrollments`);

      const formattedEnrollments = response.data.map(enrollment => ({
        id: enrollment.id_estudiante,
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