import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAssistances = () => {
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

  const getAssistancesByUser = (studentId, cycle, period) => {
    const userAssistances = assistances.filter(assistance => 
      assistance.studentId === studentId &&
      assistance.cycle === cycle &&
      assistance.period === period
    );

    // Agrupar por fecha y tipo
    const attendanceSummary = {};
    
    userAssistances.forEach(assistance => {
      const dateKey = assistance.date;
      if (!attendanceSummary[dateKey]) {
        attendanceSummary[dateKey] = {
          fecha: dateKey,
          asistencia: 0,
          tardanza: 0,
          falta: 0
        };
      }

      switch (assistance.type.toLowerCase()) {
        case 'entrada':
          attendanceSummary[dateKey].asistencia = 1;
          break;
        case 'tardanza':
          attendanceSummary[dateKey].tardanza = 1;
          break;
        case 'falta':
          attendanceSummary[dateKey].falta = 1;
          break;
      }
    });

    return Object.values(attendanceSummary);
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
    getAttendanceByWeekday,
    getAssistancesByUser 
  };
};
