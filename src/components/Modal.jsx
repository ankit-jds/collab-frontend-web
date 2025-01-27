import React, { useState, useEffect } from "react";

const Modal = ({ show, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);
  // Close the modal if user clicks outside of it
  const handleOutsideClick = (event) => {
    console.log(event, "hihilo");

    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"; // Prevent body scroll when modal is open
      // window.addEventListener("click", handleOutsideClick);
    } else {
      document.body.style.overflow = "auto"; // Re-enable body scroll when modal is closed
    }

    return () => {
      // window.removeEventListener("click", handleOutsideClick); // Cleanup event listener on unmount
    };
  }, [show]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose(); // Actually close after animation
    }, 300); // Wait for animation to complete (300ms for fade-out/zoom-out)
  };

  if (!show && !isClosing) return null; // Don't render modal if show is false and not closing

  return (
    <div style={styles.overlay} onClick={handleOutsideClick}>
      <div
        style={{
          ...styles.modal,
          animation: isClosing
            ? "zoomOut 0.3s forwards, fadeOut 0.3s forwards"
            : "zoomIn 0.3s forwards, fadeIn 0.3s forwards", // Zoom-in and fade-in when opening, Zoom-out and fade-out when closing
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* <button onClick={closeModal} style={styles.closeButton}>
          X
        </button> */}
        {children}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    // width: "300px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
    transform: "scale(0.8)",
    opacity: 0,
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
};

// Keyframes for the fade-in, fade-out, zoom-in, and zoom-out animations
const keyframes = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
  @keyframes zoomIn {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes zoomOut {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0.8); opacity: 0; }
  }
`;

// Inject keyframes into the document's head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

export default Modal;
