import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { useEffect } from "react";
import useAttendance from "components/Users/addUsers";
import { prepareAttendanceData } from "components/utils/attendanceUtils";

const QrScanner = () => {
  const { createAttendance, scanStatus } = useAttendance();

  useEffect(() => {
    let htmlscanner;
    let lastResult;
    let isComponentMounted = true;

  const onScanSuccess = async (decodedText) => {
    if (decodedText !== lastResult && isComponentMounted) {
      lastResult = decodedText;

      console.log('QR escaneado:', decodedText);
      const attendanceData = prepareAttendanceData(decodedText);
      console.log('Datos preparados:', attendanceData);
      await createAttendance(attendanceData);
    }
  };
    const initializeScanner = () => {
      if (!isComponentMounted) return;

      htmlscanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        }
      );

      htmlscanner.render(onScanSuccess);
    };

    if (document.readyState === 'complete' || document.readyState === "interactive") {
      setTimeout(initializeScanner, 1);
    } else {
      document.addEventListener('DOMContentLoaded', initializeScanner);
    }

    return () => {
      isComponentMounted = false;
      
      if (htmlscanner) {
        htmlscanner.clear()
          .catch(err => {
            console.warn('Error al limpiar el scanner:', err);
          });
      }

      document.removeEventListener('DOMContentLoaded', initializeScanner);
    };
  }, [createAttendance]);

  return (
    <section className='flex w-full justify-center items-center h-full flex-col'>
      <div id="reader" style={{width: '600px'}}></div>
      {scanStatus && (
        <div className="mt-4 text-center p-4 bg-gray-100 rounded">
          {scanStatus}
        </div>
      )}
    </section>
  );
};

export default QrScanner;