import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const titleRef = useRef();
  useEffect(() => {
    const countHeader = titleRef.current;
    const clickHandler = () => {
      if (count > 0) {
        setCount(100);
      } else {
        setCount(-100);
      }
    };
    countHeader.addEventListener("click", clickHandler);
    return () => countHeader.removeEventListener("click", clickHandler);
  }, []);

  return (
    <div>
      <h1 ref={titleRef}>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}


/* Different Solutions for Stale closures when using React hooks
https://medium.com/@anandsimmy7/stale-closures-and-react-hooks-ea60689a3544
// Solutions

// usEffect dependency Array 🏆
// State update using callback functions 🧩
// Pointing state values to Refs 🎯
// Combining Event handlers with Refs 🎲*/
