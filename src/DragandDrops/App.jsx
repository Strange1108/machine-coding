import { useState, useEffect } from "react";
import "./App.css";
import Notes from "./components/Notes";

const DEFAULT_NOTES = [
  {
    id: 1,
    text: "Link in bio for my Frontend Interview Prep Course",
    position: { x: 80, y: 140 },
  },
  {
    id: 2,
    text: "Like this Video and Subscribe to Roadside Coder",
    position: { x: 360, y: 140 },
  },
];

function App() {
  // Lazy state initialization with localStorage
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("notes");
      return saved ? JSON.parse(saved) : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });

  // Sync to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (e) => {
    e.preventDefault();
    const input = e.target.elements.noteText;
    const text = input.value.trim();
    if (!text) return;

    // Determine random initial position within viewport bounds
    const maxX = Math.max(100, window.innerWidth - 260);
    const maxY = Math.max(160, window.innerHeight - 260);
    const newPosition = {
      x: Math.floor(Math.random() * (maxX - 50)) + 50,
      y: Math.floor(Math.random() * (maxY - 140)) + 140,
    };

    setNotes((prevNotes) => [
      ...prevNotes,
      { id: Date.now(), text, position: newPosition },
    ]);
    e.target.reset();
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleAddNote} className="input-container">
        <input
          name="noteText"
          type="text"
          placeholder="Enter a new note..."
          className="note-input"
          autoComplete="off"
        />
        <button type="submit" className="add-btn">
          Add Note
        </button>
      </form>
      <Notes
        notes={notes}
        setNotes={setNotes}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
}

export default App;