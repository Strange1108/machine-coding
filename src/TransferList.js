import React, { useState } from "react";

const TransferList = () => {
  const [listA, setListA] = useState([
    { id: 1, label: "Item A1", checked: false },
    { id: 2, label: "Item A2", checked: false },
    { id: 3, label: "Item A3", checked: false },
    { id: 4, label: "Item A4", checked: false },
  ]);
  const [listB, setListB] = useState([
    { id: 5, label: "Item B1", checked: false },
    { id: 6, label: "Item B2", checked: false },
    { id: 7, label: "Item B3", checked: false },
    { id: 8, label: "Item B4", checked: false },
  ]);

  const handleCheck = (id, list, setList) => {
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const transferAll = (fromList, toList, setFromList, setToList) => {
    setToList([...toList, ...fromList]);
    setFromList([]);
  };

  const transferSelected = (fromList, toList, setFromList, setToList) => {
    const selected = fromList.filter((item) => item.checked);
    const remaining = fromList.filter((item) => !item.checked);
    setToList([...toList, ...selected]);
    setFromList(remaining);
  };

  return (
    <div className="flex space-x-4 p-4">
      {/* List A */}
      <div className="w-1/3 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-lg font-bold text-center mb-4">List A</h2>
        {listA.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheck(item.id, listA, setListA)}
              className="mr-2"
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col justify-center space-y-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => transferAll(listA, listB, setListA, setListB)}
          disabled={listA.length === 0}
        >
          »»
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => transferSelected(listA, listB, setListA, setListB)}
          disabled={!listA.some((item) => item.checked)}
        >
          »
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => transferSelected(listB, listA, setListB, setListA)}
          disabled={!listB.some((item) => item.checked)}
        >
          «
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => transferAll(listB, listA, setListB, setListA)}
          disabled={listB.length === 0}
        >
          ««
        </button>
      </div>

      {/* List B */}
      <div className="w-1/3 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-lg font-bold text-center mb-4">List B</h2>
        {listB.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheck(item.id, listB, setListB)}
              className="mr-2"
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferList;