import { LuSearch } from "react-icons/lu";

export const ProductNotFound = () => {
  return (
    <div className="w-full min-h-96 flex flex-col items-center justify-center">
      <LuSearch className="size-32" />
      <h3 className="text-xl font-mono font-bold">Product Not Found</h3>
      <p className="text-muted-foreground">
        Try different or more general keywords
      </p>
    </div>
  );
};
