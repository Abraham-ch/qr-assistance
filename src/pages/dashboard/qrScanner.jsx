import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

const QrScanner = () => {

  function domReady(fn) {
    if (document.readyState === 'complete' || document.readyState === "interactive") {
      setTimeout(fn, 1);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  domReady(function() {
    var myqr = document.getElementById("reader");
    var lastResult,countResults = 0;

    function onScanSuccess(decodedText, decodedResult) {
      if(decodedText  !== lastResult){
        countResults++;
        lastResult = decodedText;
        console.log(`Code matched = ${decodedText}`, decodedResult);
        myqr.innerHTML = `<h1>Resultado ${countResults}: ${decodedText}</h1>`;
      }
    }
    var htmlscanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {width: 250, height: 250},
        rememberLastUsedCamera: true,
        //showFlipButton: true,
        //showSwitchCameraButton: true,
        //showLocation: true,
        //showPlaySoundButton: true,
        //showQrCodeFrame: true,
        //showQrCodeFrameBorder: true,
        //showScanLine: true,
        //showStatusText: true,
        //statusText: "Buscando...",
        //qrCodeSuccessCallback: onScanSuccess,
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