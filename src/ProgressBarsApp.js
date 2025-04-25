import React, { useEffect, useState } from "react";

const ProgessBar = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="m-2 border border-black rounded-lg overflow-hidden text-center">
      <div
        className="bg-green-500 text-white p-1 text-right transition-all duration-[800ms] ease-in"
        style={{
          // width: `${progress}%`,
          transform: `translateX(${animatedProgress - 100}%)`,
          color: progress < 5 ? "black" : "white",
        }}
        role="progressbar"
        aria-valuenow={animatedProgress}
        aria-valuemax={100}
        aria-valuemin={0}
      >
        {animatedProgress}
      </div>
    </div>
  );
};

const App = () => {
  const bars = [5, 10, 20, 30, 50, 70, 100];
  return (
    <div>
      <h1 className="flex justify-center text-2xl font-bold mt-2">
        ProgressBar
      </h1>
      {bars.map((value) => (
        <ProgessBar key={value} progress={value} />
      ))}
    </div>
  );
};

export default App;
