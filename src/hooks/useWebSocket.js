import { useEffect, useRef, useState } from "react";

const useWebSocket = (url, options = {}) => {
  const {
    onOpen,
    onClose,
    onMessage,
    onError,
    reconnect = true,
    reconnectInterval = 3000,
  } = options;
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    if (!url) return;
    const connectWebSocket = () => {
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
        if (onOpen) onOpen(socket);
      };

      socket.onclose = () => {
        setIsConnected(false);
        if (onClose) onClose(socket);

        if (reconnect) {
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, reconnectInterval);
        }
      };

      socket.onmessage = (event) => {
        if (onMessage) onMessage(JSON.parse(event.data));
      };

      socket.onerror = (error) => {
        if (onError) onError(error);
      };
    };

    connectWebSocket();

    return () => {
      console.log("WebSocket readyState:", socketRef.current.readyState);
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      //   clearTimeout(reconnectTimeoutRef.current);
    };
    //   }, [url, onOpen, onClose, onMessage, onError, reconnect, reconnectInterval]);
  }, [url]);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not open. Cannot send message.");
    }
  };
  return { isConnected, sendMessage };
};

export default useWebSocket;
