import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "../Loader";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [isLoaidng, setIsLoaidng] = useState(false);

  useEffect(() => {
    setIsLoaidng(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoaidng(false);
      })
      .catch((e) => {
        setIsLoaidng(false);
        console.log(e);
      });
  }, []);

  return (
    <>
      {isLoaidng ? (
        <Loader />
      ) : (
        <section className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1450px] my-[100px] gap-[50px] items-center">
          {products.map((product) => (
            <ProductCard key={product?.id} product={product} renderAdd={true} />
          ))}
        </section>
      )}
    </>
  );
}
