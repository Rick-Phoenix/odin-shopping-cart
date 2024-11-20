import { memo, useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

const App = memo(function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [cart, setCart] = useState([]);

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
      return cart.map((cartItem) => {
        if (cartItem === item)
          return { ...cartItem, amount: cartItem.amount - 1 };
        else return cartItem;
      });
    });
  }, []);

  const increaseCartAmount = useCallback((item) => {
    setCart((cart) => {
      return cart.map((cartItem) => {
        if (cartItem === item)
          return { ...cartItem, amount: cartItem.amount + 1 };
        else return cartItem;
      });
    });
  }, []);

  if (loading) return <div>Loading Products...</div>;

  return (
    <>
      <nav>
        <span>
          {cart.length === 0
            ? "No items"
            : cart.length === 1
            ? "1 item"
            : cart.length + " items"}{" "}
          in the cart.
        </span>
        <Link to={"/cart"}>
          <button type="button">
            <span>View Cart</span> <AiOutlineShoppingCart />{" "}
          </button>
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
          sortOrder,
        }}
      />
    </>
  );
});

export default App;
