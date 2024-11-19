import { memo, useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

const App = memo(function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

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

  const handleSort = useCallback(() => {
    setSortOrder(() => {
      const newValue = sortOrder === "asc" ? "desc" : "asc";
      setProducts((products) => {
        return [...products].sort((a, b) =>
          newValue === "asc" ? a.price - b.price : b.price - a.price
        );
      });
      return newValue;
    });
  }, [sortOrder]);

  const addToCart = useCallback((item) => {
    setCart((cart) => {
      if (cart.length > 0) return [...cart].concat([item]);
      else return [item];
    });
  }, []);

  const removeFromCart = useCallback((item) => {
    setCart((cart) => [...cart].filter((i) => i.id !== item.id));
  }, []);

  const decreaseCartAmount = useCallback((item) => {
    setCart((cart) => {
      const cartCopy = [...cart];
      const itemIndex = cartCopy.indexOf(item);
      cartCopy[itemIndex].amount = cartCopy[itemIndex].amount - 1;
      return cartCopy;
    });
  }, []);

  const increaseCartAmount = useCallback((item) => {
    setCart((cart) => {
      const cartCopy = [...cart];
      const itemIndex = cartCopy.indexOf(item);
      cartCopy[itemIndex].amount = cartCopy[itemIndex].amount + 1;
      return cartCopy;
    });
  }, []);

  if (loading) return <div>Loading Products...</div>;

  return (
    <>
      <nav>
        <Link to={"/cart"}>
          <AiOutlineShoppingCart />
        </Link>
      </nav>
      <Outlet
        context={{
          products,
          handleSort,
          addToCart,
          removeFromCart,
          cart,
          decreaseCartAmount,
          increaseCartAmount,
        }}
      />
    </>
  );
});

export default App;
