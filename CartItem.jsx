import { memo } from "react";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { BsDashLg } from "react-icons/bs";

const CartItem = memo(function CartItem({
  data,
  removeFromCart,
  decreaseCartAmount,
  increaseCartAmount,
  cart,
}) {
  function handleDecreaseAmount(data) {
    if (data.amount === 1) return removeFromCart(data);
    else decreaseCartAmount(data);
  }

  return (
    <li className="cartItem">
      <Link to={`/products/${data.id}`} state={data}>
        <img src={data.image}></img>
      </Link>
      <Link to={`/products/${data.id}`} state={data}>
        <h4>{data.title}</h4>
      </Link>
      <div className="actionBar">
        <span className="price">${data.price}</span>
        <div className="icons">
          <div className="iconWrap">
            <button
              type="button"
              title="Increase Amount"
              onClick={() => {
                increaseCartAmount(data);
              }}
            >
              <BsPlusLg />
            </button>
            <span>{data.amount}</span>
            <button
              type="button"
              title="Decrease Amount"
              onClick={() => {
                handleDecreaseAmount(data);
              }}
            >
              <BsDashLg />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
});

export default CartItem;
