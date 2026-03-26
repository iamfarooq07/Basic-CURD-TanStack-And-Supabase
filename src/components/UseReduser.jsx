import React, { useEffect, useReducer } from "react";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function UseReduser() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addData = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!res.ok) throw new Error("Network response was not ok");
      const jsonData = await res.json();
      dispatch({ type: "FETCH_SUCCESS", payload: jsonData.slice(0, 9) });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    addData();
  }, []);

  const { data, loading, error } = state;

  if (loading) {
    return (
      <h1 className="text-2xl text-black font-bold text-center">
        Loading .......
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-2xl text-red-600 font-bold text-center">
        Error: {error}
      </h1>
    );
  }

  return (
    <div className="p-6">
      {data.map((m) => (
        <div
          key={m.id}
          className="mb-4 p-4 border border-gray-200 rounded-md shadow-sm"
        >
          <h1 className="text-lg font-medium text-gray-800">{m.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default UseReduser;
