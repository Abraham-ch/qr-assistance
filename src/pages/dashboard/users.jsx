import { useState } from 'react';
import { AddUsers } from '../../components/Users/addUsers';

function Users() {
  const { createStudent, loading, error, success, resetStatus } = AddUsers();
  
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    matricula: '',
    nivel: '',
    grado: '',
    estado: 'Pendiente' // valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await createStudent(formData);
    
    if (result) {
      // Limpiar formulario
      setFormData({
        id: '',
        nombre: '',
        apellido: '',
        matricula: '',
        nivel: '',
        grado: '',
        estado: 'Pendiente'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {success && <div style={{color: 'green'}}>Estudiante creado exitosamente</div>}

      <input
        type="text"
        name="id"
        placeholder="DNI"
        value={formData.id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={formData.apellido}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="matricula"
        placeholder="Matrícula"
        value={formData.matricula}
        onChange={handleChange}
        required
      />
      <select
        name="nivel"
        value={formData.nivel}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar Nivel</option>
        <option value="Primaria">Primaria</option>
        <option value="Secundaria">Secundaria</option>
      </select>
      <select
        name="grado"
        value={formData.grado}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar Grado</option>
        <option value="1ro">1ro</option>
        <option value="2do">2do</option>
        <option value="3ro">3ro</option>
        <option value="4to">4to</option>
        <option value="5to">5to</option>
      </select>
      <select
        name="estado"
        value={formData.estado}
        onChange={handleChange}
        required
      >
        <option value="Pendiente">Pendiente</option>
        <option value="Matriculado">Matriculado</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Estudiante'}
      </button>
    </form>
  );
}

export default Users;
