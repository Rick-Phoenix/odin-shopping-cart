import { Link, useLocation, useOutletContext } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";

export default function ProductPage() {
  const data = useLocation().state;
  const { addToCart, removeFromCart, cart } = useOutletContext();
  const isInCart = cart.some((product) => product.id === data.id);

  function handleCartAction(e) {
    e.preventDefault();
    if (!isInCart) return addToCart({ ...data, amount: 1 });
    else removeFromCart(data);
  }

  return (
    <div className="productPage">
      <img src={data.image} alt="" />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <button
        className="buttonWrap"
        type="button"
        onClick={handleCartAction}
        title={(!isInCart ? "Add To" : "Remove From") + " Cart"}
      >
        <span>{(!isInCart ? "Add To" : "Remove From") + " Cart"}</span>
        {!isInCart ? <BsCartPlus /> : <BsCartCheck />}
      </button>
      <Link to={"/"}>
        <h4>Back to homepage</h4>
      </Link>
    </div>
  );
}
