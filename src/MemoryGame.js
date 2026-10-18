import { useEffect, useState } from "react";
import "./MemoryGame.css";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [won, setWon] = useState(false);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize; // 16
    const pairCount = Math.floor(totalCards / 2); // 8
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const handleClick = (id) => {
    if (disabled || won) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        // check match logic
        checkMatch(id); 
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  return (
    <div className="memory-game-container">
      <h1 className="game-title">Memory Game</h1>
      {/* Input */}
      <div className="input-container">
        <label htmlFor="gridSize" className="input-label">
          Grid Size: (max 10)
        </label>
        <input
          type="number"
          id="gridSize"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="grid-input"
        />
      </div>

      {/* Game Board */}
      <div
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => {
          const cardClass = isSolved(card.id)
            ? "card solved"
            : isFlipped(card.id)
            ? "card flipped"
            : "card";

          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={cardClass}
            >
              {isFlipped(card.id) ? card.number : "?"}
            </div>
          );
        })}
      </div>

      {/* Result */}
      {won && (
        <div className="won-message">
          You Won!
        </div>
      )}

      {/* Reset / Play Again Btn */}
      <button
        onClick={initializeGame}
        className="reset-btn"
      >
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGame;