import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { GetAssistances } from '../Users/getUsers';

export const MainChart = () => {
  const { loading, error, getAttendanceByDay } = GetAssistances();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const data = getAttendanceByDay().map(item => ({
    name: new Date(item.date).toLocaleDateString('es-ES', { 
      day: '2-digit'
    }),
    asistencias: item.count
  }));

  return (
    <ResponsiveContainer className="h-fit w-fit">
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
        <XAxis dataKey="name" tickLine={true}/>
        <YAxis allowDecimals={false} tickLine={true} tickCount={4}/>
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