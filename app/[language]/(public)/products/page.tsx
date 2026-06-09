import { ProductList } from "./_components";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 container mx-auto p-4 lg:px-0 mt-16">
      <div className="flex flex-col gap-4 sm:justify-between sm:flex-row">
        <h3 className="font-bold text-xl">Products</h3>
      </div>
      <ProductList />
    </div>
  );
}
