import { 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from './firebase';
import QRCode from 'qrcode';

// Añadir un nuevo estudiante
export const añadirEstudiante = async (datosEstudiante) => {
  try {
    // Generar código QR único
    const codigoQR = await QRCode.toDataURL(JSON.stringify({
      id: datosEstudiante.id,
      nombres: datosEstudiante.nombres,
      apellidos: datosEstudiante.apellidos
    }));

    const estudianteConQR = {
      ...datosEstudiante,
      codigoQR,
      activo: true,
      fechaRegistro: new Date(),
      registrosAsistencia: []
    };

    const docRef = await addDoc(collection(db, 'estudiantes'), estudianteConQR);
    return docRef.id;
  } catch (error) {
    console.error("Error al añadir estudiante:", error);
    throw error;
  }
};

// Eliminar estudiante
export const eliminarEstudiante = async (idEstudiante) => {
  try {
    await deleteDoc(doc(db, 'estudiantes', idEstudiante));
  } catch (error) {
    console.error("Error al eliminar estudiante:", error);
    throw error;
  }
};

// Actualizar datos de estudiante
export const actualizarEstudiante = async (idEstudiante, datosActualizados) => {
  try {
    const estudianteRef = doc(db, 'estudiantes', idEstudiante);
    await updateDoc(estudianteRef, datosActualizados);
  } catch (error) {
    console.error("Error al actualizar estudiante:", error);
    throw error;
  }
};

// Registrar asistencia por QR
export const registrarAsistencia = async (codigoQR) => {
  try {
    // Buscar estudiante por código QR
    const q = query(
      collection(db, 'estudiantes'), 
      where('codigoQR', '==', codigoQR)
    );

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Estudiante no encontrado');
    }

    const estudiante = querySnapshot.docs[0];
    const fechaActual = new Date();

    // Lógica para registrar entrada o salida
    const registroAsistencia = {
      fecha: fechaActual.toISOString().split('T')[0],
      horaEntrada: fechaActual.toLocaleTimeString(),
      estado: 'presente'
    };

    // Actualizar registro de asistencia
    await updateDoc(estudiante.ref, {
      registrosAsistencia: [...estudiante.data().registrosAsistencia, registroAsistencia]
    });

    return registroAsistencia;
  } catch (error) {
    console.error("Error al registrar asistencia:", error);
    throw error;
  }
};