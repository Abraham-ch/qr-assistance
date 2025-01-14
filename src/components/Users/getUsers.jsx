import { useState, useEffect } from 'react';
import axios from 'axios';

export const GetUsers = () => {
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

export const GetEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/matriculas`);

      const formattedEnrollments = response.data.data.map(enrollment => ({
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

export const GetAssistances = () => {
  const [assistances, setAssistances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssistances = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/asistencias`);

      const formattedAssistances = response.data.map(assistance => ({
        id: assistance.id_asistencia,
        studentId: assistance.id_estudiante,
        cycle: assistance.ciclo,
        period: assistance.periodo,
        date: assistance.fecha,
        type: assistance.tipo,
        createdAt: assistance.created_at
      }));

      setAssistances(formattedAssistances);
      setLoading(false);
    } catch (err) {
      console.error('Error al obtener las asistencias:', err);
      setError('Error al cargar los datos de asistencias.');
      setLoading(false);
    }
  };

  const getAttendanceByDay = () => {
    const attendanceByDay = {};
    
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(firstDayOfMonth);
      date.setDate(date.getDate() + i );
      const dateString = date.toISOString().split('T')[0];
      attendanceByDay[dateString] = 0;
    }

    assistances.forEach(assistance => {
      if (assistance.type === 'Entrada') {
        const dateString = assistance.date;
        if (dateString in attendanceByDay) {
          attendanceByDay[dateString]++;
        }
      }
    });

    return Object.entries(attendanceByDay).map(([date, count]) => ({
      date,
      count
    }));
  };

  const getAttendanceByPeriod = () => {
    const attendanceByPeriod = {};

    assistances.forEach(assistance => {
      if (assistance.type === 'Entrada') {
        const periodKey = `${assistance.cycle} - ${assistance.period}`;
        if (!(periodKey in attendanceByPeriod)) {
          attendanceByPeriod[periodKey] = {
            name: periodKey,
            asistencias: 0,
            estudiantes: new Set()
          };
        }
        attendanceByPeriod[periodKey].asistencias++;
        attendanceByPeriod[periodKey].estudiantes.add(assistance.studentId);
      }
    });

    return Object.values(attendanceByPeriod).map(period => ({
      name: period.name,
      asistencias: period.asistencias,
      estudiantes: period.estudiantes.size
    }));
  };

  const getAttendanceByWeekday = () => {
    const weekDays = [
      { subject: 'Lu', asistencias: 0 },
      { subject: 'Ma', asistencias: 0 },
      { subject: 'Mie', asistencias: 0 },
      { subject: 'Jue', asistencias: 0 },
      { subject: 'Vi', asistencias: 0 },
      { subject: 'Sa', asistencias: 0 }
    ];

    assistances.forEach(assistance => {
      if (assistance.type === 'Entrada') {
        const date = new Date(assistance.date);
        const dayNum = date.getDay();
        
        if (dayNum >= 1 && dayNum <= 6) { // Lunes a Sábado
          weekDays[dayNum - 1].asistencias++;
        }
      }
    });

    return weekDays;
  };

  useEffect(() => {
    fetchAssistances();
  }, []);

  return { 
    assistances, 
    loading, 
    error, 
    refetch: fetchAssistances,
    getAttendanceByDay,
    getAttendanceByPeriod,
    getAttendanceByWeekday
  };
};
