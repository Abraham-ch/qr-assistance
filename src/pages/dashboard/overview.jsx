import { MainChart } from "src/components/overview/mainChart";
import { PieChartComponent } from "src/components/overview/pieChart";
import { BarChartComponent } from "src/components/overview/barChart";
import { RadarChartComponent } from "src/components/overview/radarChart";
import { OverviewCard } from "src/components/overview/overviewCard";

const Overview = () => {

  return (
    <section className='max-w-6xl w-full h-full grid grid-cols-10 grid-rows-10 gap-x-6 gap-y-4 py-6 px-8'>
      <MainChart />
      <PieChartComponent />
      <BarChartComponent />
      <RadarChartComponent />
      <OverviewCard />
    </section>
  );
};

export default Overview;
