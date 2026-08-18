 "use client";
import { useEffect, useState } from "react";
import { sampleProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
export default function Wishlist(){const [slugs,setSlugs]=useState<string[]>([]);useEffect(()=>setSlugs(JSON.parse(localStorage.getItem("zevaro-wishlist")||"[]")),[]);const p=sampleProducts.filter(x=>slugs.includes(x.slug));return <main className="container-z py-10"><h1 className="serif text-4xl">Wishlist</h1>{p.length?<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">{p.map(x=><ProductCard key={x.id} product={x}/>)}</div>:<p className="text-muted mt-8">No saved shirts yet.</p>}</main>}
