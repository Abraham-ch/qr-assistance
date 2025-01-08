import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { GetAssistances } from '../Users/getUsers';

export const BarChartComponent = () => {
  const { loading, error, getAttendanceByPeriod } = GetAssistances();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const periodData = getAttendanceByPeriod();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={periodData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 70
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
