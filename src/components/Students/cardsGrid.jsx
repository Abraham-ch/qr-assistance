import Card from "./studentCard";
import { useState } from "react";

export default function CardGridPrintConfig({ students }) {
  const [open, setOpen] = useState(false);

  const handlePrint = () => {
    window.print();
    setOpen(false);
  };

  return (
    <div>
      <button
        className='border px-3 py-2 rounded-lg flex gap-x-3 items-center hover:bg-gray-200/50'
        onClick={() => setOpen(true)}
      >
        Imprimir
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-printer"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" /></svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" bg-white p-6 rounded-md shadow-lg print:aspect-[210/297] print:h-full print:w-auto">
            <h2 className="text-lg font-bold mb-4">Configuración de Impresión</h2>
            <p className="text-sm text-gray-500 mb-4">
              Esta configuración imprime 6 carnés de estudiante por hoja en un diseño 2x3.
            </p>
            {/* Vista previa del diseño */}
            <div className="border-2 border-dashed border-gray-300 p-4 bg-gray-50">
              <div className="grid grid-cols-2 grid-rows-3 gap-4 h-full">
                {students.slice(0, 6).map((student, index) => (
                  <Card
                    key={index}
                    id={student.id}
                    nombre={student.nombre}
                    apellido={student.apellido}
                    dni={student.dni}
                    nivel={student.nivel}
                    grado={student.grado}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handlePrint}
              >
                Confirmar e Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
