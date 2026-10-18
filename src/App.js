import React, { useState, useEffect } from "react";
import "./TrafficLight.css";

const TrafficLight = () => {
  const [currentLight, setCurrentLight] = useState("red");

  useEffect(() => {
    let timer;

    switch (currentLight) {
      case "red":
        timer = setTimeout(() => setCurrentLight("green"), 4000);
        break;
      case "yellow":
        timer = setTimeout(() => setCurrentLight("red"), 500);
        break;
      case "green":
        timer = setTimeout(() => setCurrentLight("yellow"), 3000);
        break;
      default:
        setCurrentLight("red");
    }

    return () => clearTimeout(timer); // Cleanup timer
  }, [currentLight]);

  return (
    <div className="traffic-container">
      <div className="traffic-housing">
        <div className={`light red ${currentLight === "red" ? "active" : ""}`} />
        <div className={`light yellow ${currentLight === "yellow" ? "active" : ""}`} />
        <div className={`light green ${currentLight === "green" ? "active" : ""}`} />
      </div>

      <h1 className="traffic-status">
        Current Light: <span>{currentLight}</span>
      </h1>
    </div>
  );
};

export default TrafficLight;
