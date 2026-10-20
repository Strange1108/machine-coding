
import { useState, useEffect, useRef } from "react";

function useClickOutside(onClickOutside) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClickOutside]);

  return ref;
}

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const ref = useClickOutside(handleClose);

  return (
    <div style={{ padding: "40px", minHeight: "100vh" }}>
      <h1>Click Outside Example</h1>

      {isOpen ? (
        <div
          ref={ref}
          style={{
            border: "1px solid black",
            padding: "20px",
            width: "250px",
            borderRadius: "8px",
          }}
        >
          <h2>Dropdown Menu</h2>
          <p>Click outside this box to close it.</p>

          <button onClick={() => alert("Button clicked!")}>
            Click Inside
          </button>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)}>
          Open Dropdown
        </button>
      )}
    </div>
  );
}
