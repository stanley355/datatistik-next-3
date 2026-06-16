import { ProductList, ProductSettings } from "./_components";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 container mx-auto p-4 lg:px-0 mt-16">
      <div className="flex flex-col gap-4 lg:justify-between lg:flex-row lg:items-end">
        <h3 className="font-bold text-xl underline">Products</h3>
        <ProductSettings />
      </div>
      <ProductList />
    </div>
  );
}
