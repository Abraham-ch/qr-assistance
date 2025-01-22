import { Radar, RadarChart, PolarGrid, Tooltip, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useAssistances } from '../Users/useAssistances';
import BarLoader from '../loaders/barLoader';

export const RadarChartComponent = () => {
  const { loading, error, getAttendanceByWeekday } = useAssistances();
  
  if (loading) 
    return (
      <div className='row-start-7 lg:row-start-9 xl:row-start-6 col-start-1 lg:col-start-7 xl:col-start-7 col-span-full lg:col-span-6 xl:col-span-3 row-span-2 lg:row-span-4 xl:row-span-5 flex xl:flex-col flex-row bg-white shadow-sm text-sm rounded-md items-center justify-center w-full h-full pl-10 py-4'>
        <BarLoader />
      </div>
      )
  if (error) return <div>Error: {error}</div>;

  const weekData = getAttendanceByWeekday();
  return (
      <ResponsiveContainer className='row-start-7 lg:row-start-9 xl:row-start-6 col-start-1 lg:col-start-7 xl:col-start-7 col-span-full lg:col-span-6 xl:col-span-3 row-span-2 lg:row-span-4 xl:row-span-5 flex xl:flex-col flex-row bg-white shadow-sm xl:pt-6 text-sm rounded-md items-center justify-center w-fit'>
        <span className=''>
          <h2 className="self-start text-start pb-1 pl-6 xl:pl-2 text-xs font-semibold">Cantidad de asistencias</h2>
          <p className="self-start text-start pl-6 xl:pl-2 text-neutral-600 text-xs">
          Número de asistencias semanalmente.
        </p>
        </span>
        <RadarChart cx="48%" cy="50%" outerRadius="95%" className='text-sm' style={
          {width: '90%', height: '90%', paddingLeft:'12px', paddingRight: '12px' }
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