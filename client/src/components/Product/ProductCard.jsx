import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { Type } from "../../utility/action.type";

export default function ProductCard({
  product,
  isFlex,
  renderDesc,
  renderAdd,
}) {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext); //eslint-disable-line no-unused-vars

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  return (
    <div
      className={`w-[250px] shadow-md p-2.5 text-black no-underline relative group grid-item $ align-self:stretch ${
        isFlex &&
        "flex flex-col shadow-none h-[50vh] md:flex-row gap-[50px] w-full"
      } ${renderAdd ? "h-full" : "h-fit"}`}
    >
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt="product image"
          className={`p-2.5 w-full h-[200px] object-contain ${
            isFlex && "w-[300px] h-auto"
          } ${!renderAdd && "!w-[400px] md:!w-[500px] lg:!w-[150px]"}`}
        />
      </Link>
      <div>
        <h3 className={`font-bold  ${isFlex && "py-5"}`}>{title}</h3>
        {renderDesc && <div className="max-w-[750px]">{description}</div>}
        <div className="flex items-center py-2.5">
          {/* rating */}
          <Rating value={rating?.rate} precision={0.5} />
          <small>{rating?.count}</small>
        </div>
        <div className="mb-10">
          <CurrencyFormat amount={price} />
        </div>

        {renderAdd && (
          <button
            onClick={addToCart}
            className={`hidde group-hover:block py-[5px] px-2.5 mt-10 font-bold border-none cursor-pointer bg-[var(--primary-color)] hover:bg-[var(--primary-shade)] w-full my-2.5 rounded-[30px] ${
              isFlex
                ? "block static w-[150px] mr-10 left-0"
                : "hidden absolute bottom-0 left-0"
            }`}
          >
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: propTypes.object,
  isFlex: propTypes.bool,
  renderDesc: propTypes.bool,
  renderAdd: propTypes.bool,
};
