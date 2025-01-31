import { BenefitCard } from "components/ui/benefitCard";

import book from "assets/svg/book.svg";
import presentation from "assets/svg/presentation.svg";
import tuition from "assets/svg/tuitition.svg";
import group from "assets/svg/group.svg";

import prep01 from "assets/img/prep01.jpg";
import prep02 from "assets/img/prep02.jpg";
import prep03 from "assets/img/prep03.jpg";

export const Benefits = () => {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-y-8 items-center bg-gray-100 py-16 ">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold pb-12">¿Quienes se benefician de nuestra academia?</h2>
        <div className="max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-2 sm:gap-x-6">
          <BenefitCard title="Estudiantes de colegio" description="Refuerza tus conocimientos y prepárate para los exámenes de ingreso a la universidad con clases dinámicas y especializadas." icon={book} alt="Book svg" cn={"bg-blue-500"} />

          <BenefitCard title="Estudiantes independientes" description="Acceso a tutorías personalizadas para reforzar áreas específicas y alcanzar tus metas académicas." icon={presentation} alt="Presentation svg" cn={"bg-yellow-500"} />

          <BenefitCard title="Grupos de estudio" description="Clases diseñadas para equipos de estudiantes que buscan apoyo adicional en un ambiente colaborativo." icon={group} alt="Group svg" cn={"bg-sky-400"} />

          <BenefitCard title="Padres y familias" description="Asesoría sobre cómo apoyar a tus hijos en su camino preuniversitario con nuestros recursos y orientación profesional." icon={tuition} alt="Tuition svg" cn={"bg-red-500"} />
        </div>
      </div>
      <div className="flex">
        <img src={prep01} alt="prep01" className="object-cover rounded-sm w-1/3 aspect-square" />
        <img src={prep02} alt="prep02" className="object-cover rounded-sm w-1/3 aspect-square" />
        <img src={prep03} alt="prep03" className="object-cover rounded-sm w-1/3 aspect-square" />
      </div>
    </section>
  );
};