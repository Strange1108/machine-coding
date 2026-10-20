import { useEffect, useRef, useState } from "react";

const useThrottleFn = (fn, delay) => {
  const lastCalled = useRef(0);

  return (...args) => {
    const now = Date.now();
    if (now - lastCalled.current >= delay) {
      lastCalled.current = now;
      fn(...args);
    }
  };
};

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const throttledResize = useThrottleFn(handleResize, 1000);

  useEffect(() => {
    window.addEventListener("resize", throttledResize);

    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, [throttledResize]);

  return (
    <div>
      <h1>
        Window Size: {windowSize.width} x {windowSize.height}
      </h1>
    </div>
  );
}

export default App;
