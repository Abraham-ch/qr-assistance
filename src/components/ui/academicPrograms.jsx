const AcademicPrograms = () => {
  const programs = [
    {
      title: "Plan Verano",
      description: "Prepárate intensivamente durante las vacaciones de verano.",
      color: "bg-blue-600",
      accent: "bg-blue-500",
    },
    {
      title: "Plan Anual",
      description: "Preparación completa durante todo el año académico.",
      color: "bg-emerald-600",
      accent: "bg-emerald-500",
    },
    {
      title: "Plan Semestral",
      description: "Programa intensivo de 6 meses para tu preparación.",
      color: "bg-purple-600",
      accent: "bg-purple-500",
    },
    {
      title: "Plan COAR",
      description: "Preparación especializada para el Colegio de Alto Rendimiento.",
      color: "bg-amber-600",
      accent: "bg-amber-500",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {programs.map((program, index) => (
        <div key={index} className="relative rounded-xl overflow-hidden shadow-lg">
          <div className={`${program.color} h-full w-full p-8`}>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">{program.title}</h2>
              <p className="text-white/90 mb-6">{program.description}</p>
              <button className="bg-white text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Conoce más
              </button>
            </div>
            
            <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden">
              <div className={`${program.accent} transform rotate-45 translate-x-1/2 -translate-y-1/2 w-32 h-64 absolute top-0 right-0 opacity-50`}></div>
            </div>
            
            <div className="absolute bottom-4 left-4 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-8 ${program.accent} opacity-50 transform rotate-12`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcademicPrograms;