import React, { useState, useEffect } from "react";

function Buging4() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Something went wrong");
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <h1 className="text-xl font-semibold text-slate-400 tracking-wide animate-pulse">
          Loading Users...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center m-10 p-4 bg-red-500/10 border border-red-500/20 rounded-xl shadow-lg">
        <span className="text-red-400 font-medium text-sm italic">
          ⚠️ Error: {error}
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto m-10 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Users Directory
          </h1>
          <p className="text-slate-500 mt-1">
            Manage and view all registered system users.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-md active:scale-95"
        >
          Refresh Data
        </button>
      </div>

      {/* Users Grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <li
            key={index}
            className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {user.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1 rounded-full w-fit mt-2">
                <span className="text-sm font-medium">
                  {user.email.toLowerCase()}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Buging4;
