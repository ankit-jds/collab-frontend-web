import { useState } from "react";
import useWebSocket from "../hooks/useWebsocket";
import { useQRCode } from "../hooks/useQRCode";

export const QrLogin = () => {
  const DEBOUNCE_DELAY = 500;

  const wsurl = `ws://127.0.0.1:8420/ws/connect/`;
  const [qrImage, setQrImage] = useState("");
//   const { isConnected, sendMessage } = useWebSocket(wsurl, {
//     onOpen: () => console.log("websocket connected"),
//     onClose: () => console.log("websocket disconnected"),
//     onMessage: (message) => {
//       console.log(message);
//       setQrImage(message?.data?.qr);
//       //   if (
//       //     typeof message === "object" &&
//       //     Array.isArray(deltasRef.current) &&
//       //     deltasRef.current.length === 0
//       //   ) {
//       //     setContent(message?.content);
//       //   } else {
//       //     // apply operations code here...
//       //     console.log(message, "operations has arrived");
//       //   }
//     },
//     onError: (error) => console.log(error, "websocket error"),
//   });

    

  return (
    <div>
      QrLogin
      {/* <img src={qrImage} /> */}
    </div>
  );
};
