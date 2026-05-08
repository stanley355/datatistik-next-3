const CHINA_FLAG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAbFBMVEXuHCX//wDtACbuDybyaR7/+QD//QD+8QX+9QD95gjwPiL0ghvyYR7wQyHzcxz0fxr2mRfvKyP2jhj7zwv3rRj+6wD5wRHxTx/xVSD7yg782wfvNiL94QbyWx/1kRf5uxD2ohf4qBP1iBr4tBQFBxH8AAAB6ElEQVRoge2W2ZaCMAxAScImFgRUcF/G///HaREVbWFk6TnzkPughyLXNCRtHYf576AlL0kx5Xbs5OaIy5Wl0HHtFTC3JKcSAJab8fYo08fQBUVBI924mmsKEhB4IHB05Ljeag5aCMxhgpRHEOqDRA7uxuZEBp4CuCYNxfX3GPkO4NyVAFUyQxO0V1XR8TAejkgnQ0F9AZ6U/Ng+d1z6p6Bzahr0QGVF5eU58OnGrbzfK15yH4iqWcJjfZmId3t2CdXtfZ+3SiIAI7P4/YeZmBdy2I96hY6FyX3FzxAJ95A6Qm/iTvBHU3uu6b1RiI72Kv6072fv7mVmrAlKhlQ54arpTrWUPH43wC3B5OUup94ZqCGPxy9T71QNUnOZOnJsVnirPBs0pzor13NnXvASm290UzWSl+C95FNzIcrV54pthdSFXDd2qrixPLTlZVOWXiAWi75quQtDeu89cm4tS9/F96vp9W7RIngdTDDxjfWCpVziAnPvdsubz2B0MxrwAL43aAFovXiRwfwYLKbusPovE1cejSzI6fk5rbuy9S6RL9lEcmfOLcnj8JyCcWOaAHkMBbiVlookqjbVmxW5o/bXvLSixtNKpDBxBTb0iOthp8+vIGFRbi0pDMMwDMMwDMMwDMMwH/wCEpAPHfTMFYUAAAAASUVORK5CYII=";

export const Hero = () => {
  return (
    <section className="bg-card w-full shadow border-b">
      <div className="container mx-auto p-4 flex flex-col gap-4 md:grid md:grid-cols-2 py-16">
        <div>
          <img
            src={CHINA_FLAG}
            alt="China"
            className="rounded mb-4"
            title="China"
          />
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-balance font-mono mb-2 lg:w-[75%]">
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
