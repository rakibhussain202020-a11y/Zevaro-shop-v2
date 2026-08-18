import Link from "next/link";
export function SiteFooter(){
  return <footer className="mt-20 bg-black text-white">
    <div className="container-z py-14 grid md:grid-cols-4 gap-10 text-sm">
      <div><div className="font-black tracking-[.2em]">ZEVARO SHOP</div><p className="text-white/60 mt-3 leading-6">Premium Collection.<br/>Premium men's shirts for modern style.</p></div>
      <div><h3 className="font-semibold mb-4">Shop</h3><div className="space-y-2 text-white/70"><Link href="/shop" className="block">All Shirts</Link><Link href="/shop?sort=newest" className="block">New Arrivals</Link><Link href="/shop?badge=BEST%20SELLER" className="block">Best Sellers</Link></div></div>
      <div><h3 className="font-semibold mb-4">Policies</h3><div className="space-y-2 text-white/70"><Link href="/policies/shipping" className="block">Shipping Policy</Link><Link href="/policies/returns" className="block">Return / Refund</Link><Link href="/policies/cancellation" className="block">Cancellation</Link><Link href="/policies/privacy" className="block">Privacy</Link><Link href="/policies/terms" className="block">Terms</Link></div></div>
      <div><h3 className="font-semibold mb-4">Customer Care</h3><div className="text-white/70 space-y-2"><p>8071303821</p><p>zvaroshopcare@gmail.com</p><p>Baji Rao Road, Pune,<br/>Maharashtra 411001, India</p></div></div>
    </div>
    <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">© {new Date().getFullYear()} ZEVARO SHOP. All rights reserved.</div>
  </footer>
}
