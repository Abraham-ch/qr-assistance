import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { GetAssistances } from '../Users/getUsers';

export const BarChartComponent = () => {
  const { loading, error, getAttendanceByPeriod } = GetAssistances();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const periodData = getAttendanceByPeriod();

  return (
    <ResponsiveContainer className='col-span-8 xl:col-span-6 row-span-4 xl:row-span-5 bg-white shadow-sm pb-6 pt-6 text-sm rounded-md w-fit' height="100%">
      <h2 className="text-start pb-1 px-8 text-xs font-semibold">Cantidad de asistencias</h2>
        <p className="text-start px-8 text-neutral-600 text-xs pb-2">
          Número de asistencias registradas por periodo académico.
        </p>
      <BarChart
        data={periodData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <XAxis 
          dataKey="name"
          interval={0}
          height={70}
        />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip 
          formatter={(value, name) => {
            if (name === "asistencias") return [`${value} asistencias`, "Total Asistencias"];
            return [`${value} estudiantes`, "Total Estudiantes"];
          }}
        />
        <Bar 
          yAxisId="left"
          dataKey="asistencias" 
          name="Total Asistencias"
          fill="#8884d8" 
        />
        <Bar 
          yAxisId="right"
          dataKey="estudiantes" 
          name="Total Estudiantes"
          fill="#82ca9d" 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
