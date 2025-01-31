import Carousel from "src/components/ui/carousel";
import AcademicPrograms from "src/components/ui/academicPrograms";

export const Students = () => {
  return (
    <section className="flex flex-col gap-y-8 items-center ">
      <div className="bg-gray-100 py-10 w-full">
        <Carousel />
      </div>
      <AcademicPrograms />
    </section>
  );
};