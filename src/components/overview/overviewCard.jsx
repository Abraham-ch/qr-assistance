import { useState, useCallback } from 'react';
import { useUsers } from '../Users/useUsers'; 
import { useAssistances } from '../Users/useAssistances';
import VanillaCalendar from '../ui/vanillaCalendar';
import BarLoader from '../loaders/barLoader';

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
  const { students, loading, error } = useUsers();
  const { assistances } = useAssistances();
  const [today, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateSelect = useCallback((selectedDate) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
      console.log("Fecha seleccionada:", selectedDate);
    }
  }, []);

  if (loading) 
    return (
      <div className="col-start-1 lg:col-start-9 xl:col-start-10 row-start-9 lg:row-start-1 col-span-full lg:col-span-4 xl:col-span-3 xl:row-start-1 row-span-4 lg:row-span-8 xl:row-span-10 grid grid-rows-12 gap-y-4 w-full" height="100%" width="100%">
        <BarLoader />
      </div>
      )
  if (error) return <div>Error: {error}</div>;

  const totalStudents = students.length;
  const presentStudents = assistances.filter(
    attendance => 
      attendance.date === today && 
      attendance.type === 'Entrada'
  ).length;
  const absentStudents = totalStudents - presentStudents;

  return (
    <div className="col-start-1 lg:col-start-9 xl:col-start-10 row-start-9 lg:row-start-1 col-span-full lg:col-span-4 xl:col-span-3 xl:row-start-1 row-span-4 lg:row-span-8 xl:row-span-10 grid grid-rows-12 gap-y-4 w-full">
      <div className="row-span-6 w-full rounded-md bg-white shadow-sm">
        <VanillaCalendar 
          config={{
            selectedTheme: 'light'
          }}
          onDateSelect={handleDateSelect}
        />
      </div>
      <Card title="Total de Estudiantes" description={totalStudents} />
      <Card title="Presentes" description={presentStudents} />
      <Card title="Faltas" description={absentStudents} />
    </div>
  );
};
