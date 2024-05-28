import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { productUrl } from "../Api/endPoints";
import ProductCard from "../components/Product/ProductCard";

export default function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((e) => console.log(e));
  }, [categoryName]);

  return (
    <Layout>
      <section className="">
        <h1 className="px-[30px] py-7 font-bold text-2xl">Results</h1>
        <p className="px-[30px] py-5">Category / {categoryName}</p>
        <hr />
        <div className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1450px] my-[100px] gap-[50px] items-center">
          {results?.map((product) => (
            <ProductCard key={product.id} product={product} renderAdd={true} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
