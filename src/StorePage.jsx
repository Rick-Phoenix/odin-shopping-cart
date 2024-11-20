import { useOutletContext } from "react-router-dom";
import ProductCard from "./ProductCard";
import { memo } from "react";

const StorePage = memo(function StorePage() {
  const { products, handleSort, addToCart, removeFromCart, cart, sortOrder } =
    useOutletContext();
  return (
    <main>
      <nav>
        <button onClick={handleSort}>
          Sort by{" "}
          {sortOrder === "desc" ? "ascending price" : "descending price"}
        </button>
      </nav>
      <ul className="productList">
        {products.map((product) => {
          return (
            <ProductCard
              data={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              key={product.id}
              cart={cart}
            />
          );
        })}
      </ul>
    </main>
  );
});

export default StorePage;
