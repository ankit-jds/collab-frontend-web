import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

export const TransitionPage = () => {
  const isTransitioning = useSelector(
    (state) => state.navigator.isTransitioning
  );
  const transitionPayload = useSelector(
    (state) => state.navigator.transitionPayload
  );
  if (isTransitioning) {
    console.log(transitionPayload, "....");
  }

  // for the animation
  const [transitionText, setTransitionText] = useState(
    transitionPayload.transitionText || "Logging you in..."
  );

  const [transitionTextWidth, setTransitionTextWidth] = useState(
    `${(transitionPayload.transitionText || "Logging you in...").length + 2}ch`
  );
  const spanRef = useRef(null);

  let tableWidth = "400px";
  let tableHeight = "30px";

  // update transitionText width
  useEffect(() => {
    if (spanRef.current) {
      setTransitionTextWidth(`${spanRef.current?.offsetWidth || 50}px`);
    }
  }, [transitionText]);

  useEffect(() => {
    // Create a style element
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";

    // Define keyframes
    const keyframes = `
    .loading-animation-wrapper {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  overflow: hidden;
}

@keyframes moveRight {
  0% {
    opacity: 1;
  }

  5% {
    top: -${"10px"};
    opacity: 1;
  }

  40% {
    left: calc(${tableWidth} - ${transitionTextWidth});
    left: calc(${tableWidth});
    top: -${"10px"};
    opacity: 1;
  }

  100% {
    left: calc(${tableWidth} + 8px);

    top: 100vh;
    opacity: 1;
  }
}

@keyframes pulsate {
  0% {
    transform: scale(0.5);
  }

  40% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(1.8);
  }
}

.dot:nth-child(1) {
  animation-delay: 0s, 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.5s, 0.5s;
}

.dot:nth-child(3) {
  animation-delay: 1s, 1s;
}

.dot:nth-child(4) {
  animation-delay: 1.5s, 1.5s;
}

.dot:nth-child(5) {
  animation-delay: 2s, 2s;
}

.dot:nth-child(6) {
  animation-delay: 2.5s, 2.5s;
}

.dot:nth-child(7) {
  animation-delay: 3s, 3s;
}
  .dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  bottom: 20px;
  opacity: 0;
  animation: moveRight 4s ease-out infinite, pulsate 4s ease-in-out infinite;
  left: calc(${transitionTextWidth} - 10px);
  top: -${"13px"};
  /* transition: all; */
}
    `;

    // Append keyframes to the style element
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);

    return () => {
      // Cleanup on component unmount
      document.head.removeChild(styleSheet);
    };
  }, [transitionTextWidth, tableHeight]);

  let transitionTextStyles = `font-mono font-bold text-2xl`;
  // for the animation
  return (
    <div
      className=""
      onClick={() => {
        setTransitionText("HAVE PATIENCE...");
      }}
    >
      {/* <div onClick={() => dispatch(navigateTo("editor"))}>GO TO EDITOR</div> */}
      <div className="loading-animation-wrapper">
        <div
          className={`bg-[#c6d0d3] rounded-md relative`}
          style={{
            width: tableWidth,
            height: tableHeight,
          }}
        >
          <span
            ref={spanRef}
            className={`${transitionTextStyles}`}
            style={{
              visibility: "hidden",
              position: "absolute",
              // whiteSpace: "pre",
              // font: "inherit",
              whiteSpace: "nowrap",
              // overflow: "hidden",
            }}
          >
            {transitionText}
          </span>
          <div
            className={`${transitionTextStyles} absolute `}
            style={{ top: `-${tableHeight}` }}
          >
            {transitionText}
          </div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        {/* {isTransitioning ? <>{transitionPayload.transitionText}</> : <></>} */}
      </div>
    </div>
  );
};
