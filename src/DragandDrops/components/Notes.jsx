/* eslint-disable react/prop-types */
import { useRef } from "react";
import Note from "./Note";

const Notes = ({ notes = [], setNotes = () => {}, onDeleteNote = () => {} }) => {
  const noteRefs = useRef({});

  const handleDragStart = (note, e) => {
    // Only drag with primary pointer / mouse button
    if (e.button !== 0 && e.pointerType === "mouse") return;

    const { id } = note;
    const noteRef = noteRefs.current[id];
    if (!noteRef) return;

    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const startPos = note.position || { x: rect.left, y: rect.top };

    // Bring dragged note to front and update cursor
    noteRef.style.zIndex = "1000";
    noteRef.style.cursor = "grabbing";

    const handlePointerMove = (moveEvent) => {
      const newX = moveEvent.clientX - offsetX;
      const newY = moveEvent.clientY - offsetY;

      // Screen boundary clamping
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      const clampedX = Math.max(0, Math.min(newX, maxX));
      const clampedY = Math.max(0, Math.min(newY, maxY));

      noteRef.style.left = `${clampedX}px`;
      noteRef.style.top = `${clampedY}px`;
    };

    const handlePointerUp = () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);

      noteRef.style.zIndex = "1";
      noteRef.style.cursor = "grab";

      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };

      if (checkForOverlap(id)) {
        // Snap back to starting position if overlapping another note
        noteRef.style.left = `${startPos.x}px`;
        noteRef.style.top = `${startPos.y}px`;
      } else {
        updateNotePosition(id, newPosition);
      }
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  const checkForOverlap = (id) => {
    const currentNoteRef = noteRefs.current[id];
    if (!currentNoteRef) return false;

    const currentRect = currentNoteRef.getBoundingClientRect();

    return notes.some((note) => {
      if (note.id === id) return false;

      const otherNoteRef = noteRefs.current[note.id];
      if (!otherNoteRef) return false;

      const otherRect = otherNoteRef.getBoundingClientRect();

      const overlap = !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.bottom < otherRect.top ||
        currentRect.top > otherRect.bottom
      );

      return overlap;
    });
  };

  const updateNotePosition = (id, newPosition) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, position: newPosition } : note
      )
    );
  };

  return (
    <div>
      {notes.map((note) => (
        <Note
          key={note.id}
          ref={(el) => {
            if (el) {
              noteRefs.current[note.id] = el;
            } else {
              delete noteRefs.current[note.id];
            }
          }}
          initialPos={note.position}
          content={note.text}
          onPointerDown={(e) => handleDragStart(note, e)}
          onDelete={() => onDeleteNote(note.id)}
        />
      ))}
    </div>
  );
};

export default Notes;