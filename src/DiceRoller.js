import { useState } from 'react';

const Die = ({ value }) => {
  // Array of dot positions for each die value
  const dotPositions = {
    1: ['center'],
    2: ['top-right', 'bottom-left'],
    3: ['top-right', 'center', 'bottom-left'],
    4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
    6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
  };

  const getDotPosition = (position) => {
    const positions = {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'middle-left': 'top-1/2 left-2 -translate-y-1/2',
      'middle-right': 'top-1/2 right-2 -translate-y-1/2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',
      'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    };
    return positions[position];
  };

  return (
    <div className="w-20 h-20 bg-white rounded-lg shadow-md relative">
      {dotPositions[value].map((position, index) => (
        <div
          key={index}
          className={`absolute w-3 h-3 bg-black rounded-full ${getDotPosition(position)}`}
        />
      ))}
    </div>
  );
};

const DiceRoller = () => {
  const [numDice, setNumDice] = useState(6);
  const [diceValues, setDiceValues] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setNumDice(value);
    setError('');
    
    if (isNaN(value) || value < 1 || value > 12) {
      setError('Please enter a number between 1 and 12');
    }
  };

  const rollDice = () => {
    if (numDice < 1 || numDice > 12 || isNaN(numDice)) {
      setError('Please enter a number between 1 and 12');
      return;
    }

    const newValues = Array(numDice)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1);
    
    setDiceValues(newValues);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="font-medium">Number of Dice:</label>
          <input
            type="number"
            min="1"
            max="12"
            value={numDice}
            onChange={handleInputChange}
            className="w-20 px-2 py-1 border rounded"
          />
        </div>
        <button
          onClick={rollDice}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={!!error}
        >
          Roll
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {diceValues.map((value, index) => (
          <Die key={index} value={value} />
        ))}
      </div>
    </div>
  );
};

export default DiceRoller;