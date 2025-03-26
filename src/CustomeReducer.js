import { useState, useCallback } from "react";

function useCustomReducer(reducer, initialState) {
  // Internal state management
  const [state, setState] = useState(initialState);

  // Dispatch function to update state
  const dispatch = useCallback((action) => {
    setState((prevState) => reducer(prevState, action));
  }, []);

  return [state, dispatch];
}

// Example Reducer Function
const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};

// Example Usage in a Component
function Counter() {
  const [state, dispatch] = useCustomReducer(counterReducer, { count: 0 });

  return (
    <div className="p-5 border rounded-lg w-64 text-center">
      <h2 className="text-xl font-bold">Count: {state.count}</h2>
      <div className="flex justify-center gap-3 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => dispatch({ type: "INCREMENT" })}>
          ➕ Increment
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => dispatch({ type: "DECREMENT" })}>
          ➖ Decrement
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => dispatch({ type: "RESET" })}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
