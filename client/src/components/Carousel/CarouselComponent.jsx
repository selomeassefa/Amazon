import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data";

export default function CarouselComponent() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imgItem) => (
          <div key={imgItem}>
            <img src={imgItem} alt="carousel" />
          </div>
        ))}
      </Carousel>
      <div className="relative hero__img"></div>
    </div>
  );
}
