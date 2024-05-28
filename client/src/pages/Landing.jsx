import CarouselComponent from "../components/Carousel/CarouselComponent";
import Category from "../components/Category/Category";
import Layout from "../components/Layout";
import Product from "../components/Product/Product";

export default function Landing() {
  return (
    <Layout>
      <CarouselComponent />
      <Category />
      <Product />
    </Layout>
  );
}
