import React, { useState, useEffect } from "react";

const TrafficLight = () => {
  const [currentLight, setCurrentLight] = useState("red");

  useEffect(() => {
    let interval;

    switch (currentLight) {
      case "red":
        interval = setTimeout(() => setCurrentLight("green"), 4000);
        break;
      case "yellow":
        interval = setTimeout(() => setCurrentLight("red"), 500);
        break;
      case "green":
        interval = setTimeout(() => setCurrentLight("yellow"), 3000);
        break;
      default:
        setCurrentLight("red");
    }

    return () => clearTimeout(interval); // Cleanup the timeout
  }, [currentLight]);

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        {/* Traffic Light */}
        <div className="flex flex-col gap-4 p-4 bg-black w-24 h-72 rounded-lg">
          <div
            className={`w-16 h-16 rounded-full ${
              currentLight === "red" ? "bg-red-500" : "bg-gray-500"
            }`}
          />
          <div
            className={`w-16 h-16 rounded-full ${
              currentLight === "yellow" ? "bg-yellow-400" : "bg-gray-500"
            }`}
          />
          <div
            className={`w-16 h-16 rounded-full ${
              currentLight === "green" ? "bg-green-500" : "bg-gray-500"
            }`}
          />
        </div>
      </div>
      <h1 className="text-xl font-semibold mt-4 text-gray-700">
        Current Light: <span className="capitalize">{currentLight}</span>
      </h1>
    </div>
  );
};

export default TrafficLight;
