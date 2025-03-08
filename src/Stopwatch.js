
import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

  // Convert seconds to HH:MM format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Start the countdown
  const startTimer = () => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
    }
  };

  // Stop the countdown
  const stopTimer = () => {
    setIsRunning(false);
  };

  // Reset the timer to 5:00
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(5 * 60);
  };

  // Countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [isRunning, timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-5xl font-mono mb-6">{formatTime(timeLeft)}</div>
      <div className="flex space-x-4">
        <button
          onClick={startTimer}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Stop
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;

