import { useState } from "react";
import "./GridLight.css";

function Cell({ filled, onClick, isDisabled, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={isDisabled}
      onClick={onClick}
      className={`cell ${filled ? "filled" : ""}`}
    />
  );
}

export default function GridLight() {
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
    <div className="grid-container">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
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
            <div key={index} className="cell-hidden" />
          )
        )}
      </div>
    </div>
  );
}
