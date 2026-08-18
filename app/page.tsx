import Link from "next/link";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { getCatalog } from "@/lib/catalog";
import { NewsletterForm } from "@/components/newsletter-form";

export default async function Home(){
  const products=await getCatalog();
  return <>
    <Hero/>
    <main className="container-z">
      <section className="py-16">
        <div className="flex items-end justify-between mb-7"><div><p className="text-xs tracking-[.2em] text-muted">CURATED FOR YOU</p><h2 className="serif text-4xl mt-2">Featured Collection</h2></div><Link href="/shop" className="text-xs tracking-[.15em] underline">VIEW ALL</Link></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-9">{products.slice(0,8).map(p=><ProductCard key={p.id} product={p}/>)}</div>
      </section>
      <section className="grid md:grid-cols-3 gap-4 pb-16">
        {["NEW ARRIVALS","BEST SELLERS","TRENDING SHIRTS"].map((x,i)=><Link key={x} href={`/shop?section=${i}`} className="min-h-44 bg-[#f6f4ee] flex items-end p-6 group"><div><p className="text-[10px] tracking-[.22em] text-muted">ZEVARO</p><h3 className="serif text-2xl mt-2 group-hover:translate-x-1 transition">{x}</h3></div></Link>)}
      </section>
      <section className="bg-black text-white py-16 px-7 md:px-14 text-center mb-16"><p className="text-[10px] tracking-[.3em]">THE ZEVARO PROMISE</p><h2 className="serif text-4xl mt-3">FREE SHIPPING ACROSS INDIA</h2><p className="text-white/60 mt-4 text-sm">Simple shopping. Clean design. Premium shirts.</p></section>
      <section className="py-8 md:py-14 max-w-3xl"><p className="text-xs tracking-[.22em] text-muted">ABOUT ZEVARO SHOP</p><h2 className="serif text-4xl mt-2">Modern shirts, refined essentials.</h2><p className="mt-5 text-muted leading-7">ZEVARO SHOP is focused exclusively on men's shirts, with a premium-first approach to fabric, fit and everyday styling. Product information and brand policies are managed centrally so the store can grow without rebuilding its customer experience.</p></section>
      <section className="border-t hairline py-12 text-center"><h2 className="serif text-3xl">Stay in the loop</h2><p className="text-sm text-muted mt-2">New collections and product drops, when you want them.</p><NewsletterForm/></section>
    </main>
  </>
}
