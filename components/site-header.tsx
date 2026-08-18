 "use client";
import Link from "next/link";
import { Menu, Search, UserRound, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";
import { useState } from "react";

export function SiteHeader(){
  const {count}=useCart(); const [open,setOpen]=useState(false);
  return <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b hairline">
    <div className="bg-black text-white text-center text-[11px] tracking-[.22em] py-2">FREE SHIPPING ACROSS INDIA</div>
    <nav className="container-z h-16 flex items-center justify-between gap-4">
      <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Menu"><Menu size={22}/></button>
      <Link href="/" className="font-black tracking-[.18em] text-sm md:text-base">ZEVARO <span className="yellow-mark px-1">SHOP</span></Link>
      <div className="hidden md:flex items-center gap-7 text-sm">
        <Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/shop?sort=newest">New Arrivals</Link><Link href="/shop?badge=BEST%20SELLER">Best Sellers</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/shop" aria-label="Search"><Search size={19}/></Link>
        <Link href="/account" aria-label="Account"><UserRound size={19}/></Link>
        <Link href="/wishlist" aria-label="Wishlist" className="hidden sm:block"><Heart size={19}/></Link>
        <Link href="/cart" aria-label="Cart" className="relative"><ShoppingBag size={19}/>{count>0&&<span className="absolute -right-2 -top-2 text-[9px] bg-[var(--yellow)] rounded-full min-w-4 h-4 flex items-center justify-center">{count}</span>}</Link>
      </div>
    </nav>
    {open && <div className="md:hidden border-t hairline bg-white p-5 space-y-4 animate-fade-up"><Link className="block" href="/">Home</Link><Link className="block" href="/shop">Shop</Link><Link className="block" href="/shop?sort=newest">New Arrivals</Link><Link className="block" href="/shop?badge=BEST%20SELLER">Best Sellers</Link><Link className="block" href="/wishlist">Wishlist</Link></div>}
  </header>
}
