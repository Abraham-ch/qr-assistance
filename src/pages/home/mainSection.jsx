import prepExc from 'assets/svg/prepExc.svg'
import img from 'assets/img/test1.jpg'
import wsp from 'assets/svg/wsp.svg'

export const MainSection = () => {
  return (
    <section className="h-[calc(100vh)] flex flex-row items-center justify-around max-w-7xl mx-auto gap-x-10 px-10">
      <div className="relative text-center text-white sm:text-black sm:text-left sm:w-1/3 lg:w-full lg:max-w-xl flex flex-col gap-y-4 pr-0 lg:pr-4">
        <span className='sm:self-start self-center text-xl font-bold px-6 pt-2 rounded-md bg-yellow-500 text-black md:w-4/5 xl:w-1/2 w-4/5 items-center'>
          <img src={prepExc} alt="Preparación de exámenes" className='' />
        </span>
        <h1 className="text-3xl md:text-4xl leading-normal lg:text-5xl font-semibold text-pretty">Preparación exclusiva con Galoiss</h1>
        <a href="https://wa.me/917888717" className="flex gap-x-2 sm:self-start self-center px-6 py-2.5 rounded-md bg-green-600 hover:bg-green-500 sm:bg-green-600 sm:hover:bg-green-700 transition-colors duration-300 text-white font-semibold items-center">
          <img src={wsp} alt="whatsapp logo" /> Contáctenos
        </a>
      </div>
      <div className=" -z-10 brightness-50 sm:brightness-100 absolute sm:relative w-full md:w-2/3 lg:w-1/2 sm:h-auto h-full">
        <img src={img} className='w-full h-full object-cover rounded-sm' alt="Imagen de portada" />
      </div>
    </section>
    
  );
};