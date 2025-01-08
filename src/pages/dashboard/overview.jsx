import { MainChart } from "src/components/overview/mainChart";
import { PieChartComponent } from "src/components/overview/pieChart";
import { BarChartComponent } from "src/components/overview/barChart";
import { RadarChartComponent } from "src/components/overview/radarChart";

const Overview = () => {

  return (
    <section className='max-w-6xl mx-auto w-full h-full grid grid-cols-7 grid-rows-10 gap-x-6 gap-y-4 py-6 px-8'>
      <div className='col-span-1 row-span-10 border rounded-md'>
      </div>
      <div className='col-span-4 row-span-5 border-2 pb-6 pt-6 text-sm rounded-md' >
        <h2 className="text-start pb-1 px-8 text-xs font-semibold">Cantidad de asistencias</h2>
        <p className="text-start px-8 text-neutral-600 text-xs pb-2">
          Número de asistencias registradas en el mes de Enero.
        </p>
        <MainChart />
      </div>
      <div className='col-span-2 row-span-5 flex items-center justify-center border'>
        <PieChartComponent />
      </div>

      <div className='col-span-4 row-span-5 border'>
        <BarChartComponent />
      </div>
      <div className='col-span-2 row-span-5 flex items-center justify-center border'>
        <RadarChartComponent />
      </div>
    </section>
  );
};

export default Overview;
