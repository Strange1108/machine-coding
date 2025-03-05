import React, { useState } from "react";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState([]);

  const toggleItem = (index) => {
    setActiveIndex((prevIndex) =>
      prevIndex.includes(index)
        ? prevIndex.filter((i) => i !== index) // Remove index if already active
        : [...prevIndex, index] // Add index if not active
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-md overflow-hidden mb-3 shadow-sm">
          <div
            className="bg-gray-100 px-4 py-3 cursor-pointer flex justify-between items-center hover:bg-gray-200 transition"
            onClick={() => toggleItem(index)}
          >
            <h3 className="font-semibold text-gray-800">{item.title}</h3>
            <span
              className={`transform transition-transform ${
                activeIndex.includes(index) ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </div>
          {activeIndex.includes(index) && (
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              <p className="text-gray-600">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const accordionData = [
    { title: "Section 1", content: "Content for Section 1" },
    { title: "Section 2", content: "Content for Section 2" },
    { title: "Section 3", content: "Content for Section 3" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Accordion</h1>
        <Accordion items={accordionData} />
      </div>
    </div>
  );
};

export default App;
