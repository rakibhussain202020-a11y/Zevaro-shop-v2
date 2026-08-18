 "use client";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { useRouter } from "next/navigation";

export default function CheckoutPage(){
 const {items,subtotal,clear,couponCode,couponDiscount}=useCart(); const router=useRouter();
 const [form,setForm]=useState({fullName:"",mobile:"",email:"",house:"",street:"",landmark:"",city:"",state:"",pincode:""});
 const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 const change=(k:string,v:string)=>setForm({...form,[k]:v});
 const submit=async(e:React.FormEvent)=>{e.preventDefault();setBusy(true);setError("");
   const res=await fetch("/api/orders",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({customer:form,items:items.map(i=>({productId:i.product.id,name:i.product.name,size:i.size,color:i.color,quantity:i.quantity,price:i.product.sale_price??i.product.price})),total:subtotal,paymentMethod:"cod",coupon:couponCode})});
   const data=await res.json(); if(!res.ok){setError(data.error||"Could not place order");setBusy(false);return;} clear(); router.push(`/order-success/${data.orderId}`);
 };
 if(!items.length)return <main className="container-z py-20 text-center"><h1 className="serif text-4xl">Your cart is empty</h1></main>;
 return <main className="container-z py-8 md:py-12"><h1 className="serif text-4xl">Checkout</h1><form onSubmit={submit} className="grid lg:grid-cols-[1fr_360px] gap-10 mt-8">
 <div className="space-y-8"><section><h2 className="font-semibold">Delivery Address</h2><div className="grid sm:grid-cols-2 gap-3 mt-4">{[["fullName","Full Name"],["mobile","Mobile Number"],["email","Email"],["house","House / Flat"],["street","Street / Area"],["landmark","Landmark"],["city","City"],["state","State"],["pincode","Pincode"]].map(([k,l])=><input key={k} required={k!=="landmark"} type={k==="email"?"email":"text"} value={form[k as keyof typeof form]} onChange={e=>change(k,e.target.value)} placeholder={l} className="border hairline px-4 py-3 text-sm outline-none"/>)}</div></section>
 <section><h2 className="font-semibold">Payment Method</h2><div className="border hairline p-4 mt-4"><label className="flex items-center gap-3"><input type="radio" checked readOnly/> <span>Cash on Delivery</span></label><p className="text-xs text-muted mt-2 ml-6">Online payment methods can be enabled later without rebuilding checkout.</p></div></section>
 {error&&<p className="text-sm text-red-600">{error}</p>}<button disabled={busy} className="w-full bg-black text-white py-4 text-xs font-bold tracking-[.15em] disabled:opacity-50">{busy?"PLACING ORDER...":"PLACE ORDER"}</button>
 </div>
 <aside className="border hairline p-6 h-fit"><h2 className="font-semibold">Order Summary</h2>{items.map(i=><div key={i.key} className="flex justify-between gap-3 text-sm mt-4"><span>{i.product.name}<br/><small className="text-muted">Size {i.size} · Qty {i.quantity}</small></span><span>₹{((i.product.sale_price??i.product.price)*i.quantity).toLocaleString("en-IN")}</span></div>)}<div className="border-t hairline mt-6 pt-5 flex justify-between text-sm"><span>Shipping</span><b>FREE</b></div><div className="flex justify-between mt-3 text-sm"><span>Discount</span><span>-₹{couponDiscount.toLocaleString("en-IN")}</span></div><div className="flex justify-between mt-4"><b>Total</b><b>₹{Math.max(0,subtotal-couponDiscount).toLocaleString("en-IN")}</b></div></aside>
 </form></main>
}
