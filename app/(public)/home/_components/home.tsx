import { Categories } from "./categories";
import { Hero } from "./hero";

export const Home = () => {
  return (
    <div className="flex flex-col mt-12">
      <Hero />
      <div className="p-4">
        <Categories />
      </div>
    </div>
  );
};
