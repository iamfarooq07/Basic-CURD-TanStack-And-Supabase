import { useState, useEffect } from "react";

function useProductSearch(searchTerm) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!searchTerm) {
            setProducts([]);
            setError("");
            return;
        }

        setLoading(true);
        setError("");

        fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch products");
                setLoading(false);
            });
    }, [searchTerm]);

    return { products, loading, error };
}

export default useProductSearch;