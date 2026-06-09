import { DynamicProduct } from "./_components";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const [productId] = slug.split("-");
  return (
    <div className="container mx-auto  mt-12 min-h-screen">
      <DynamicProduct id={parseInt(productId)} />
    </div>
  );
}
