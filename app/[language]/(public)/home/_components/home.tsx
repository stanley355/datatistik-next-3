import { ProductList, ProductSettings } from "../../products/_components";
import { Categories } from "./categories";
import { Hero } from "./hero";

export const Home = () => {
  return (
    <div className="flex flex-col mt-12">
      <Hero />
      <div className="p-4 container mx-auto flex flex-col gap-16">
        <Categories />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:justify-between sm:flex-row">
            <h3 className="font-bold text-xl">Products</h3>
            <ProductSettings />
          </div>
          <ProductList />
        </div>
      </div>
    </div>
  );
};
