import React, { useState } from "react";
import useProductSearch from "./useProductSearch";

function Buging5() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading, error } = useProductSearch(searchTerm);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Search</h1>

      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <div className="text-center py-8">Loading...</div>}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buging5;
