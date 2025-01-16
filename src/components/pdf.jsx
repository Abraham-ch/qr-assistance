import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import { useAssistances } from './Users/useAssistances';
import Pdf from "assets/svg/pdf.svg"; 
import Logo from 'assets/img/dashboardlogo.png';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10
  },
  logoContainer: {
    width: 100,
    height: 50,
    border: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center'
  },
  dateContainer: {
    width: 150,
    justifyContent: 'center'
  },
  studentInfo: {
    flexDirection: 'row',
    marginBottom: 20
  },
  leftInfo: {
    width: '50%'
  },
  rightInfo: {
    width: '50%',
    alignItems: 'flex-start'
  },
  table: {
    marginTop: 20,
    border: 1,
    borderRadius: 5,
    width: '100%'  // Asegura que la tabla ocupe todo el ancho
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#F8F9FA',
    width: '100%'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    width: '100%'
  },
  tableCell: {
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE'
  },
  cell1: { width: '20%' },
  cell2: { width: '15%' },
  cell3: { width: '15%' },
  cell4: { width: '20%' },
  cell5: { width: '15%' },
  cell6: { width: '15%' },
  text: {
    fontSize: 10,
  },
  title: {
    fontSize: 16,
  }
});

const StudentPDF = ({ student, assistanceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View >
          <Image src={Logo} style={{ width: 100, height: 50 }} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Academia Galoiss</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.text}>Fecha de Impresión:</Text>
          <Text style={styles.text}>{new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Información del estudiante */}
      <View style={styles.studentInfo}>
        <View style={styles.leftInfo}>
          <Text style={styles.text}>Nombre: {student.nombre}</Text>
          <Text style={styles.text}>Apellido: {student.apellido}</Text>
          <Text style={styles.text}>Edad: {student.edad}</Text>
        </View>
        <View style={styles.rightInfo}>
          <Text style={styles.text}>Código: {student.id}</Text>
          <Text style={styles.text}>Número de teléfono: {student.telefono}</Text>
          <Text style={styles.text}>Apoderado: {student.apoderado}</Text>
        </View>
      </View>

      {/* Tabla */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <View style={[styles.tableCell, styles.cell1]}>
            <Text style={styles.text}>Fecha</Text>
          </View>
          <View style={[styles.tableCell, styles.cell2]}>
            <Text style={styles.text}>CICLO</Text>
          </View>
          <View style={[styles.tableCell, styles.cell3]}>
            <Text style={styles.text}>PERIODO</Text>
          </View>
          <View style={[styles.tableCell, styles.cell4]}>
            <Text style={styles.text}>ASISTENCIA</Text>
          </View>
          <View style={[styles.tableCell, styles.cell5]}>
            <Text style={styles.text}>FALTA</Text>
          </View>
          <View style={[styles.tableCell, styles.cell6]}>
            <Text style={styles.text}>TARDANZA</Text>
          </View>
        </View>

        {/* Asistencia del estudiante */}

        {assistanceData.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.tableCell, styles.cell1]}>
              <Text style={styles.text}>{row.fecha}</Text>
            </View>
            <View style={[styles.tableCell, styles.cell2]}>
              <Text style={styles.text}>{student.ciclo}</Text>
            </View>
            <View style={[styles.tableCell, styles.cell3]}>
              <Text style={styles.text}>{student.periodo}</Text>
            </View>
            <View style={[styles.tableCell, styles.cell4]}>
              <Text style={styles.text}>{row.asistencia ? "X" : ""}</Text>
            </View>
            <View style={[styles.tableCell, styles.cell5]}>
              <Text style={styles.text}>{row.falta ? "X" : ""}</Text>
            </View>
            <View style={[styles.tableCell, styles.cell6]}>
              <Text style={styles.text}>{row.tardanza ? "X" : ""}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export const PDFButton = ({ student }) => {
  const { getAssistancesByUser } = useAssistances();
  
  const handleOpenPDF = async () => {
    try {
      // Obtener los datos de asistencia
      const assistanceData = getAssistancesByUser(student.id, student.ciclo, student.periodo);
      
      // Generar el PDF
      const blob = await pdf(
        <StudentPDF 
          student={student} 
          assistanceData={assistanceData}
        />
      ).toBlob();
      
      // Crear URL y abrir en nueva pestaña
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      
      // Limpieza de la URL después de un tiempo
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 100);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      // Aquí podrías agregar alguna notificación de error al usuario
    }
  };

  return (
    <button
      onClick={handleOpenPDF}
      className="border rounded-md p-2 hover:bg-slate-100 inline-flex items-center text-sm text-blue-500"
      title="Ver PDF"
    >
      <img src={Pdf} alt="PDF" className="w-5 h-5" />
    </button>
  );
};

