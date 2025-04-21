import { useState } from "react";

function Cell({ filled, onClick, isDisabled, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={isDisabled}
      onClick={onClick}
      className={`border border-black h-0 pb-[100%] ${
        filled ? "bg-green-500" : "bg-transparent"
      }`}
    />
  );
}

export default function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };

  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);

    if (newOrder.length === config.flat().filter(Boolean).length) {
      deactivateCells();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
      <div
        className={`grid max-w-[300px] w-full p-5 gap-5 border border-black grid-cols-${config[0].length}`}
      >
        {config.flat().map((value, index) =>
          value ? (
            <Cell
              key={index}
              label={`Cell ${index}`}
              filled={order.includes(index)}
              onClick={() => activateCells(index)}
              isDisabled={order.includes(index) || isDeactivating}
            />
          ) : (
            <div key={index} className="invisible" />
          )
        )}
      </div>
    </div>
  );
}
