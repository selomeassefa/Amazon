import { useContext, useState } from "react";
import Layout from "../components/Layout";
import { DataContext } from "../components/DataProvider";
import ProductCard from "../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../components/CurrencyFormat";
import { axiosInstance } from "../Api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../utility/action.type";

export default function Payment() {
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const total = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError(null);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      const res = await axiosInstance({
        method: "POST",
        url: `/payments/create?total=${total * 100}`,
      });

      const clientSecret = res.data?.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({ type: Type.EMPTY_BASKET });

      navigate("/orders", {
        state: { msg: "you have successfully placed your order" },
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="p-5 text-center text-2xl bg-[#eaeded]">
        Checkout ({totalItem}) items
      </div>

      <section className="p-8">
        <div className="flex flex-col md:flex-row gap-5 p-8">
          <h3 className="min-w-[300px] font-bold text-lg">Delivery Address</h3>
          <div className="">
            <div className="">{user?.email}</div>
            <div className="">123 React Lane</div>
            <div className="">Addis Ababa</div>
          </div>
        </div>
        <hr />

        <div className="flex flex-col md:flex-row gap-5 p-8 payment-page__flex">
          <h3 className="min-w-[300px] font-bold text-lg">
            Review items and delivery
          </h3>
          <div className="h-auto">
            {basket?.map((item) => (
              <ProductCard key={item} product={item} isFlex={true} />
            ))}
          </div>
        </div>
        <hr />

        <div className="flex flex-col md:flex-row gap-5 p-8">
          <h3 className="min-w-[300px] font-bold text-lg">Payment methods</h3>
          <div className="max-w-[350px] w-full">
            <div className="">
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small className="text-red-500">{cardError}</small>
                )}
                <CardElement onChange={handleChange} />

                <div className="p-5">
                  <div className="flex text-[16px] gap-2.5">
                    <span className="flex gap-md-2">
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button
                    className="mt-3.5 w-full border-none bg-[var(--primary-color)] rounded-md py-2 px-2.5 cursor-pointer hover:bg-[var(--primary-shade)]"
                    type="submit"
                  >
                    {processing ? (
                      <div className="flex justify-center gap-2 items-center text-[#343434]">
                        <ClipLoader
                          color="gray"
                          size={12}
                          loading={processing}
                        />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
