import { useState } from 'react';

const dotPositions = {
  1: ['center'],
  2: ['top-right', 'bottom-left'],
  3: ['top-right', 'center', 'bottom-left'],
  4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
  6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
};

const getDotStyle = (position) => {
  const base = {
    position: 'absolute',
    width: '12px',
    height: '12px',
    backgroundColor: '#000',
    borderRadius: '50%'
  };  

  switch (position) {
    case 'top-left':
      return { ...base, top: '8px', left: '8px' };
    case 'top-right':
      return { ...base, top: '8px', right: '8px' };
    case 'middle-left':
      return { ...base, top: '50%', left: '8px', transform: 'translateY(-50%)' };
    case 'middle-right':
      return { ...base, top: '50%', right: '8px', transform: 'translateY(-50%)' };
    case 'bottom-left':
      return { ...base, bottom: '8px', left: '8px' };
    case 'bottom-right':
      return { ...base, bottom: '8px', right: '8px' };
    case 'center':
      return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    default:
      return base;
  }
};

const Die = ({ value }) => {
  return (
    <div
      style={{
        width: '80px',
        height: '80px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        position: 'relative',
        border: '1px solid #e5e7eb'
      }}
    >
      {dotPositions[value].map((position, index) => (
        <div key={index} style={getDotStyle(position)} />
      ))}
    </div>
  );
};

export default function App() {
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
    <div style={{ maxWidth: '672px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontWeight: 500 }}>Number of Dice:</label>
          <input
            type="number"
            min="1"
            max="12"
            value={numDice}
            onChange={handleInputChange}
            style={{
              width: '80px',
              padding: '4px 8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              outline: 'none'
            }}
          />
        </div>
        <button
          onClick={rollDice}
          disabled={!!error}
          style={{
            padding: '4px 16px',
            backgroundColor: error ? '#93c5fd' : '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: error ? 'not-allowed' : 'pointer',
            opacity: error ? 0.5 : 1
          }}
        >
          Roll
        </button>
      </div>

      {error && (
        <div style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}
      >
        {diceValues.map((value, index) => (
          <Die key={index} value={value} />
        ))}
      </div>
    </div>
  );
}