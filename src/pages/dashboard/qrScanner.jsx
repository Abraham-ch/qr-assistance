import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import axios from "axios";
import { useState } from "react";

const QrScanner = () => {
  const [scanStatus, setScanStatus] = useState("");

  function domReady(fn) {
    if (document.readyState === 'complete' || document.readyState === "interactive") {
      setTimeout(fn, 1);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  const enviarAsistencia = async (idEstudiante) => {
    try {
      const fechaActual = new Date().toISOString().split('T')[0];
      const hora = new Date().getHours();
      
      console.log("Fecha actual:", fechaActual);
      console.log("Hora actual:", hora);
      // Determina si es entrada o salida basado en la hora
      const tipo = hora < 12 ? "Entrada" : "Salida";
      
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/asistencias`, {
        id_estudiante: idEstudiante,
        fecha: fechaActual,
        tipo: tipo
      });

      if (response.status === 200) {
        setScanStatus(`Asistencia registrada correctamente - ${tipo}`);
      }
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
      setScanStatus("Error al registrar la asistencia");
    }
  };

  domReady(function(fechaActual, hora) {
    var myqr = document.getElementById("reader");
    var lastResult, countResults = 0;

    function onScanSuccess(decodedText, decodedResult) {
      if(decodedText !== lastResult) {
        countResults++;
        lastResult = decodedText;
        
        // Toma los primeros 8 caracteres del texto escaneado
        const idEstudiante = decodedText.substring(0, 8);
        
        // Verifica que el ID tenga 8 caracteres
        if (idEstudiante.length === 8) {
          enviarAsistencia(idEstudiante);
          myqr.innerHTML = `<div>ID: ${idEstudiante}</div> <div>Fecha: ${fechaActual}</div> <div>Hora: ${hora}</div>`;
        } else {
          setScanStatus("QR inválido: el ID debe tener 8 caracteres");
        }
      }
    }

    var htmlscanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {width: 250, height: 250},
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
      }
    );

    htmlscanner.render(onScanSuccess);
  });

  return (
    <>
      <section className='flex w-full justify-center items-center h-full'>
        <div id="reader" style={{width: '600px'}}></div>
      </section>
    </>
  );
};

export default QrScanner;