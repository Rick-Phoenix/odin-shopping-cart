import { memo, useEffect, useMemo, useState } from "react";
import Product from "./Product";
import { AiOutlineShoppingCart } from "react-icons/ai";

const App = memo(function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  function handleSort() {
    setSortOrder(() => {
      const newValue = sortOrder === "asc" ? "desc" : "asc";
      setProducts(() => {
        return [...products].sort((a, b) =>
          newValue === "asc" ? a.price - b.price : b.price - a.price
        );
      });
      return newValue;
    });
  }

  if (loading) return <div>Loading Products...</div>;

  return (
    <>
      <nav>
        <AiOutlineShoppingCart />
      </nav>
      <main>
        <nav>
          <button onClick={handleSort}>Sort By</button>
        </nav>
        <ul className="productList">
          {products.map((product) => {
            return <Product data={product} key={product.id} />;
          })}
        </ul>
      </main>
    </>
  );
});

export default App;
