import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";

const ProductCard = memo(function Product({
  data,
  addToCart,
  removeFromCart,
  cart,
}) {
  const isInCart = cart.some((product) => product.id === data.id);

  function handleCartAction(e) {
    e.preventDefault();
    if (!isInCart) return addToCart({ ...data, amount: 1 });
    else removeFromCart(data);
  }

  return (
    data && (
      <Link to={`/products/${data.id}`} state={data}>
        <li className="productCard">
          <img src={data.image}></img>
          <h5>{data.title}</h5>
          <div className="actionBar">
            <span className="price">${data.price}</span>
            <div className="icons">
              <div className="iconWrap">
                <button
                  type="button"
                  onClick={handleCartAction}
                  title={(!isInCart ? "Add To" : "Remove From") + " Cart"}
                >
                  {!isInCart ? <BsCartPlus /> : <BsCartCheck />}
                </button>
              </div>
            </div>
          </div>
        </li>
      </Link>
    )
  );
});

export default ProductCard;
