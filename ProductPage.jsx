import { Link, useLocation } from "react-router-dom";

export default function ProductPage() {
  const data = useLocation().state;
  return (
    <div className="productPage">
      <img src={data.image} alt="" />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <Link to={"/"}>Back to homepage</Link>
    </div>
  );
}
