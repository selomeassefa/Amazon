import CategoryCard from "./CategoryCard";
import { categoryImage } from "./categoryFullInfo";

export default function Category() {
  return (
    <section className="relative -mt-[10%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
      {categoryImage.map((category) => (
        <CategoryCard key={category.title} data={category} />
      ))}
    </section>
  );
}
