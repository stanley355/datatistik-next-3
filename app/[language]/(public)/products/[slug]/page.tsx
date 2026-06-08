import { DynamicProduct } from "./_components";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const [productId] = slug.split("-");
  return (
    <div className="container mx-auto p-4 lg:px-0 mt-16">
      <DynamicProduct />
    </div>
  );
}
