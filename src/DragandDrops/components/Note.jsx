/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const Note = forwardRef(({ content, initialPos, onDelete, ...props }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${initialPos?.x ?? 0}px`,
        top: `${initialPos?.y ?? 0}px`,
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
        userSelect: "none",
        padding: "12px 14px",
        width: "220px",
        cursor: "grab",
        backgroundColor: "#fef08a",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        touchAction: "none",
      }}
      {...props}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>📌</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            color: "#64748b",
            padding: "0 4px",
            lineHeight: 1,
          }}
          title="Delete note"
        >
          ×
        </button>
      </div>
      <div style={{ wordBreak: "break-word", fontSize: "14px", color: "#1e293b", lineHeight: 1.4 }}>
        {content}
      </div>
    </div>
  );
});

Note.displayName = "Note";

export default Note;