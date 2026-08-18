 "use client";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useState } from "react";

export function ProductCard({product}:{product:Product}){
  const [saved,setSaved]=useState(false);
  const price=product.sale_price ?? product.price;
  const discount=product.sale_price ? Math.round((1-product.sale_price/product.price)*100) : 0;
  const toggle=()=>{ setSaved(!saved); const key="zevaro-wishlist"; const old=JSON.parse(localStorage.getItem(key)||"[]"); localStorage.setItem(key,JSON.stringify(saved?old.filter((x:string)=>x!==product.slug):[...new Set([...old,product.slug])])); };
  return <article className="group relative">
    <Link href={`/products/${product.slug}`} className="block">
      <div className="relative aspect-[4/5] bg-[#f7f6f2] overflow-hidden">
        <Image src={product.images[0]} alt={product.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.03]"/>
        {product.badge && <span className="absolute top-3 left-3 bg-white px-2 py-1 text-[9px] tracking-[.16em]">{product.badge}</span>}
      </div>
      <div className="pt-3 pr-8"><h3 className="text-sm font-medium">{product.name}</h3><div className="mt-1 flex gap-2 items-center"><span className="font-semibold">₹{price.toLocaleString("en-IN")}</span>{product.sale_price&&<><span className="text-xs text-muted line-through">₹{product.price.toLocaleString("en-IN")}</span><span className="text-xs">{discount}% OFF</span></>}</div></div>
    </Link>
    <button onClick={toggle} className="absolute top-3 right-3 bg-white rounded-full p-2" aria-label="Wishlist"><Heart size={16} fill={saved?"currentColor":"none"}/></button>
  </article>
}
