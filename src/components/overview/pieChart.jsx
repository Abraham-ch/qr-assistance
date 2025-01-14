import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: "Hombres", value: 400, fill: '#8884d8' },
  { name: "Mujeres", value: 300, fill: '#83a6ed' }
];

export function PieChartComponent () {
  return (
    <ResponsiveContainer className='row-start-9 xl:row-start-1 col-start-1 xl:col-start-7 col-span-6 xl:col-span-3 row-span-4 xl:row-span-5 pb-4 pt-6 text-sm rounded-md bg-white shadow-sm items-center justify-center w-fit flex xl:flex-col flex-row'>
        <span>
          <h2 className="self-start text-start pb-1 px-8 text-xs font-semibold">Relacion estudiantes</h2>
          <p className="text-start px-8 text-neutral-600 text-xs">
          Relación entre estudiantes masculinos, femeninos matriculados.
        </p>
        </span>
        <PieChart style={{ width: '100%', height: '80%' }} className='text-sm py-2 items-center flex flex-col justify-center' margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Pie
            alignmentBaseline='auto'
            className='items-center'
            startAngle={90}
            endAngle={450}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          />
          <Legend iconSize={10} verticalAlign='bottom' align='center' wrapperStyle={{ width: 'auto', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto', position: 'relative', display:'block'  }} layout={'horizontal'}/>  
        </PieChart>
        <Tooltip />
    </ResponsiveContainer>
  );
};
