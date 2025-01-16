import { MainChart } from "src/components/overview/mainChart";
import { PieChartComponent } from "src/components/overview/pieChart";
import { BarChartComponent } from "src/components/overview/barChart";
import { RadarChartComponent } from "src/components/overview/radarChart";
import { OverviewCard } from "src/components/overview/overviewCard";

const Overview = () => {

  return (
    <section className='max-w-6xl mx-auto w-full h-[1800px] lg:h-[1000px] xl:h-full grid grid-cols-12 grid-rows-12 xl:grid-rows-10 gap-x-6 gap-y-4 py-0 xl:py-4'>
      <MainChart />
      <PieChartComponent />
      <BarChartComponent />
      <RadarChartComponent />
      <OverviewCard />
    </section>
  );
};

export default Overview;
