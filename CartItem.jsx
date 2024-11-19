import { memo } from "react";
import { Link } from "react-router-dom";

const CartItem = memo(function CartItem({ data }) {
  return (
    <li className="cartItem">
      <Link to={`/products/${data.id}`} state={data}>
        <img src={data.image}></img>
      </Link>
      <Link to={`/products/${data.id}`} state={data}>
        <h5>{data.title}</h5>
      </Link>
      <div className="actionBar">
        <span className="price">${data.price}</span>
        <div className="icons">
          <div className="iconWrap">
            <button type="button"></button>
          </div>
        </div>
      </div>
    </li>
  );
});

export default CartItem;
