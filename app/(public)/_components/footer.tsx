export const Footer = () => {
  return (
    <footer className="py-16 px-4 lg:px-0 border-t">
      <div className="container mx-auto ">
        <div className="flex flex-col gap-8 md:flex-row pb-8 border-b">
          <div className="max-w-96">
            <h4 className="font-mono font-extrabold text-xl">DELIFUNDS</h4>
            <h5 className="mb-4 text-sm">
              Delivering wholesale products to Indonesia
            </h5>

            <div className="mb-4">
              <h6 className="font-mono font-semibold">China Office</h6>
              <p className="text-sm">
                328 Tian Tong Lu, Hongkou District, Shanghai (Landmark Center).
              </p>
            </div>
            <div>
              <h6 className="font-mono font-semibold">Indonesia Office</h6>
              <p className="text-sm">
                Sopo Del Tower, Jl. Mega Kuningan Barat III No.1-6 Lot 10,
                RT.3/RW.3, Kuningan Timur, Kecamatan Setiabudi, Kota Jakarta
                Selatan, Jakarta 12950
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-mono font-semibold">Products</h4>

            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {CATEGORIES.map((cat) => (
                <li key={cat.label} className="underline">
                  {cat.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex items-center gap-2 font-mono">
          <LuCopyright />
          {new Date().getFullYear()} Delifunds.id
        </div>
      </div>
    </footer>
  );
};
