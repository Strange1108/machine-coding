import { useState } from 'react';

const ProgressBar = () => (
  <div className="w-full bg-gray-200 h-6 rounded-lg overflow-hidden">
    <div 
      className="h-full bg-blue-500 transition-all duration-[2000ms] ease-linear origin-left"
      style={{
        animation: 'fillProgress 2000ms linear forwards'
      }}
    />
  </div>
);

const ProgressBarsApp = () => {
  const [bars, setBars] = useState([]);

  const addBar = () => {
    setBars(prev => [...prev, Date.now()]);
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <button 
        onClick={addBar}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 transition-colors"
      >
        Add Progress Bar
      </button>

      <div className="space-y-4">
        {bars.map(id => (
          <ProgressBar key={id} />
        ))}
      </div>

      <style jsx global>{`
        @keyframes fillProgress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBarsApp;