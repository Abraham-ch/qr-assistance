import { useState } from 'react';
import { 
  añadirEstudiante
} from './studentService';

const StudentGestor = () => {
  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombres: '',
    apellidos: '',
    grado: ''
  });

  const handleAñadirEstudiante = async (e) => {
    e.preventDefault();
    try {
      await añadirEstudiante(nuevoEstudiante);
      // Limpiar formulario
      setNuevoEstudiante({
        nombres: '',
        apellidos: '',
        grado: ''
      });
    } catch (error) {
      alert('Error al añadir estudiante');
    }
  };

  return (
    <div>
      <h2>Gestión de Estudiantes</h2>
      <form onSubmit={handleAñadirEstudiante}>
        <input 
          type="text"
          placeholder="Nombres"
          value={nuevoEstudiante.nombres}
          onChange={(e) => setNuevoEstudiante({
            ...nuevoEstudiante, 
            nombres: e.target.value
          })}
        />
        {/* Campos similares para apellidos y grado */}
        <button type="submit">Añadir Estudiante</button>
      </form>
    </div>
  );
};

export default StudentGestor;