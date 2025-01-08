import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'Lu',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Ma',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Mie',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Jue',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Vi',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Sa',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export const RadarChartComponent = () => {
  return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart width="80" height="80" cx="48%" cy="50%" outerRadius="70%" className='text-sm' data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
};