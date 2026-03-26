import React, { useState } from "react";

function UseState() {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <h1 className="text-2xl text-black font-bold m-2">{number}</h1>
      <button
        disabled={number >= 4 ? true : false}
        onClick={() => setNumber(number + 1)}
        className="px-4 py-2 bg-blue-400 rounded-md m-2"
      >
        Plus
      </button>
      <button
        onClick={() => setNumber(number - 1)}
        disabled={number <= 0 ? true : false}
        className="px-4 py-2 bg-blue-400 rounded-md m-2"
      >
        Minus
      </button>
    </div>
  );
}

export default UseState;
