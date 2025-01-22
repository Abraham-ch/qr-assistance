import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAssistances } from '../Users/useAssistances';
import BarLoader from '../loaders/barLoader';

export const MainChart = () => {
  const { loading, error, getAttendanceByDay } = useAssistances();

  if (loading) 
    return (
      <div className='col-span-full lg:col-span-8 xl:col-span-6 row-span-2 lg:row-span-4 xl:row-span-5 rounded-md bg-white shadow-sm pb-6 pt-6 text-sm w-full'>
        <BarLoader />
      </div>
      )
  if (error) return <div>Error: {error}</div>;

  const data = getAttendanceByDay().map(item => ({
    name: new Date(item.date).toLocaleDateString('es-ES', { 
      day: '2-digit'
    }),
    asistencias: item.count 
  }));

  return (
    <ResponsiveContainer className='col-span-full lg:col-span-8 xl:col-span-6 row-span-2 lg:row-span-4 xl:row-span-5 rounded-md bg-white shadow-sm pb-6 pt-6 text-sm w-fit'>
      <h2 className="text-start pb-1 px-8 text-xs font-semibold">Cantidad de asistencias</h2>
        <p className="text-start px-8 text-neutral-600 text-xs pb-2">
          Número de asistencias registradas en el mes de Enero.
        </p>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 40,
          left: 0,
          bottom: 30,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tickLine={true} range={[1,31]}/>
        <YAxis dataKey="asistencias" allowDecimals={false} tickLine={true} tickCount={4}/>
        <Tooltip />
        <Area
          type="monotone"
          dataKey="asistencias"
          stroke="#8884d8"
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};