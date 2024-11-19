import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = memo(function Product({ data }) {
  return (
    data && (
      <li className="productCard">
        <img src={data.image}></img>
        <Link to={`/${data.id}`} state={data}>
          <h5>{data.title}</h5>
        </Link>
        <span className="price">${data.price}</span>
        Link
      </li>
    )
  );
});

export default Product;
