import { EditProduct } from "./_components/edit-product";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <EditProduct id={parseInt(id)} />;
}
