import React, { useState, useEffect } from "react";

// Individual Toast with self-contained timer cleanup & dismiss button
const Toast = ({ id, message, type = "info", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const backgroundColor =
    type === "success" ? "#16a34a" : type === "error" ? "#dc2626" : "#2563eb";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "10px 16px",
        backgroundColor,
        color: "white",
        borderRadius: "6px",
        fontSize: "14px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        minWidth: "220px",
      }}
    >
      <span>{message}</span>
      <button
        onClick={() => onClose(id)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        ✕
      </button>
    </div>
  );
};

// Fixed overlay container for toasts
const ToastPortal = ({ toasts, removeToast }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};

const App = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Toast Notification Demo</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => addToast("Success Message", "success", 3000)}>
          Show Success
        </button>
        <button onClick={() => addToast("Error Message", "error", 4000)}>
          Show Error
        </button>
        <button onClick={() => addToast("Info Message", "info", 2000)}>
          Show Info
        </button>
      </div>

      {/* Renders fixed in top-right without interfering with page buttons */}
      <ToastPortal toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default App;
