import { useState, useEffect } from "react";

const API_BASE = "https://api.escuelajs.co/api/v1";

export function useProducts(categoryId = null) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = `${API_BASE}/products`;
                if (categoryId) {
                    url = `${API_BASE}/categories/${categoryId}/products`;
                }
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                // Filter out products with invalid images
                const validProducts = data.filter(p =>
                    p.images && p.images.length > 0 && !p.images[0].includes("[")
                );
                setProducts(validProducts);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return { products, loading, error };
}

export function useProduct(productId) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE}/products/${productId}`);
                if (!response.ok) throw new Error("Failed to fetch product");
                const data = await response.json();
                setProduct(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return { product, loading, error };
}

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE}/categories`);
                if (!response.ok) throw new Error("Failed to fetch categories");
                const data = await response.json();
                setCategories(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
}

export function useSearchProducts(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query || query.length < 2) {
            setResults([]);
            return;
        }

        const searchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE}/products/?title=${encodeURIComponent(query)}`);
                if (!response.ok) throw new Error("Failed to search products");
                const data = await response.json();
                const validProducts = data.filter(p =>
                    p.images && p.images.length > 0 && !p.images[0].includes("[")
                );
                setResults(validProducts);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(searchProducts, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    return { results, loading, error };
}

