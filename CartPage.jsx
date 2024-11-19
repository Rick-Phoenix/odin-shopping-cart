import { memo, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import CartItem from "./CartItem";

const CartPage = memo(function CartPage() {
  const { cart, removeFromCart, decreaseCartAmount, increaseCartAmount } =
    useOutletContext();

  return (
    <div className="cartPage">
      {cart.length > 0 && (
        <ul className="cartList">
          {cart.map((item) => {
            return (
              <CartItem
                key={item.id}
                data={item}
                removeFromCart={removeFromCart}
                decreaseCartAmount={decreaseCartAmount}
                increaseCartAmount={increaseCartAmount}
              />
            );
          })}
        </ul>
      )}
      {cart.length === 0 && <h4>Cart is currently empty.</h4>}
      <Link to={"/"}>
        <h4>Return to the homepage</h4>
      </Link>
    </div>
  );
});

export default CartPage;
