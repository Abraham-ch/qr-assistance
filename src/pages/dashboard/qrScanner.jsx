import { useEffect} from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

const QrScanner = () => {

  useEffect(() => {
    function onScanSuccess(decodedText, decodedResult) {
      console.log(`Code matched = ${decodedText}`, decodedResult);
    }

    const config = {
      fps: 10,
      qrbox: {width: 100, height: 100},
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader", config, /* verbose= */ false);
    
    html5QrcodeScanner.render(onScanSuccess);

    // Cleanup function
    return () => {
      html5QrcodeScanner.clear();
    };
  }, []);

  return (
    <>
      <section className='flex w-full justify-center items-center h-full'>
        <div id="reader" style={{width: '600px'}}></div>
      </section>
    </>
  );
};

export default QrScanner;