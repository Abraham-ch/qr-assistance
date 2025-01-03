export const MainSection = () => {
  return (
    <section className="h-[calc(100vh-64px)] flex items-center justify-around max-w-7xl mx-auto gap-x-12">
      <div className="text-left max-w-sm flex flex-col gap-y-8 pr-4">
        <h1 className="text-5xl font-bold">Aprende, crece y alcanza tus metas.</h1>
        <button className="border px-16 py-2.5 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors duration-300 text-white font-semibold items-center self-start">Acceder</button>
      </div>
      <div className="w-1/2 h-auto">
        <img src="https://plus.unsplash.com/premium_photo-1661909267383-58991abdca51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Estudiantes hablando" className="object-cover rounded-xl" />
      </div>
    </section>
    
  );
};