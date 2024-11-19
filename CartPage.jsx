import { memo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import CartItem from "./CartItem";

const CartPage = memo(function CartPage() {
  const data = useOutletContext();
  const cartItems = data.cart;

  return (
    <div className="cartPage">
      <ul className="cartList">
        {cartItems.map((item) => {
          return <CartItem key={item.id} data={item} />;
        })}
      </ul>
      <Link to={"/"}>Return to the homepage</Link>
    </div>
  );
});

export default CartPage;
