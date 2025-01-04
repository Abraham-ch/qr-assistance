export const MainSection = () => {
  return (
    <section className="h-[calc(100vh-64px)] flex flex-row items-center justify-around max-w-7xl mx-auto gap-x-12 px-10 lg:px-0">
      <div className="relative text-center text-white sm:text-black sm:text-left sm:w-1/3 lg:w-1/2 lg:max-w-sm flex flex-col gap-y-8 pr-0 lg:pr-4">
        <h1 className="text-4xl lg:text-5xl font-bold">Aprende, crece y alcanza tus metas.</h1>
        <button className="sm:self-start self-center px-16 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 sm:bg-blue-700 sm:hover:bg-blue-600 transition-colors duration-300 text-white font-semibold items-center">Acceder</button>
      </div>
      <div className=" -z-10 brightness-50 sm:brightness-100 absolute sm:relative w-full md:w-2/3 lg:w-1/2 sm:h-auto h-full">
        <img src="https://plus.unsplash.com/premium_photo-1661909267383-58991abdca51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Estudiantes hablando" className="object-cover h-full sm:rounded-xl" />
      </div>
    </section>
    
  );
};