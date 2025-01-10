import { Radar, RadarChart, PolarGrid, Tooltip, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { GetAssistances } from '../Users/getUsers';

export const RadarChartComponent = () => {
  const { loading, error, getAttendanceByWeekday } = GetAssistances();
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const weekData = getAttendanceByWeekday();
  return (
      <ResponsiveContainer className='flex flex-col col-span-3 row-span-5 bg-white shadow-sm pb-4 pt-10 text-sm rounded-md items-center justify-center'>
        <h2 className="self-start text-start pb-1 px-8 text-xs font-semibold">Cantidad de asistencias</h2>
        <p className="self-start text-start px-8 text-neutral-600 text-xs">
          Número de asistencias semanalmente.
        </p>
        <RadarChart cx="48%" cy="50%" outerRadius="80%" className='text-sm' style={
          {width: '90%', height: '90%', padding: '0px'}
        } data={weekData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Tooltip 
            formatter={(value) => [`${value} asistencias`]}
          />
          <Radar name="Asistencias" dataKey="asistencias" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
};