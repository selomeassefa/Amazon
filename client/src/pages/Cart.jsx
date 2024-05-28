import { useContext } from "react";
import Layout from "../components/Layout";
import { DataContext } from "../components/DataProvider";
import ProductCard from "../components/Product/ProductCard";
import CurrencyFormat from "../components/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../utility/action.type";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext); // eslint-disable-line no-unused-vars

  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className="flex flex-col order-1 justify-center sm:flex-row gap-5 mt-5">
        <div className="p-5">
          <h2 className="p-2.5">Hello</h2>
          <h3 className="p-2.5">Your shopping basket</h3>
          <hr className="m-2.5" />
          {basket?.length === 0 ? (
            <p>Opps! No item in your cart</p>
          ) : (
            basket?.map((item, index) => (
              <section key={index} className="flex gap-2.5">
                <ProductCard product={item} renderDesc={true} isFlex={true} />

                <div className="flex flex-col justify-center items-center gap-1.5">
                  <button
                    onClick={() => increment(item)}
                    className="py-1.6 px-4 cursor-pointer bg-white border-none"
                  >
                    <IoIosArrowUp
                      size={20}
                      className="hover:bg-[var(--primary-color)]"
                    />
                  </button>
                  <span className="">{item.amount}</span>
                  <button
                    onClick={() => decrement(item.id)}
                    className="py-1.6 px-4 cursor-pointer bg-white border-none"
                  >
                    <IoIosArrowDown
                      size={20}
                      className="hover:bg-[var(--primary-color)]"
                    />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className="p-5 min-w-[300px] h-4/5 flex flex-col items-center gap-5 border-[1px] border-[#c1c1c1] bg-[#f1f1f1] rounded-md">
            <div className="flex gap-5">
              <p className="">Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span className="flex gap-5">
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link
              to="/payments"
              className="text-center w-full border-none bg-[var(--primary-color)] hover:bg[var(--primary-shade)] rounded-md py-1.5 px-2.5 no-underline text-black"
            >
              Continue to checkOut
            </Link>
          </div>
        )}
      </section>
      ;
    </Layout>
  );
}
