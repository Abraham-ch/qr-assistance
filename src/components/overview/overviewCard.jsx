import { useState } from 'react';
import { GetUsers, GetAssistances } from '../Users/getUsers';
import VanillaCalendar from '../ui/vanillaCalendar';

const Card = ({ title, description }) => {
  return (
    <div className="row-span-2 flex divide-x justify-between rounded-md bg-white shadow-sm px-5 py-3.5">
      <div className='flex h-full w-1/2 items-center'>
        <h3 className="text-start text-sm text-gray-600">{title}</h3>
      </div>
      <div className='flex h-full w-1/2 justify-center items-center'>
        <p className="text-2xl font-semibold">{description}</p>
      </div>
    </div>
  );
};

export const OverviewCard = () => {
  const { students, loading, error } = GetUsers();
  const { assistances } = GetAssistances();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateSelect = (date) => {
    // Convertir la fecha seleccionada al formato ISO (YYYY-MM-DD)
    const selectedDate = new Date(date);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalStudents = students.length;
  const presentStudents = assistances.filter(
    attendance => 
      attendance.date === selectedDate && 
      attendance.type === 'Entrada'
  ).length;
  const absentStudents = totalStudents - presentStudents;

  return (
    <div className="col-start-9 row-start-1 col-span-2 row-span-10 grid grid-rows-12 gap-y-4">
      <div className="row-span-6 rounded-md bg-white shadow-sm">
        <VanillaCalendar 
          config={{
            selectedTheme: 'light',
            actions: {
              clickDay: (e, dates) => {
                handleDateSelect(dates[0]);
              }
            }
          }}
        />
      </div>
      <Card title="Total de Estudiantes" description={totalStudents} />
      <Card title="Presentes" description={presentStudents} />
      <Card title="Faltas" description={absentStudents} />
    </div>
  );
};
