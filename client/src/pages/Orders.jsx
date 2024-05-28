import Layout from "../components/Layout";
import { db } from "../utility/firebase";
import { DataContext } from "../components/DataProvider";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/Product/ProductCard";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => [
          setOrders(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          ),
        ]);
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className="p-8 bg-[#efeeee]">
        <div className="bg-white p-5">
          <h2 className="p-5 border-b-2 border-[var(--primary-shade)] text-2xl font-bold">
            Your Orders
          </h2>

          {orders?.length == 0 && <div className="p-5">No orders yet</div>}

          <div className="">
            {orders?.map((eachOrder) => {
              return (
                <div className="payment-page__flex" key={eachOrder?.id}>
                  <hr />
                  <p className="p-3">Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order, index) => (
                    <ProductCard key={index} isFlex={true} product={order} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
