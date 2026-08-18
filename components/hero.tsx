import Link from "next/link";
export function Hero(){
  return <section className="container-z mt-4 md:mt-6">
    <div className="relative min-h-[560px] md:min-h-[650px] overflow-hidden bg-[#eeeae1]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.52),rgba(0,0,0,.08),rgba(0,0,0,0))]"/>
      <div className="absolute inset-0 flex items-end p-7 md:p-14 text-white">
        <div className="max-w-xl">
          <p className="text-xs tracking-[.35em] mb-4">ZEVARO SHOP</p>
          <h1 className="serif text-5xl md:text-7xl leading-[.95]">PREMIUM<br/>COLLECTION</h1>
          <p className="mt-5 max-w-md text-sm md:text-base text-white/85">Premium men's shirts crafted for modern style and everyday confidence.</p>
          <Link href="/shop" className="inline-flex mt-7 bg-white text-black px-7 py-4 text-xs font-bold tracking-[.18em]">SHOP NOW</Link>
        </div>
      </div>
      <div className="absolute right-0 top-0 w-[52%] h-full hidden md:block bg-[radial-gradient(circle_at_50%_35%,#d7d0c2,transparent_55%)]"/>
    </div>
  </section>
}
