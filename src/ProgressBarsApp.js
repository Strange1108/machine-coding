import React, { useEffect, useState } from "react";

const ProgressBar = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [progress]);

  return (
    // Outer Container
    <div
      style={{
        margin: "10px 0",
        border: "1px solid black",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Animated Inner Fill */}
      <div
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{
          backgroundColor: "green",
          padding: "1px",
          textAlign: "right",
          transition: "0.5s ease-in",
          transform: `translateX(${animatedProgress - 100}%)`,
          color: animatedProgress < 5 ? "black" : "white",
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default function App() {
  const bars = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        maxWidth: "500px",
        margin: "20px auto",
        padding: "0 10px",
      }}
    >
      <h1>Progress bar</h1>
      {bars.map((value) => (
        <ProgressBar key={value} progress={value} />
      ))}
    </div>
  );
}
