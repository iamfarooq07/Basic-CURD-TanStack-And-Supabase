import React, { useEffect, useState } from "react";

function UseEffect() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  function addData() {
    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((resData) => {
        const sliced = resData.slice(0, 9);
        setData(sliced);
        setAllData(sliced);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const plus = () => {
    const completedData = allData.filter((item) => item.completed);
    setData(completedData);
  };

  const minus = () => {
    const notCompleted = allData.filter((item) => !item.completed);
    setData(notCompleted);
  };

  const all = () => {
    setData(allData);
  };

  useEffect(() => {
    addData();
  }, []);

  if (loading) {
    return (
      <h1 className="text-2xl text-black font-bold text-center">
        Loading .......
      </h1>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={plus}
          className="px-5 py-2 text-white bg-green-500 rounded-full font-medium hover:bg-green-600 transition"
        >
          Completed
        </button>
        <button
          onClick={minus}
          className="px-5 py-2 text-white bg-red-500 rounded-full font-medium hover:bg-red-600 transition"
        >
          Not Completed
        </button>
        <button
          onClick={all}
          className="px-5 py-2 text-white bg-gray-500 rounded-full font-medium hover:bg-gray-600 transition"
        >
          All Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300"
          >
            <h1 className="text-lg font-semibold text-gray-800 mb-3">
              {m.title}
            </h1>

            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                m.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {m.completed ? "Completed" : "Not Completed"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UseEffect;
