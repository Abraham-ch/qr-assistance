import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: "Hombres", value: 400, fill: '#8884d8' },
  { name: "Mujeres", value: 300, fill: '#83a6ed' }
];

export function PieChartComponent () {
  return (
    <ResponsiveContainer className='col-span-3 row-span-5 pb-4 pt-6 text-sm rounded-md bg-white shadow-sm items-center justify-center'>
      <h2 className="self-start text-start pb-1 px-8 text-xs font-semibold">Relacion estudiantes</h2>
        <p className="text-start px-8 text-neutral-600 text-xs">
          Relación entre estudiantes masculinos, femeninos matriculados.
        </p>
        <PieChart style={{ width: '100%', height: '100%' }} className='text-sm py-2' margin={{ top: 0, right: 0, left: 0, bottom: 60 }}>
          <Pie
            startAngle={90}
            endAngle={450}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={75}
            fill="#8884d8"
            dataKey="value"
            label
          />
          <Legend iconSize={10} verticalAlign="bottom"/>
        </PieChart>
        <Tooltip />
    </ResponsiveContainer>
  );
};
