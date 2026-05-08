export const Hero = () => {
  return (
    <section className="bg-card w-full shadow border-b">
      <div className="container mx-auto p-4 flex flex-col gap-4 md:grid md:grid-cols-2 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-balance font-mono lg:w-[75%]">
            Best <span className="text-red-500">China </span>products delivered
            to Indonesia
          </h1>
          <h2 className="text-muted-foreground lg:w-[50%]">
            Explore thousands of china products for your store. Everything is in
            wholesale price.
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-2">
          <img
            alt="1688.com"
            src="https://importir.co.id/landing2022/assets/images/1688.png"
          />
          <img
            alt="taobao.com"
            src="https://importir.co.id/landing2022/assets/images/taobao.png"
          />
          <img
            alt="tmall.com"
            src="https://importir.co.id/landing2022/assets/images/tmall.png"
          />
          <img
            alt="alibaba.com"
            src="https://importir.co.id/landing2022/assets/images/alibaba.png"
          />
        </div>
      </div>
    </section>
  );
};
