import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { productUrl } from "../Api/endPoints";
import ProductCard from "../components/Product/ProductCard";
import Loader from "../components/Loader";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [productId]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          isFlex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </Layout>
  );
}
